import { storage } from '@/App';
import { callGraphql } from '@/services/graphql/graphql';
import { CommentConnectionSchemaType, CommentSchemaType } from './schema';
import {
  COMMENT_CONNECTION_QUERY,
  COMMENT_CREATE_MUTATION,
} from '@/services/graphql/graphqlString/comment';

export const CommentService = {
  fetchComments: async (
    postId: number,
    after: string | null = null,
    first: number = 5,
  ) => {
    const accessToken = storage.getString('accessToken');
    if (accessToken) {
      const response: CommentConnectionSchemaType = await callGraphql(
        COMMENT_CONNECTION_QUERY,
        {
          findInput: {
            after,
            first,
          },
          postId,
        },
        'comments',
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
  submitComment: async (
    content: string,
    postId?: number,
    parentCommentId: number | null = null,
  ) => {
    const accessToken = storage.getString('accessToken');
    if (accessToken) {
      console.log('Vao day', COMMENT_CREATE_MUTATION);
      const response: CommentSchemaType = await callGraphql(
        COMMENT_CREATE_MUTATION,
        {
          createCommentInput: {
            content,
            postId,
            parentCommentId,
          },
        },
        'createComment',
        {
          Authorization: 'Bearer ' + accessToken,
        },
        true,
      );
      console.log(response);

      return response;
    } else {
      throw new Error('Still not logged in!');
    }
  },
};
