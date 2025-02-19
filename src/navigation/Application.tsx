import {
  createStaticNavigation,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import {
  Startup,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  PostDetailScreen,
} from '@/screens';

const Stack = createNativeStackNavigator({
  screens: {
    [Paths.Startup]: Startup,
    [Paths.Home]: HomeScreen,
    [Paths.Login]: LoginScreen,
    [Paths.Register]: RegisterScreen,
    [Paths.PostDetail]: PostDetailScreen,
  },
  screenOptions: { headerShown: false },
});
const Navigation = createStaticNavigation(Stack);

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();

  return (
    <SafeAreaProvider>
      {/* <NavigationContainer theme={navigationTheme}> */}
      <Navigation key={variant} />
      {/* </NavigationContainer> */}
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
