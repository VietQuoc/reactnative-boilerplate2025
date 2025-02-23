import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/theme';
import ApplicationNavigator from '@/navigation/Application';
import { MMKV } from 'react-native-mmkv';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import '@/translations';
import { PopupProvider } from './components/ui/popups/PopupProvider';
import { VectorIconsPack } from './components/ui/icons/VectorIcon';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './hooks/client/apolloClient';

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
      <IconRegistry icons={[EvaIconsPack, VectorIconsPack]} />
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider storage={storage}>
            <PopupProvider>
              <ApplicationNavigator />
            </PopupProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}

export default App;
