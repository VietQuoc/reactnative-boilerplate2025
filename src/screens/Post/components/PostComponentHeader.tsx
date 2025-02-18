import { useTheme } from '@/theme';
import i18n from '@/translations';
import { formatTimestamp } from '@/utils/formatTime';
import {
  Avatar,
  Button,
  Icon,
  Text,
  TopNavigationAction,
  useTheme as useThemeKitten,
} from '@ui-kitten/components';
import { Privacy } from '@/hooks/domain/post/schema';
import { Variant } from '@/theme/_config';
import { useMemo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostComponentHeader = (props: any): React.ReactElement => {
  const {
    avatarUrl,
    displayName,
    createdAt,
    privacy,
    isCard = true,
  }: {
    isCard: boolean;
    avatarUrl: string;
    displayName: string;
    createdAt: string;
    privacy: Privacy;
  } = props;
  const { layout, gutters, fonts, variant } = useTheme();
  const t = useThemeKitten();
  const time = useMemo(
    () => formatTimestamp(createdAt, i18n.languages[1]),
    [createdAt],
  );
  const nanavigation = useNavigation();

  let privacyIconText = useMemo(() => {
    switch (privacy) {
      case Privacy.PUBLIC:
        return 'globe-3';
      case Privacy.FRIENDS:
        return 'user-group';
      case Privacy.PRIVATE:
        return 'lock';
      default:
        return 'user-group';
    }
  }, [privacy]);

  const containerStyle = useMemo(() => {
    if (isCard) return [layout.row, layout.itemsCenter, gutters.margin_12];
    return [
      layout.row,
      layout.itemsCenter,
      layout.justifyBetween,
      gutters.marginVertical_12,
    ];
  }, [isCard]);

  return (
    <View {...props} style={containerStyle}>
      <View style={[layout.row, layout.itemsCenter]}>
        {isCard ? null : (
          <TopNavigationAction
            onPress={() => nanavigation.goBack()}
            icon={iconProps => <Icon {...iconProps} name="arrow-ios-back" />}
          />
        )}

        <Avatar resizeMode="none" size="large" source={{ uri: avatarUrl }} />
        <View style={[gutters.paddingLeft_12]}>
          <Text category="h6">{displayName}</Text>
          <View style={[gutters.paddingTop_3, layout.row, layout.itemsCenter]}>
            <Text category="c1">{time}</Text>
            <Icon
              {...props}
              style={[
                { ...props.style },
                {
                  width: 18,
                  height: 18,
                  tintColor:
                    variant === Variant.LIGHT
                      ? t['color-basic-900']
                      : t['color-basic-100'],
                },
                gutters.marginLeft_6,
              ]}
              name={privacyIconText}
            />
          </View>
        </View>
      </View>
      <View>
        <Button
          size="large"
          appearance="ghost"
          accessoryLeft={props => <Icon on {...props} name="more-vertical" />}
        />
      </View>
    </View>
  );
};

export default PostComponentHeader;
