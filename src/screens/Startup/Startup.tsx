import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { AssetByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import { useUser } from '@/hooks';
import usePopup from '@/theme/hooks/usePopup';
import { useNavigation } from '@react-navigation/native';

function Startup() {
  const { fonts, gutters, layout } = useTheme();
  const { t } = useTranslation();
  const navigation: any = useNavigation();

  const { useFetchCurrentUserQuery } = useUser();
  const { isError, isFetching, isSuccess, error } = useFetchCurrentUserQuery();
  const { showPopup } = usePopup();

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Login }],
      });
    }
    if (isError) {
      showPopup(error.message, () =>
        navigation.reset({
          index: 0,
          routes: [{ name: Paths.Login }],
        }),
      );
    }
  }, [isError, isSuccess, navigation]);

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}>
        <AssetByVariant
          path={'whitebear'}
          resizeMode={'contain'}
          style={{ height: 300, width: 300 }}
        />
        {isFetching && (
          <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
        )}
        {isError && (
          <Text style={[fonts.size_16, fonts.red500]}>{t('common_error')}</Text>
        )}
      </View>
    </SafeScreen>
  );
}

export default Startup;
