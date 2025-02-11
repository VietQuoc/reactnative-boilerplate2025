import type { RootScreenProps } from '@/navigation/types';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { AssetByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import { AuthServices } from '@/hooks/domain/auth/authService';
import { useLoginquery } from '@/hooks/domain/auth/useAuth';

function Startup({ navigation }: RootScreenProps<Paths.Startup>) {
  const { fonts, gutters, layout } = useTheme();
  const { t } = useTranslation();

  // const { isError, isFetching, isSuccess, refetch } = useLoginquery({
  //   username: 'user',
  //   password: 'User@123',
  // });

  const { isError, isFetching, isSuccess, refetch } = useQuery({
    queryFn: () => {
      return new Promise(resolve => {
        resolve(true);
      });
    },
    queryKey: ['startup'],
    enabled: true,
  });

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Login }],
      });
    }
  }, [isSuccess, navigation]);

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
