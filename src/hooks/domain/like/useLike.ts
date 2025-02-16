import { useMutation } from '@tanstack/react-query';
import { LikeService } from './likeService';
import { LikeTypes } from './enums';

const useLikePost = () => {
  const mutation = useMutation({
    mutationFn: ({ postId, type }: { postId: number; type: LikeTypes }) =>
      LikeService.likePost(postId, type),
  });

  return mutation;
};
const useDislikePost = () => {
  const mutation = useMutation({
    mutationFn: ({ postId }: { postId: number }) =>
      LikeService.dislikePost(postId),
  });

  return mutation;
};

export { useLikePost, useDislikePost };
