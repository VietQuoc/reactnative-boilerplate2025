import { z } from 'zod';

const commentSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  likes: z.object({
    type: z.string(),
    isLikedByCurrentUser: z.boolean(),
  }),
  user: z.object({
    displayName: z.string(),
    avatarUrl: z.string(),
    id: z.string(),
  }),
});
export const commentConnectionSchema = z.object({
  edges: z.array(
    z.object({
      cursor: z.string(),
      node: commentSchema,
    }),
  ),
  pageInfo: z.object({
    endCursor: z.string(),
    hasNextPage: z.boolean(),
  }),
  totalCount: z.number(),
});

export type CommentSchemaType = z.infer<typeof commentSchema>;
export type CommentConnectionSchemaType = z.infer<
  typeof commentConnectionSchema
>;
