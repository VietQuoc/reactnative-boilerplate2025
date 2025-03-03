import type { PropsWithChildren } from 'react';
import type { MMKV } from 'react-native-mmkv';
import type {
  FulfilledThemeConfiguration,
  Variant,
} from '@/theme/types/config';
import type { ComponentTheme, Theme } from '@/theme/types/theme';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  generateBackgrounds,
  staticBackgroundStyles,
} from '@/theme/backgrounds';
import {
  generateBorderColors,
  generateBorderRadius,
  generateBorderWidths,
  staticBorderStyles,
} from '@/theme/borders';
import componentsGenerator from '@/theme/components';
import {
  generateFontColors,
  generateFontSizes,
  staticFontStyles,
} from '@/theme/fonts';
import { generateGutters, staticGutterStyles } from '@/theme/gutters';
import layout from '@/theme/layout';
import generateConfig from '@/theme/ThemeProvider/generateConfig';
import { DefaultTheme } from '@react-navigation/native';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as CustomTheme } from '@/theme/assets/json/theme.json';
import { default as CustomMapping } from '@/theme/assets/json/mapping.json';

type Context = {
  changeTheme: (variant: Variant) => void;
} & Theme;

export const ThemeContext = createContext<Context | undefined>(undefined);

type Props = PropsWithChildren<{
  storage: MMKV;
}>;

function ThemeProvider({ children = false, storage }: Props) {
  // Current theme variant
  const [variant, setVariant] = useState(
    (storage.getString('theme') as Variant) || 'light',
  );

  // Initialize theme at default if not defined
  useEffect(() => {
    const appHasThemeDefined = storage.contains('theme');
    if (!appHasThemeDefined) {
      storage.set('theme', 'default');
      setVariant('light');
    }
  }, [storage]);

  const changeTheme = useCallback(
    (nextVariant: Variant) => {
      setVariant(nextVariant);
      storage.set('theme', nextVariant);
    },
    [storage],
  );

  // Flatten config with current variant
  const fullConfig = useMemo(() => {
    return generateConfig(variant) satisfies FulfilledThemeConfiguration;
  }, [variant]);

  const fonts = useMemo(() => {
    return {
      ...generateFontSizes(),
      ...generateFontColors(fullConfig),
      ...staticFontStyles,
    };
  }, [fullConfig]);

  const backgrounds = useMemo(() => {
    return {
      ...generateBackgrounds(fullConfig),
      ...staticBackgroundStyles,
    };
  }, [fullConfig]);

  const gutters = useMemo(() => {
    return {
      ...generateGutters(fullConfig),
      ...staticGutterStyles,
    };
  }, [fullConfig]);

  const borders = useMemo(() => {
    return {
      ...generateBorderColors(fullConfig),
      ...generateBorderRadius(),
      ...generateBorderWidths(),
      ...staticBorderStyles,
    };
  }, [fullConfig]);

  const navigationTheme = useMemo(() => {
    return {
      colors: fullConfig.navigationColors,
      dark: variant === 'dark',
      fonts: DefaultTheme.fonts,
    };
  }, [variant, fullConfig.navigationColors]);

  const theme = useMemo(() => {
    return {
      backgrounds,
      borders,
      colors: fullConfig.colors,
      fonts,
      gutters,
      layout,
      variant,
    } satisfies ComponentTheme;
  }, [variant, fonts, backgrounds, borders, fullConfig.colors, gutters]);

  const components = useMemo(() => {
    return componentsGenerator(theme);
  }, [theme]);

  const value = useMemo(() => {
    return { ...theme, changeTheme, components, navigationTheme };
  }, [theme, components, navigationTheme, changeTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <ApplicationProvider
        {...eva}
        theme={{
          ...eva[variant],
          ...CustomTheme,
        }}
        customMapping={CustomMapping}>
        {children}
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
