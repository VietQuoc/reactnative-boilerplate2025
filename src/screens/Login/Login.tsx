import { SafeScreen } from '@/components/templates';
import { Input, Text, Card, Layout, CheckBox } from '@ui-kitten/components';
import { CustomIcon } from '@/components/ui/icons/CustomIcon';
import React, { useState } from 'react';
import PassInput from '@/components/ui/inputs/PassInput';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { View } from 'react-native';
import { LoadingButton } from '@/components/ui/buttons/LoadingButton';
import { useLogin } from '@/hooks/domain/auth/useAuth';
import AppLogo from '@/components/ui/images/logo';
import { FacebookButton } from '@/components/ui/buttons/FacebookButton';
import { useOrientation, OrientationKey } from '@/hooks/devices/useOrientation';
import { Formik } from 'formik';
import { getLoginSchema } from '@/hooks/domain/auth/schema';

function LoginScreen() {
  const { t } = useTranslation();
  const { layout, gutters, fonts } = useTheme();
  const orientation = useOrientation();
  const [checked, setChecked] = useState(false);
  const loginSchema = getLoginSchema(t);
  const { mutateFunction, loading } = useLogin();

  const isPortrait = orientation === OrientationKey.Portrait;

  return (
    <SafeScreen>
      <Formik
        initialValues={{ password: '', username: '' }}
        validationSchema={loginSchema}
        onSubmit={values =>
          mutateFunction({
            variables: {
              authInput: {
                password: values.password,
                username: values.username,
              },
            },
          })
        }>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
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
                  value={values.username}
                  accessoryLeft={props => CustomIcon(props, 'person-outline')}
                  label={evaProps => (
                    <Text {...evaProps}>{t('screen_login.username')}</Text>
                  )}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                />
                {touched.username && errors.username && (
                  <Text status="danger">{errors.username}</Text>
                )}
                <PassInput
                  value={values.password}
                  setValue={handleChange('password')}
                />
                {touched.password && errors.password && (
                  <Text status="danger">{errors.password}</Text>
                )}
                <LoadingButton
                  isLoading={loading}
                  defaultText={t('screen_login.login')}
                  loadingText={t('screen_login.loggingin')}
                  onPress={handleSubmit}
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
                onPress={() => {}}
              />
            </View>
          </Layout>
        )}
      </Formik>
    </SafeScreen>
  );
}

export default LoginScreen;
