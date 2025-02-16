import { PostSchemaType } from '@/hooks/domain/post/schema';
import { usePosts } from '@/hooks/domain/post/usePost';
import { useTheme } from '@/theme';
import { Button, Card, Layout, List, Text } from '@ui-kitten/components';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostComponent from './components/PostComponent';

function PostScreen() {
  const { layout } = useTheme();
  const { top } = useSafeAreaInsets();
  const { useFetchPostsConnectionInfiniteQuery } = usePosts();
  const [posts, setPosts] = useState<PostSchemaType[]>([]);

  const {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchPostsConnectionInfiniteQuery(5);

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
      <List
        contentContainerStyle={{ paddingTop: top }}
        data={posts}
        renderItem={({ item }: { item: PostSchemaType }) => (
          <PostComponent post={item} />
        )}
        keyExtractor={item => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </Layout>
  );
}

export default PostScreen;
