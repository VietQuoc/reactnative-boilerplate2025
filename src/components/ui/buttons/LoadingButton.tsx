import React from 'react';
import { View } from 'react-native';
import { Button, Spinner } from '@ui-kitten/components';
import { useTheme } from '@/theme';
import { z } from 'zod';

const propsInput = z.object({
  isLoading: z.boolean(),
  defaultText: z.string(),
  loadingText: z.string(),
  onPress: z.function(),
});

type PropsInputType = z.infer<typeof propsInput>;

const LoadingIndicator = (props: any): React.ReactElement => (
  <View style={[props.style]}>
    <Spinner size="small" />
  </View>
);

export const LoadingButton = (props: PropsInputType): React.ReactElement => {
  const { gutters } = useTheme();
  const { defaultText, loadingText, isLoading, onPress } =
    propsInput.parse(props);
  return isLoading ? (
    <Button
      style={gutters.marginTop_24}
      appearance="outline"
      accessoryLeft={LoadingIndicator}>
      {loadingText}
    </Button>
  ) : (
    <Button style={gutters.marginTop_24} status="primary" onPress={onPress}>
      {defaultText}
    </Button>
  );
};
