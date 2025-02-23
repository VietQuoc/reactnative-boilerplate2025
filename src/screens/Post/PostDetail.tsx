import { PostSchemaType, Privacy } from '@/hooks/domain/post/schema';
import { usePosts } from '@/hooks/domain/post/usePost';
import { useTheme } from '@/theme';
import { Layout, List, Spinner, Text } from '@ui-kitten/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostComponentHeader from './components/PostComponentHeader';
import { useUser } from '@/hooks';
import { OrientationKey, useOrientation } from '@/hooks/devices/useOrientation';
import MediaShow from '@/components/ui/media/MediaShow';
import PostComponentFooter from './components/PostComponentFooter';
import { useDislikePost, useLikePost } from '@/hooks/domain/like/useLike';
import { LikeTypes } from '@/hooks/domain/like/enums';
import CommentInput from '@/components/ui/inputs/CommentInput';
import { useComments } from '@/hooks/domain/comment/useComment';
import { CommentSchemaType } from '@/hooks/domain/comment/schema';
import PostCommentItem from './components/PostCommentItem';
import { ScrollView } from 'react-native-gesture-handler';
import { useSubscription } from '@apollo/client';
import { COMMENT_SUBSCRIPTION_STRING } from '@/services/graphql/graphqlString/comment';

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: any) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

function PostDetailScreen(props: any) {
  const { layout, gutters } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const { useFetchOnePostQuery } = usePosts();
  const { useFetchCurrentUserQuery } = useUser();
  const { useFetchCommentsConnectionInfiniteQuery } = useComments();
  const { id, imageIndex } = props.route.params;
  const { refetch } = useFetchOnePostQuery(id);
  const { data: userData } = useFetchCurrentUserQuery();
  const orientation = useOrientation();
  const { width, height } = useWindowDimensions();
  const [data, setData] = useState<PostSchemaType | undefined>(undefined);
  const postId = useMemo(() => parseInt(data ? data.id : '0', 10), [data]);

  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: dislikePost } = useDislikePost();
  const {
    data: commentData,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useFetchCommentsConnectionInfiniteQuery(id, 10);
  const [comments, setComments] = useState<CommentSchemaType[]>([]);

  useEffect(() => {
    refetch().then(({ data }) => {
      setData(data);
    });
  }, [id]);

  useEffect(() => {
    const newComments =
      commentData?.pages.flatMap(page => page.edges.map(edge => edge.node)) ||
      [];
    setComments(prevComments => {
      // Tạo Map từ danh sách cũ với key là id
      const commentsMap = new Map(
        prevComments.map(comment => [comment.id, comment]),
      );

      // Duyệt qua newComments, thêm nếu chưa có trong Map
      newComments.forEach(newComment => {
        if (!commentsMap.has(newComment.id)) {
          // Chèn comment mới vào đầu danh sách (bạn có thể dùng Map khác hoặc lặp lại cách khác)
          commentsMap.set(newComment.id, newComment);
        }
      });

      // Chuyển đổi Map thành mảng
      // Nếu bạn cần sắp xếp theo thứ tự thời gian, hãy sắp xếp lại mảng theo thời gian tạo
      const merged = Array.from(commentsMap.values());
      // Ví dụ, nếu muốn comment mới nhất ở đầu:
      merged.sort((a: any, b: any) => b.createdAt - a.createdAt);
      return merged;
    });
  }, [data?.id, commentData]);

  const handleLike = useCallback(
    async (type: LikeTypes) => {
      if (data) {
        await likePost({ postId, type });
        refetch().then(({ data: returnData }) => setData(returnData));
      }
    },
    [postId],
  );
  const handleDisLike = useCallback(async () => {
    if (data) {
      await dislikePost({ postId });
      refetch().then(({ data: returnData }) => setData(returnData));
    }
  }, [postId]);

  const {
    data: newSubscriptionCommentData,
    loading,
    error,
  } = useSubscription(COMMENT_SUBSCRIPTION_STRING, {
    variables: {
      postId: id,
    },
  });
  useEffect(() => {
    if (newSubscriptionCommentData) {
      const commentData: CommentSchemaType =
        newSubscriptionCommentData?.commentAdded;
      setComments(lastComments => [commentData, ...lastComments]);
    }
  }, [newSubscriptionCommentData]);

  return (
    <Layout level="1" style={[layout.flex_1]}>
      <PostComponentHeader
        avatarUrl={userData.avatarUrl}
        displayName={userData.displayName}
        createdAt={data?.createdAt || ''}
        privacy={data?.privacy || Privacy.PRIVATE}
        isCard={false}
        containerStyle={{ marginTop: top, paddingRight: 12 }}
      />
      {!data ? (
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            {
              height:
                orientation == OrientationKey.Portrait
                  ? height - 200
                  : width - 100,
            },
          ]}>
          <Spinner />
        </View>
      ) : (
        <ScrollView
          stickyHeaderIndices={[2]}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              if (!isFetching && hasNextPage) {
                console.log('on end');
                fetchNextPage();
              }
            }
          }}
          scrollEventThrottle={100}>
          <MediaShow data={data} initIndex={imageIndex} />
          <View style={[gutters.padding_12]}>
            <Text>{data.content}</Text>
          </View>
          <View>
            <PostComponentFooter
              {...props}
              postId={data?.id}
              likes={data?.likes}
              isLikedByCurrentUser={data?.isLikedByCurrentUser}
              handleLike={handleLike}
              handleDisLike={handleDisLike}
            />
            <CommentInput postId={data.id} />
          </View>
          {comments.map((item, index) => {
            return <PostCommentItem item={item} key={item.id} />;
          })}
          <View
            style={[{ height: 30 }, layout.justifyCenter, layout.itemsCenter]}>
            {isFetching && <Spinner />}
          </View>
        </ScrollView>
      )}
    </Layout>
  );
}

export default PostDetailScreen;
