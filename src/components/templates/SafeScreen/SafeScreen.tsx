import type { PropsWithChildren } from 'react';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';

import { StatusBar } from 'react-native';

import { useTheme } from '@/theme';

import { DefaultError } from '@/components/molecules';
import { ErrorBoundary } from '@/components/organisms';
import { Layout, useTheme as useKittenTheme } from '@ui-kitten/components';

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
  const { navigationTheme, variant } = useTheme();
  const kittenTheme = useKittenTheme();

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={kittenTheme['color-basic-100']}
        barStyle={variant === 'dark' ? 'light-content' : 'dark-content'}
      />
      <ErrorBoundary onReset={onResetError}>
        {isError ? <DefaultError onReset={onResetError} /> : children}
      </ErrorBoundary>
    </Layout>
  );
}

export default SafeScreen;
