import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Paths } from '@/navigation/paths';

export type RootStackParamList = {
  [Paths.Example]: undefined;
  [Paths.Startup]: undefined;
  [Paths.Home]: undefined;
  [Paths.Login]: undefined;
  [Paths.Register]: undefined;
  [Paths.PostDetail]: undefined;
};

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, S>;
