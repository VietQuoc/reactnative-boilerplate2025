import { storage } from '@/App';
import { callGraphql } from '@/services/graphql/graphql';
import {
  POST_CONNECTION_QUERY_STRING,
  POST_QUERY_STRING,
} from '@/services/graphql/graphqlString/post';
import { PostConnectionSchemaType, PostSchemaType } from './schema';

export const PostService = {
  fetchPosts: async (after: string | null = null, first: number = 5) => {
    const accessToken = storage.getString('accessToken');
    if (accessToken) {
      const response: PostConnectionSchemaType = await callGraphql(
        POST_CONNECTION_QUERY_STRING,
        {
          findInput: {
            after,
            first,
          },
        },
        'posts',
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
  fetchPost: async (postId: number) => {
    const accessToken = storage.getString('accessToken');
    if (accessToken) {
      const response: PostSchemaType = await callGraphql(
        POST_QUERY_STRING,
        {
          postId,
        },
        'post',
        {
          Authorization: 'Bearer ' + accessToken,
        },
        true,
      );
      console.log('fetchPost: ', response);
      return response;
    } else {
      throw new Error('Still not logged in!');
    }
  },
};
