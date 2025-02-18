import { PostSchemaType } from '@/hooks/domain/post/schema';
import { usePosts } from '@/hooks/domain/post/usePost';
import { useTheme } from '@/theme';
import {
  Avatar,
  Icon,
  Layout,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostComponentHeader from '../Post/components/PostComponentHeader';
import { useUser } from '@/hooks';
import { formatTimestamp } from '@/utils/formatTime';
import i18n from '@/translations';

function CommentScreen(props: any) {
  const { layout, gutters } = useTheme();
  const { top } = useSafeAreaInsets();
  const { useFetchOnePostQuery } = usePosts();
  const { useFetchCurrentUserQuery } = useUser();
  const { id } = props.route.params;
  const { refetch } = useFetchOnePostQuery(id);
  const { data: userData } = useFetchCurrentUserQuery();
  const [data, setData] = useState<PostSchemaType | undefined>(undefined);

  useEffect(() => {
    refetch().then(({ data }) => {
      setData(data);
    });
  }, [id]);
  const time = useMemo(() => {
    if (!data) return '';
    return formatTimestamp(data.createdAt, i18n.languages[1]);
  }, [data?.createdAt]);

  if (!data) return <Spinner />;

  return (
    <Layout level="1" style={[layout.flex_1]}>
      <ScrollView contentContainerStyle={{ paddingTop: top }}>
        <PostComponentHeader
          avatarUrl={userData.avatarUrl}
          displayName={userData.displayName}
          createdAt={data.createdAt}
          privacy={data.privacy}
          isCard={false}
        />
        <View style={[gutters.padding_12]}>
          <Text>{data.content}</Text>
        </View>
      </ScrollView>
    </Layout>
  );
}

export default CommentScreen;
