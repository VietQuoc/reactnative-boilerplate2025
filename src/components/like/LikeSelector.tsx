import { LikeIcons, LikeTypes } from '@/hooks/domain/like/enums';
import { useTheme } from '@/theme';
import { Button, Icon } from '@ui-kitten/components';
import { useCallback, useMemo } from 'react';
import { View } from 'react-native';

function LikeSelector(props: any) {
  const { layout } = useTheme();
  const listIcons = Object.values(LikeIcons);
  const {
    handleLike,
    handleDisLike,
    isLikedByCurrentUser,
    setVisible,
  }: {
    handleLike: Function;
    handleDisLike: Function;
    isLikedByCurrentUser: {
      type: string;
      isLiked: boolean;
    };
    setVisible: Function;
  } = props;
  const likeTypesValues = useMemo(() => Object.values(LikeTypes), []);

  const handleClickLike = useCallback(
    (type: LikeTypes) => {
      if (isLikedByCurrentUser.isLiked && type == isLikedByCurrentUser.type)
        handleDisLike();
      else handleLike(type);
      setVisible(false);
    },
    [isLikedByCurrentUser.isLiked],
  );

  return (
    <View {...props} style={[props.style, layout.row]}>
      {listIcons.map((i, index) => (
        <Button
          key={i}
          size="small"
          appearance="ghost"
          onPressIn={() => console.log('onMouseEnter')}
          onPress={() => handleClickLike(likeTypesValues[index])}
          accessoryLeft={(props: any) => (
            <Icon {...props} style={[props?.style]} pack="vector" name={i} />
          )}
        />
      ))}
    </View>
  );
}

export default LikeSelector;
