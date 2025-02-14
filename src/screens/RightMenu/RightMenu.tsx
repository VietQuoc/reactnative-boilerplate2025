import { useUser } from '@/hooks';
import { userSchema } from '@/hooks/domain/user/schema';
import { useTheme } from '@/theme';
import {
  Avatar,
  Drawer,
  DrawerItem,
  Icon,
  IconElement,
  IndexPath,
  Layout,
  Text,
  Toggle,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Theme } from '@/theme/types/theme';
import UserScreen from '../User/User';
import { useTranslation } from 'react-i18next';
import { Variant } from '@/theme/_config';
import layout from '@/theme/layout';

const MenuIcon = (props: any): IconElement => (
  <Icon {...props} name="menu-outline" />
);

const { Navigator, Screen } = createDrawerNavigator();

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category="h1">ORDERS</Text>
  </Layout>
);
const DrawerHeader = (props: any) => {
  return (
    <TopNavigation
      alignment="center"
      title={props.displayName}
      subtitle={props.role}
      accessoryLeft={() => (
        <TopNavigationAction
          onPress={() => props.navigation.toggleDrawer()}
          icon={iconProps => <Icon {...iconProps} name="arrow-back" />}
        />
      )}
      accessoryRight={() => (
        <Avatar size="giant" source={{ uri: props.avatarUrl }} />
      )}
    />
  );
};
const DrawerFooter = (props: any) => {
  const theme = props.theme;
  const { t } = useTranslation();
  const layoutT: typeof layout = theme.layout;

  const onCheckedChange = (isChecked: boolean): void => {
    theme.changeTheme(isChecked ? Variant.DARK : Variant.LIGHT);
  };
  return (
    <Layout
      {...props}
      style={[
        props.style,
        layoutT.row,
        layoutT.itemsCenter,
        theme.gutters.paddingBottom_24,
        layoutT.justifyAround,
      ]}>
      <Text>{t('screen_settings.select_theme')}</Text>
      <Toggle
        onChange={onCheckedChange}
        checked={theme.variant === Variant.DARK}>
        {theme.variant}
      </Toggle>
    </Layout>
  );
};
const DrawerContent = ({
  navigation,
  state,
  avatarUrl,
  displayName,
  role,
  theme,
}: {
  navigation: any;
  state: any;
  avatarUrl: string;
  displayName: string;
  role: string;
  theme: Theme;
}) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    header={(props: any) => (
      <DrawerHeader
        {...props}
        navigation={navigation}
        theme={theme}
        displayName={displayName}
        avatarUrl={avatarUrl}
        role={role}
      />
    )}
    footer={(props: any) => <DrawerFooter {...props} theme={theme} />}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title="Users" />
    <DrawerItem title="Orders" />
  </Drawer>
);

function RightMenuScreen() {
  const theme = useTheme();
  const { useFetchCurrentUserQuery } = useUser();
  const { data } = useFetchCurrentUserQuery();
  const { avatarUrl, displayName, role } = userSchema.parse(data);

  return (
    <Layout style={[theme.layout.flex_1]}>
      <Navigator
        screenOptions={({ navigation }) => ({
          headerTransparent: true,
          drawerPosition: 'right',
          drawerType: 'front',
          drawerStyle: { zIndex: 1000 },
          headerRight: (props: any) => (
            <TopNavigationAction
              icon={MenuIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerLeft: () => null,
        })}
        drawerContent={props => (
          <DrawerContent
            {...props}
            avatarUrl={avatarUrl}
            displayName={displayName}
            role={role}
            theme={theme}
          />
        )}>
        <Screen name="Users" component={UserScreen} />
        <Screen name="Orders" component={OrdersScreen} />
      </Navigator>
    </Layout>
  );
}

export default RightMenuScreen;
