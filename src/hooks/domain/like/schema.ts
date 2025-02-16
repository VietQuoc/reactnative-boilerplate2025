import { z } from 'zod';

export const likeSchema = z.object({
  id: z.string(),
  type: z.string(),
  user: z.object({
    displayName: z.string(),
  }),
  createdAt: z.string().optional(),
  post: z
    .object({
      id: z.number(),
    })
    .optional(),
  comment: z
    .object({
      id: z.number(),
    })
    .optional(),
});

export type LikeSchema = z.infer<typeof likeSchema>;
