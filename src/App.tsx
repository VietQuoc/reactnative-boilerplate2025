import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@/theme';
import ApplicationNavigator from '@/navigation/Application';
import { MMKV } from 'react-native-mmkv';

// import '@/translations';

export const storage = new MMKV();

function App() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider storage={storage}>
        <ApplicationNavigator />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
