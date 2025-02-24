import { SafeScreen } from '@/components/templates';
import { LoadingButton } from '@/components/ui/buttons/LoadingButton';
import { BackIcon, CustomIcon } from '@/components/ui/icons/CustomIcon';
import PassInput from '@/components/ui/inputs/PassInput';
import { ReactNativeFile } from '@/hooks/client/apolloClient';
import { getRegisterSchema } from '@/hooks/domain/auth/schema';
import { useRegister } from '@/hooks/domain/auth/useAuth';
import { useTheme } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import {
  Input,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { Formik } from 'formik';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

function RegisterScreen() {
  const { layout, gutters, fonts } = useTheme();
  const { t } = useTranslation();
  const { goBack }: any = useNavigation();
  const registerSchema = getRegisterSchema(t);

  const { mutateFunction, loading } = useRegister();
  // ReactNativeFile

  const takeMedias = useCallback(async (callback: Function) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result?.assets) {
      callback(result.assets[0]);
    }
  }, []);

  const initValues: {
    password: string;
    username: string;
    email: string;
    address: string;
    displayName: string;
    phoneNumber: string;
    avatar: Asset | null;
  } = {
    password: '',
    username: '',
    email: '',
    address: '',
    displayName: '',
    phoneNumber: '',
    avatar: null,
  };

  return (
    <SafeScreen>
      <SafeAreaView>
        <TopNavigation
          alignment="center"
          title={t('screen_register.register')}
          accessoryLeft={() => (
            <TopNavigationAction icon={BackIcon} onPress={() => goBack()} />
          )}
        />
        <Formik
          initialValues={initValues}
          validationSchema={registerSchema}
          onSubmit={values => {
            console.log(values);
            // const file = new ReactNativeFile({
            //   uri: values?.avatar?.uri,
            //   name: values?.avatar?.fileName,
            //   type: values?.avatar?.type,
            // });
            const avatar = new ReactNativeFile({
              uri: values?.avatar?.uri || '',
              name: values?.avatar?.fileName || '',
              type: values?.avatar?.type || '',
            });

            mutateFunction({
              variables: {
                createUserInput: {
                  username: values.username,
                  password: values.password,
                  email: values.email,
                  address: values.address,
                  displayName: values.displayName,
                  phoneNumber: values.phoneNumber,
                },
                avatar,
              },
            });
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            touched,
            errors,
          }) => (
            <ScrollView contentContainerStyle={[gutters.marginHorizontal_24]}>
              <TouchableWithoutFeedback
                style={[gutters.marginBottom_12, layout.row]}
                onPress={() =>
                  takeMedias((file: Asset) => setFieldValue('avatar', file))
                }>
                <View
                  style={[
                    {
                      width: 110,
                      height: 110,
                      borderWidth: 1,
                      borderRadius: 10,
                    },
                    layout.itemsCenter,
                    ,
                    layout.justifyCenter,
                  ]}>
                  <Text>{t('screen_register.avatar')}</Text>
                </View>
                <Image
                  width={110}
                  height={110}
                  style={[
                    layout.absolute,
                    {
                      borderWidth: 0.5,
                      borderRadius: 10,
                    },
                  ]}
                  source={{ uri: values.avatar?.uri }}
                />
                {touched.avatar && errors.avatar && (
                  <Text
                    style={[fonts.alignCenter, gutters.paddingLeft_12]}
                    status="danger">
                    {errors.avatar}
                  </Text>
                )}
              </TouchableWithoutFeedback>

              <Input
                value={values.username}
                accessoryLeft={props => CustomIcon(props, 'person-outline')}
                label={evaProps => (
                  <Text {...evaProps}>{t('screen_login.username')}</Text>
                )}
                onChangeText={handleChange('username')}
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
              <Input
                value={values.email}
                style={gutters.marginTop_12}
                accessoryLeft={props => CustomIcon(props, 'email-outline')}
                label={evaProps => (
                  <Text {...evaProps}>{t('screen_register.email')}</Text>
                )}
                onChangeText={handleChange('email')}
              />
              {touched.email && errors.email && (
                <Text status="danger">{errors.email}</Text>
              )}
              <Input
                value={values.address}
                style={gutters.marginTop_12}
                accessoryLeft={props => CustomIcon(props, 'home-outline')}
                label={evaProps => (
                  <Text {...evaProps}>{t('screen_register.address')}</Text>
                )}
                onChangeText={handleChange('address')}
              />
              <Input
                value={values.displayName}
                style={gutters.marginTop_12}
                accessoryLeft={props => CustomIcon(props, 'sun-outline')}
                label={evaProps => (
                  <Text {...evaProps}>{t('screen_register.display_name')}</Text>
                )}
                onChangeText={handleChange('displayName')}
              />
              {touched.displayName && errors.displayName && (
                <Text status="danger">{errors.displayName}</Text>
              )}
              <Input
                value={values.phoneNumber}
                style={gutters.marginTop_12}
                accessoryLeft={props => CustomIcon(props, 'phone-outline')}
                label={evaProps => (
                  <Text {...evaProps}>{t('screen_register.phone_number')}</Text>
                )}
                onChangeText={handleChange('phoneNumber')}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text status="danger">{errors.phoneNumber}</Text>
              )}
              <LoadingButton
                isLoading={loading}
                defaultText={t('screen_register.register')}
                loadingText={t('screen_register.register')}
                onPress={handleSubmit}
              />
            </ScrollView>
          )}
        </Formik>
      </SafeAreaView>
    </SafeScreen>
  );
}

export default RegisterScreen;
