import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';

export const VectorIconsPack = {
  name: 'vector',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name);
      },
    },
  );
}

const IconProvider = (name: any) => ({
  toReactElement: (props: any) => VectorIcon({ name, ...props }),
});

function VectorIcon({ name, style }: any) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
}
