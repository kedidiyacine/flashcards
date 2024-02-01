import { z } from 'zod';

import { api } from '@/trpc/react';
import { type Category } from '@prisma/client';
import { BLOB_FORMATS, validClientLocalTime, validDateFormat } from './utils';

const blobSchema = z.instanceof(File).superRefine((value, ctx) => {
  const { IMAGE_FORMATS, AUDIO_FORMATS, VIDEO_FORMATS } = BLOB_FORMATS;

  const fileType = value.type.split('/')[0];
  const type = value.type.split('/')[1];
  if (!type) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Unsupported file type.',
    });
    return false;
  }

  // TODO: size validation
  switch (fileType) {
    case 'image':
      if (!IMAGE_FORMATS.includes(type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid image format(${type}), only ${IMAGE_FORMATS.join(
            ', '
          )} allowed.`,
        });
        return false;
      }
      break;
    case 'audio':
      if (!AUDIO_FORMATS.includes(type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid audio format(${type}), only ${AUDIO_FORMATS.join(
            ', '
          )} allowed.`,
        });
        return false;
      }
      break;
    case 'video':
      if (!VIDEO_FORMATS.includes(type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid video format(${type}), only ${VIDEO_FORMATS.join(
            ', '
          )} allowed.`,
        });
        return false;
      }
      break;
    default:
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Unsupported file type.',
      });
      return false;
  }

  return true;
});

export const FrontFlashCardSchema = z.object({
  type: z.enum(
    ['question', 'pick the right answer(s)', 'fill in the blank(s)'],
    { invalid_type_error: 'Please select a type.' }
  ),
  input: z.string().optional(),
  timer: z.coerce
    .number()
    .int()
    .nonnegative({ message: 'must be positive amount of seconds.' }),
  attachement: blobSchema.optional(),
});

const BackFlashCardSchema = z.object({
  answer: z.string(),
  attachement: blobSchema.optional(),
});

const FlashCardCreationSchema = z.object({
  front: FrontFlashCardSchema,
  back: BackFlashCardSchema,
});

export const DeckCreationSchema = z.object({
  category: z.string(),
  title: z
    .string()
    .min(4, { message: 'Title needs to be longer than 3 characters.' })
    .max(25, { message: 'Title cannot exceed 25 letters.' })
    .trim(),
  visibility: z.enum(['private', 'public'], {
    invalid_type_error: 'Please select a visibility.',
  }),
  description: z
    .string()
    .max(100, { message: 'Description cannot exceed 100 characters.' })
    .trim()
    .optional(),
  flashCards: z.array(FlashCardCreationSchema),
});

export const AddRecentlyAccessedSchema = z.object({
  deckId: z.number(),
  clientLocalTime: z.date().superRefine((value, ctx) => {
    // Perform additional custom validation
    if (!validDateFormat(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        message: 'Invalid date format',
        expected: 'date',
        received: typeof value,
      });
    }

    if (!validClientLocalTime(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Custom validation failed',
      });
    }
  }),
});
