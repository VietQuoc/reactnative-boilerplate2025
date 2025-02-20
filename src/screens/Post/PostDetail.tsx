import { PostSchemaType, Privacy } from '@/hooks/domain/post/schema';
import { usePosts } from '@/hooks/domain/post/usePost';
import { useTheme } from '@/theme';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostComponentHeader from './components/PostComponentHeader';
import { useUser } from '@/hooks';
import { OrientationKey, useOrientation } from '@/hooks/devices/useOrientation';
import MediaShow from '@/components/ui/media/MediaShow';
import PostComponentFooter from './components/PostComponentFooter';
import { useDislikePost, useLikePost } from '@/hooks/domain/like/useLike';
import { LikeTypes } from '@/hooks/domain/like/enums';
import Comment from '@/components/comment/Comment';
import CommentInput from '@/components/ui/inputs/CommentInput';

function PostDetailScreen(props: any) {
  const { layout, gutters } = useTheme();
  const { top } = useSafeAreaInsets();
  const { useFetchOnePostQuery } = usePosts();
  const { useFetchCurrentUserQuery } = useUser();
  const { id, imageIndex } = props.route.params;
  const { refetch } = useFetchOnePostQuery(id);
  const { data: userData } = useFetchCurrentUserQuery();
  const orientation = useOrientation();
  const { width, height } = useWindowDimensions();
  const [data, setData] = useState<PostSchemaType | undefined>(undefined);
  const postId = useMemo(() => parseInt(data ? data.id : '0', 10), [data]);

  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: dislikePost } = useDislikePost();

  useEffect(() => {
    refetch().then(({ data }) => {
      setData(data);
    });
  }, [id]);

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

  return (
    <Layout level="1" style={[layout.flex_1]}>
      <PostComponentHeader
        avatarUrl={userData.avatarUrl}
        displayName={userData.displayName}
        createdAt={data?.createdAt || ''}
        privacy={data?.privacy || Privacy.PRIVATE}
        isCard={false}
        containerStyle={{ marginTop: top }}
      />
      <ScrollView>
        {!data && (
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
        )}
        {data && (
          <View>
            <MediaShow data={data} initIndex={imageIndex} />
            <View style={[gutters.padding_12]}>
              <Text>{data.content}</Text>
            </View>
            <PostComponentFooter
              {...props}
              postId={data?.id}
              likes={data?.likes}
              isLikedByCurrentUser={data?.isLikedByCurrentUser}
              handleLike={handleLike}
              handleDisLike={handleDisLike}
            />
            <CommentInput />
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}

export default PostDetailScreen;
