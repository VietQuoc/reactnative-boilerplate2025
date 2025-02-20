import { PostSchemaType } from '@/hooks/domain/post/schema';
import { usePosts } from '@/hooks/domain/post/usePost';
import { useTheme } from '@/theme';
import { Layout } from '@ui-kitten/components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostComponent from './components/PostComponent';
import { COMMENT_BOX_HEIGHT } from '@/components/comment/CommentBox';
import PostInput, { PostInputType } from '@/components/ui/inputs/PostInput';

function PostScreen() {
  const { layout } = useTheme();
  const { top } = useSafeAreaInsets();
  const { useFetchPostsConnectionInfiniteQuery } = usePosts();
  const [posts, setPosts] = useState<PostSchemaType[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const opacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFetchPostsConnectionInfiniteQuery(5);

  useEffect(() => {
    const newPosts =
      data?.pages.flatMap(page => page.edges.map(edge => edge.node)) || [];
    setPosts(lastPosts => [...lastPosts, ...newPosts]);
  }, [data]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Layout level="1" style={[layout.flex_1]}>
      <PostInput
        style={[
          layout.absolute,
          { top: 60, zIndex: 1, width: '100%' },
          { opacity },
        ]}
      />
      <Animated.FlatList
        contentContainerStyle={{ paddingTop: top + COMMENT_BOX_HEIGHT }}
        data={posts}
        renderItem={({ item }: { item: PostSchemaType }) => (
          <PostComponent post={item} />
        )}
        keyExtractor={item => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      />
    </Layout>
  );
}

export default PostScreen;
