import {
  AddRecentlyAccessedSchema,
  DeckCreationSchema,
} from '@/app/lib/validations-schemas';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const deckRouter = createTRPCRouter({
  create: protectedProcedure
    .input(DeckCreationSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { title, description, category, flashCards } = input;
        return await ctx.db.deck.create({
          data: {
            title,
            description,
            flashCards: {
              create: flashCards.map(({ front, back }) => ({
                front: {
                  create: front,
                },
                back: {
                  create: back,
                },
              })),
            },
            isUnder: { connect: { name: category } },
            createdBy: { connect: { id: ctx.session?.user.id } },
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),

  addRecentlyAccessed: protectedProcedure
    .input(AddRecentlyAccessedSchema)
    .mutation(async ({ ctx, input }) => {
      // remember to not run this if the user manually changes the slug to contain a non existant deck
      // ex usage on the deck RSC:
      // await api.deck.addRecentlyAccessed.mutate({
      //   deckId: slug,
      //   clientLocalTime: new Date(),
      // });

      // Use ctx.db.$transaction to wrap the transactional logic
      await ctx.db.$transaction(async (tx) => {
        const { id: userId } = ctx.session.user;

        // Check if the deck was already accessed
        const existingDeck = await tx.recentlyAccessed.findFirst({
          where: {
            deckId: input.deckId,
            userId,
          },
        });

        if (existingDeck) {
          await tx.recentlyAccessed.update({
            where: {
              id: existingDeck.id,
            },
            data: {
              accessDate: input.clientLocalTime,
            },
          });
        } else {
          // Fetch user to get recentlyAccessedLimit
          const user = await tx.user.findUnique({
            where: { id: userId },
          });

          if (!user) {
            throw new Error(`User with ID ${userId} not found`);
          }

          const recentlyAccessedLimit = user.recentlyAccessedLimit;

          // Fetch the count of recently accessed decks for the user
          const recentDecksCount = await tx.recentlyAccessed.count({
            where: { userId },
          });

          if (recentDecksCount >= recentlyAccessedLimit) {
            // If count is equal to or exceeds the limit, find and delete the oldest record, then create a new one
            const oldestDeck = await tx.recentlyAccessed.findFirst({
              where: { userId },
              orderBy: { accessDate: 'asc' },
            });

            if (oldestDeck) {
              await tx.recentlyAccessed.delete({
                where: { id: oldestDeck.id },
              });
            }
          }
          // create the accessDeck regardless the outcome of the counts comparison
          await tx.recentlyAccessed.create({
            data: {
              userId,
              deckId: input.deckId,
            },
          });
        }
      });
    }),
});
