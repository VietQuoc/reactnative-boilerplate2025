import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/theme';
import ApplicationNavigator from '@/navigation/Application';
import { MMKV } from 'react-native-mmkv';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from '@/theme/assets/json/theme.json';
import { default as mapping } from '@/theme/assets/json/mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import '@/translations';
import { PopupProvider } from './components/ui/popups/PopupProvider';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

export const storage = new MMKV();

function App() {
  return (
    <GestureHandlerRootView>
      <IconRegistry icons={EvaIconsPack} />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>
          <ApplicationProvider
            {...eva}
            theme={{
              ...(storage.getString('theme') === 'dark' ? eva.dark : eva.light),
              ...theme,
            }}
            customMapping={mapping}>
            <PopupProvider>
              <ApplicationNavigator />
            </PopupProvider>
          </ApplicationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
