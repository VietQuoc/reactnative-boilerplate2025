import { storage } from '@/App';
import { callGraphql } from '@/services/graphql/graphql';
import { LikeTypes } from './enums';
import { LikeSchema } from './schema';
import {
  DISLIKE_COMMENT_STRING,
  DISLIKE_POST_STRING,
  LIKE_COMMENT_STRING,
  LIKE_POST_STRING,
} from '@/services/graphql/graphqlString/like';

export const LikeService = {
  likePost: async (postId: number, type: LikeTypes) => {
    const accessToken = storage.getString('accessToken');
    if (accessToken) {
      const response: LikeSchema = await callGraphql(
        LIKE_POST_STRING,
        {
          createLikePostInput: {
            postId,
            type,
          },
        },
        'likePost',
        {
          Authorization: 'Bearer ' + accessToken,
        },
        true,
      );
      return response;
    } else {
      throw new Error('Still not logged in!');
    }
  },
  likeComment: async (commentId: number, type: LikeTypes) => {
    const accessToken = storage.getString('accessToken');
    if (accessToken) {
      const response: LikeSchema = await callGraphql(
        LIKE_COMMENT_STRING,
        {
          createLikeCommentInput: {
            commentId,
            type,
          },
        },
        'likeComment',
        {
          Authorization: 'Bearer ' + accessToken,
        },
        true,
      );
      return response;
    } else {
      throw new Error('Still not logged in!');
    }
  },
  dislikePost: async (postId: number) => {
    const accessToken = storage.getString('accessToken');
    if (accessToken) {
      const response: boolean = await callGraphql(
        DISLIKE_POST_STRING,
        {
          postId,
        },
        'disLikePost',
        {
          Authorization: 'Bearer ' + accessToken,
        },
        true,
      );
      return response;
    } else {
      throw new Error('Still not logged in!');
    }
  },
  dislikeComment: async (commentId: number) => {
    const accessToken = storage.getString('accessToken');
    if (accessToken) {
      const response: boolean = await callGraphql(
        DISLIKE_COMMENT_STRING,
        {
          commentId,
        },
        'disLikeComment',
        {
          Authorization: 'Bearer ' + accessToken,
        },
        true,
      );
      return response;
    } else {
      throw new Error('Still not logged in!');
    }
  },
};
