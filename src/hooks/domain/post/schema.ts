import { z } from 'zod';
import { likeSchema } from '../like/schema';

export enum Privacy {
  PUBLIC = 'public',
  FRIENDS = 'friends',
  PRIVATE = 'private',
}

export const postSchema = z.object({
  content: z.string(),
  commentCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
  imageUrls: z.array(z.string()),
  likeCount: z.number(),
  privacy: z.string(),
  videoUrls: z.array(z.string()),
  isLikedByCurrentUser: z.object({
    type: z.string(),
    isLiked: z.boolean(),
  }),
  user: z.object({
    avatarUrl: z.string(),
    displayName: z.string(),
    id: z.string(),
  }),
  comments: z.object({
    content: z.string(),
    createdAt: z.string(),
    id: z.string(),
  }),
  likes: z.array(likeSchema),
});

export const postConnectionSchema = z.object({
  edges: z.array(
    z.object({
      cursor: z.string(),
      node: postSchema,
    }),
  ),
  pageInfo: z.object({
    endCursor: z.string(),
    hasNextPage: z.boolean(),
  }),
  totalCount: z.number(),
});

export type PostSchemaType = z.infer<typeof postSchema>;
export type PostConnectionSchemaType = z.infer<typeof postConnectionSchema>;
