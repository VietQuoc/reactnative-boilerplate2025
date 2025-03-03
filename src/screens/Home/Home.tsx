import { SafeScreen } from '@/components/templates';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconElement,
  Layout,
} from '@ui-kitten/components';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostScreen from '../Post/Post';
import { GoodsScreen } from '../Goods';
import RightMenuScreen from '../RightMenu/RightMenu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const { Navigator, Screen } = createBottomTabNavigator();

const MenuIcon = (props: any): IconElement => (
  <Icon {...props} name="menu-outline" />
);

const GoodIcon = (props: any): IconElement => (
  <Icon {...props} name="archive-outline" />
);

const PostIcon = (props: any): IconElement => (
  <Icon {...props} name="book-open-outline" />
);

const BottomTabBar = ({ navigation, state }: any) => {
  const { t } = useTranslation();
  const onSelect = (index: number) => {
    navigation.navigate(state.routeNames[index]);
  };
  return (
    <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
      <BottomNavigationTab icon={PostIcon} title={t('screen_post.post')} />
      <BottomNavigationTab icon={GoodIcon} title="GOODS" />
      <BottomNavigationTab icon={MenuIcon} title="MENU" />
    </BottomNavigation>
  );
};

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen
      options={{ header: () => <View /> }}
      name="Posts"
      component={PostScreen}
    />
    <Screen
      options={{ header: () => <View /> }}
      name="Goods"
      component={GoodsScreen}
    />
    <Screen
      options={{ header: () => <View /> }}
      name="Users"
      component={RightMenuScreen}
    />
  </Navigator>
);

function HomeScreen() {
  const { bottom } = useSafeAreaInsets();
  return (
    <SafeScreen>
      <Layout style={{ flex: 1, paddingBottom: bottom }}>
        <TabNavigator />
      </Layout>
    </SafeScreen>
  );
}

export default HomeScreen;
