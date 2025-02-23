import { PostSchemaType } from '@/hooks/domain/post/schema';
import { usePosts } from '@/hooks/domain/post/usePost';
import { useTheme } from '@/theme';
import { Layout, Spinner } from '@ui-kitten/components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostComponent from './components/PostComponent';
import { COMMENT_BOX_HEIGHT } from '@/components/comment/CommentBox';
import PostInput, { PostInputType } from '@/components/ui/inputs/PostInput';
import { useSubscription } from '@apollo/client';
import { POST_ADDED_SUBSCRIPTION } from '@/services/graphql/graphqlString/post';

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
  const {
    data: newpostData,
    loading,
    error,
  } = useSubscription(POST_ADDED_SUBSCRIPTION);
  console.log('newpostData', newpostData, loading, error);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFetchPostsConnectionInfiniteQuery(5);

  useEffect(() => {
    const newPosts =
      data?.pages.flatMap(page => page.edges.map(edge => edge.node)) || [];
    setPosts(lastPosts => {
      // Tạo Map từ danh sách cũ với key là id
      const postsMap = new Map(lastPosts.map(comment => [comment.id, comment]));

      // Duyệt qua newComments, thêm nếu chưa có trong Map
      newPosts.forEach(newPost => {
        if (!postsMap.has(newPost.id)) {
          // Chèn comment mới vào đầu danh sách (bạn có thể dùng Map khác hoặc lặp lại cách khác)
          postsMap.set(newPost.id, newPost);
        }
      });

      // Chuyển đổi Map thành mảng
      // Nếu bạn cần sắp xếp theo thứ tự thời gian, hãy sắp xếp lại mảng theo thời gian tạo
      const merged = Array.from(postsMap.values());
      // Ví dụ, nếu muốn comment mới nhất ở đầu:
      merged.sort((a: any, b: any) => b.createdAt - a.createdAt);
      return merged;
    });
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
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={[{ width: '100%' }, layout.itemsCenter]}>
              <Spinner />
            </View>
          ) : null
        }
      />
    </Layout>
  );
}

export default PostScreen;
