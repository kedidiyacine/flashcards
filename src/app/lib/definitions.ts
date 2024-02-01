import { type Category } from '@prisma/client';
import type { z } from 'zod';
import { type defaultValues } from './utils';
import type { DeckCreationSchema } from './validations-schemas';

// Deck
export type FieldTypes = z.infer<typeof DeckCreationSchema> &
  Record<'currentStep', number>;

export type CreateDeckProps = {
  categories: Category[];
};

export type FlashCard = (typeof defaultValues.flashCards)[0];

export type GoogleProvider = {
  id: 'google';
  name: 'google';
};
