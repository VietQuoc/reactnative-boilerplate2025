import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';
import { CustomIcon } from '../icons/CustomIcon';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';

const propsInputCheck = z.object({
  value: z.string(),
  setValue: z.function().args(z.string()),
});

type propsInputType = z.infer<typeof propsInputCheck>;

function PassInput(props: propsInputType): React.ReactElement {
  const { t } = useTranslation();
  const { gutters } = useTheme();
  const { value, setValue } = propsInputCheck.parse(props);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      value={value}
      label={t('screen_login.password')}
      accessoryLeft={props => CustomIcon(props, 'lock-outline')}
      accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
      onChangeText={nextValue => setValue(nextValue)}
      style={[gutters.paddingTop_16]}
    />
  );
}

export default PassInput;
