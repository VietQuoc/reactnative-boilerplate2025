import { useTheme } from '@/theme';
import { Layout, Text } from '@ui-kitten/components';

function SettingScreen() {
  const { layout } = useTheme();
  return (
    <Layout style={[layout.flex_1]}>
      <Text>Setting Screen</Text>
    </Layout>
  );
}

export default SettingScreen;
