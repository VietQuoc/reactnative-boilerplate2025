import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { PostService } from './postService';

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
  });

export const usePosts = () => {
  const client = useQueryClient();

  const invalidateQuery = (queryKeys: PostQueryKey[]) =>
    client.invalidateQueries({
      queryKey: queryKeys,
    });

  return {
    invalidateQuery,
    useFetchOnePostQuery,
    useFetchPostsConnectionInfiniteQuery,
  };
};
