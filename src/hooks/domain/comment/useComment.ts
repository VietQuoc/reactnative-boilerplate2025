import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { CommentService } from './commentService';

export const enum CommentQueryKey {
  fetchOneComment = 'fetchOneComment',
  fetchCurrent = 'fetchCommentsConnection',
}

const useSubmitOneCommentMutation = () => {
  const mutation = useMutation({
    mutationFn: ({
      content,
      postId,
      parentCommentId,
    }: {
      content: string;
      postId?: number;
      parentCommentId?: number;
    }) => CommentService.submitComment(content, postId, parentCommentId),
  });
  return mutation;
};

const useFetchCommentsConnectionInfiniteQuery = (
  postId: number,
  first: number,
) =>
  useInfiniteQuery({
    initialPageParam: '',
    queryKey: [CommentQueryKey.fetchCurrent],
    queryFn: ({ pageParam }) =>
      CommentService.fetchComments(postId, pageParam, first),
    getNextPageParam: lastPage => {
      return lastPage.pageInfo.hasNextPage
        ? lastPage.pageInfo.endCursor
        : undefined;
    },
    refetchOnWindowFocus: true,
    enabled: Boolean(postId),
  });

export const useComments = () => {
  const client = useQueryClient();

  const invalidateQuery = (queryKeys: CommentQueryKey[]) =>
    client.invalidateQueries(
      {
        queryKey: queryKeys,
      },
      {},
    );

  return {
    invalidateQuery,
    useSubmitOneCommentMutation,
    useFetchCommentsConnectionInfiniteQuery,
  };
};
