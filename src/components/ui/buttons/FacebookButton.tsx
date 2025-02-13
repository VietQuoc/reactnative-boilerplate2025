import React from 'react';
import { View } from 'react-native';
import { Button, Icon, IconElement, Spinner } from '@ui-kitten/components';
import { useTheme } from '@/theme';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

const propsInput = z.object({
  isLoading: z.boolean(),
  onPress: z.function(),
  loginText: z.string(),
});

type PropsInputType = z.infer<typeof propsInput>;

const LoadingIndicator = (props: any): React.ReactElement => (
  <View style={[props.style]}>
    <Spinner size="small" />
  </View>
);
const FacebookIcon = (props: any): IconElement => (
  <Icon {...props} name="facebook-outline" />
);

export const FacebookButton = (props: PropsInputType): React.ReactElement => {
  const { gutters } = useTheme();
  const { t } = useTranslation();
  const { isLoading, onPress, loginText } = propsInput.parse(props);
  return isLoading ? (
    <Button
      style={gutters.marginTop_24}
      appearance="outline"
      accessoryLeft={LoadingIndicator}>
      {t('common_screen.loading')}
    </Button>
  ) : (
    <Button
      style={gutters.marginTop_24}
      status="primary"
      onPress={onPress}
      accessoryLeft={FacebookIcon}>
      {loginText}
    </Button>
  );
};
