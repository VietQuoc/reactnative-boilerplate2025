import type { PropsWithChildren } from 'react';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';

import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import { DefaultError } from '@/components/molecules';
import { ErrorBoundary } from '@/components/organisms';
import { Layout } from '@ui-kitten/components';

type Props = PropsWithChildren<
  {
    isError?: boolean;
    onResetError?: () => void;
  } & Omit<SafeAreaViewProps, 'mode'>
>;

function SafeScreen({
  children = undefined,
  isError = false,
  onResetError = undefined,
  style,
  ...props
}: Props) {
  const { layout, navigationTheme, variant } = useTheme();

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <SafeAreaView {...props} mode="margin" style={[layout.flex_1, style]}>
        <StatusBar
          backgroundColor={navigationTheme.colors.background}
          barStyle={variant === 'dark' ? 'light-content' : 'dark-content'}
        />
        <ErrorBoundary onReset={onResetError}>
          {isError ? <DefaultError onReset={onResetError} /> : children}
        </ErrorBoundary>
      </SafeAreaView>
    </Layout>
  );
}

export default SafeScreen;
