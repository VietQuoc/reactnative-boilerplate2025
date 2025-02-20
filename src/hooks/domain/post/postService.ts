import { storage } from '@/App';
import { callGraphql, callGraphqlWithUpload } from '@/services/graphql/graphql';
import {
  POST_CONNECTION_QUERY_STRING,
  POST_CREATION_MUTATION_STRING,
  POST_QUERY_STRING,
} from '@/services/graphql/graphqlString/post';
import { PostConnectionSchemaType, PostSchemaType, Privacy } from './schema';
import { Asset } from 'react-native-image-picker';

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

      return response;
    } else {
      throw new Error('Still not logged in!');
    }
  },
  submitPost: async (
    content: string,
    privacy: Privacy,
    files: Array<Asset>,
  ) => {
    console.log('submitPost: ', content, privacy, files);
    const accessToken = storage.getString('accessToken');
    if (accessToken) {
      const response: PostSchemaType = await callGraphqlWithUpload(
        POST_CREATION_MUTATION_STRING,
        {
          createPostInput: {
            content,
            privacy: privacy.toUpperCase(),
          },
        },
        files,
        'createPost',
        {
          Authorization: 'Bearer ' + accessToken,
          'Apollo-Require-Preflight': true,
        },
        true,
      );

      return response;
    } else {
      throw new Error('Still not logged in!');
    }
  },
};
