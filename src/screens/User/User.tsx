import { useUser } from '@/hooks';
import { userSchema } from '@/hooks/domain/user/schema';
import { useTheme } from '@/theme';
import { Layout, Text } from '@ui-kitten/components';

function UserScreen() {
  const { layout } = useTheme();
  const { useFetchCurrentUserQuery } = useUser();
  const { data } = useFetchCurrentUserQuery();
  const { avatarUrl, displayName } = userSchema.parse(data);

  return (
    <Layout style={[layout.flex_1]}>
      <Text>User Screen</Text>
    </Layout>
  );
}

export default UserScreen;
