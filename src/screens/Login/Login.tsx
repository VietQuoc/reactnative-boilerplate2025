import { SafeScreen } from '@/components/templates';
import { Input, Text, Card, Layout, CheckBox } from '@ui-kitten/components';
import { CustomIcon } from '@/components/ui/icons/CustomIcon';
import React, { useState } from 'react';
import PassInput from '@/components/ui/inputs/PassInput';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { View } from 'react-native';
import { LoadingButton } from '@/components/ui/buttons/LoadingButton';
import { useLoginquery } from '@/hooks/domain/auth/useAuth';
import AppLogo from '@/components/ui/images/logo';
import { FacebookButton } from '@/components/ui/buttons/FacebookButton';
import { useOrientation, OrientationKey } from '@/hooks/devices/useOrientation';
import usePopup from '@/theme/hooks/usePopup';
import { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';

function LoginScreen({ navigation }: RootScreenProps<Paths.Login>) {
  const { t } = useTranslation();
  const { layout, gutters, fonts } = useTheme();
  const orientation = useOrientation();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [checked, setChecked] = useState(false);
  const { showPopup } = usePopup();

  const { isFetching, refetch } = useLoginquery({
    username: username,
    password: password,
    enabled: false,
  });

  async function onLogin() {
    const response: any = await refetch();
    if (response.isError) {
      showPopup(response.error.message, () => {});
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Home }],
      });
    }
  }

  const isPortrait = orientation === OrientationKey.Portrait;

  return (
    <SafeScreen>
      <Layout
        style={[
          layout.fullHeight,
          layout.itemsCenter,
          isPortrait ? layout.col : layout.row,
        ]}>
        <View
          style={[
            isPortrait ? layout.flex_2 : layout.flex_1,
            layout.justifyCenter,
            layout.itemsCenter,
            layout.fullWidth,
          ]}>
          <AppLogo sizePercent={0.4} />
        </View>

        <View style={[layout.flex_3, layout.fullWidth]}>
          <Card style={[gutters.marginHorizontal_12]}>
            <Text
              style={[
                fonts.alignCenter,
                fonts.size_24,
                fonts.bold,
                fonts.uppercase,
                gutters.marginBottom_12,
              ]}>
              {t('screen_login.login')}
            </Text>
            <Input
              value={username}
              accessoryLeft={props => CustomIcon(props, 'person-outline')}
              label={evaProps => (
                <Text {...evaProps}>{t('screen_login.username')}</Text>
              )}
              onChangeText={value => setUsername(value)}
            />
            <PassInput value={password} setValue={setPassword} />
            <LoadingButton
              isLoading={isFetching}
              defaultText={t('screen_login.login')}
              loadingText={t('screen_login.loggingin')}
              onPress={onLogin}
            />
            <CheckBox
              style={[
                layout.justifyEnd,
                gutters.marginTop_16,
                { borderRadius: 16 },
              ]}
              checked={checked}
              onChange={nextChecked => setChecked(nextChecked)}>
              {t('screen_login.remember')}
            </CheckBox>
          </Card>
        </View>

        <View style={[layout.flex_1]}>
          <FacebookButton
            loginText={
              isPortrait
                ? t('screen_login.facebook_login')
                : t('common_screen.facebook')
            }
            isLoading={false}
            onPress={() =>
              showPopup(username, () => {
                console.log('On close call');
              })
            }
          />
        </View>
      </Layout>
    </SafeScreen>
  );
}

export default LoginScreen;
