import { PostSchemaType, Privacy } from '@/hooks/domain/post/schema';
import { usePosts } from '@/hooks/domain/post/usePost';
import { useTheme } from '@/theme';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostComponentHeader from './components/PostComponentHeader';
import { useUser } from '@/hooks';
import { OrientationKey, useOrientation } from '@/hooks/devices/useOrientation';
import MediaShow from '@/components/ui/media/MediaShow';

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

  useEffect(() => {
    refetch().then(({ data }) => {
      setData(data);
    });
  }, [id]);

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
          <MediaShow listUrls={data.imageUrls} initIndex={imageIndex} />
        )}
        {data && (
          <View style={[gutters.padding_12]}>
            <Text>{data.content}</Text>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}

export default PostDetailScreen;
