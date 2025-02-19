import { Card } from '@ui-kitten/components';
import PostComponentHeader from './PostComponentHeader';
import PostComponentFooter from './PostComponentFooter';
import { PostSchemaType } from '@/hooks/domain/post/schema';
import { useDislikePost, useLikePost } from '@/hooks/domain/like/useLike';
import { LikeTypes } from '@/hooks/domain/like/enums';
import { usePosts } from '@/hooks/domain/post/usePost';
import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import PostMediaComponent from './PostMediaComponent';
import PostContentComponent from './PostContentComponent';

const PostComponent = (props: any) => {
  const { post }: { post: PostSchemaType } = props;
  const [postData, setPostData] = useState<any>(post);
  const postId = useMemo(() => parseInt(post.id, 10), []);

  const { useFetchOnePostQuery } = usePosts();
  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: dislikePost } = useDislikePost();

  const { refetch } = useFetchOnePostQuery(postId);

  const handleLike = useCallback(
    async (type: LikeTypes) => {
      await likePost({ postId: postId, type });
      refetch().then(({ data: returnData }) => setPostData(returnData));
    },
    [postId],
  );
  const handleDisLike = useCallback(async () => {
    await dislikePost({ postId: postId });
    refetch().then(({ data: returnData }) => setPostData(returnData));
  }, [postId]);

  const PostHeader = useMemo(
    () => (
      <PostComponentHeader
        avatarUrl={postData?.user?.avatarUrl}
        displayName={postData?.user?.displayName}
        createdAt={postData?.createdAt}
        privacy={postData?.privacy}
      />
    ),
    [postData?.user, postData?.createdAt, postData?.privacy],
  );

  const PostContent = useMemo(
    () => (
      <View style={{ marginHorizontal: -15 }}>
        <PostContentComponent postData={postData} />
        <PostMediaComponent postData={postData} />
      </View>
    ),
    [postData.content, postData.imageUrls],
  );
  const PostFooter = useMemo(
    () => (
      <PostComponentFooter
        {...props}
        postId={postId}
        likes={postData?.likes}
        isLikedByCurrentUser={postData.isLikedByCurrentUser}
        handleLike={handleLike}
        handleDisLike={handleDisLike}
      />
    ),
    [postData?.likes, postData.isLikedByCurrentUser, handleLike, handleDisLike],
  );
  return (
    <Card disabled={true} header={PostHeader} footer={() => PostFooter}>
      {PostContent}
    </Card>
  );
};

export default PostComponent;
