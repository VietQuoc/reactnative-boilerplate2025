import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { PostService } from './postService';
import { Privacy } from './schema';
import { Asset } from 'react-native-image-picker';

export const enum PostQueryKey {
  fetchOnePost = 'fetchOnePost',
  fetchCurrent = 'fetchPostsConnection',
}

const useFetchOnePostQuery = (postId: number) =>
  useQuery({
    enabled: false,
    queryFn: () => PostService.fetchPost(postId),
    queryKey: [PostQueryKey.fetchOnePost + postId],
  });

const useSubmitOnePostMutation = () => {
  const mutation = useMutation({
    mutationFn: ({
      content,
      privacy,
      files,
    }: {
      content: string;
      privacy: Privacy;
      files: Array<Asset>;
    }) => PostService.submitPost(content, privacy, files),
  });
  return mutation;
};

const useFetchPostsConnectionInfiniteQuery = (first: number) =>
  useInfiniteQuery({
    initialPageParam: '',
    queryKey: [PostQueryKey.fetchCurrent],
    queryFn: ({ pageParam }) => PostService.fetchPosts(pageParam, first),
    getNextPageParam: lastPage => {
      return lastPage.pageInfo.hasNextPage
        ? lastPage.pageInfo.endCursor
        : undefined;
    },
    refetchOnWindowFocus: true,
  });

export const usePosts = () => {
  const client = useQueryClient();

  const invalidateQuery = (queryKeys: string[]) =>
    client.invalidateQueries(
      {
        queryKey: queryKeys,
      },
      {},
    );

  return {
    invalidateQuery,
    useFetchOnePostQuery,
    useFetchPostsConnectionInfiniteQuery,
    useSubmitOnePostMutation,
  };
};
