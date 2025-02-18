import { LikeIcons, LikeTypes } from '@/hooks/domain/like/enums';
import { useTheme } from '@/theme';
import { Button, Icon } from '@ui-kitten/components';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { PanResponder, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

function LikeSelector(props: any) {
  const { layout } = useTheme();
  const listIcons = Object.values(LikeIcons);
  const {
    handleLike,
    handleDisLike,
    isLikedByCurrentUser,
    setVisible,
    activeIcon,
  }: {
    handleLike: Function;
    handleDisLike: Function;
    isLikedByCurrentUser: {
      type: string;
      isLiked: boolean;
    };
    setVisible: Function;
    activeIcon: { active: boolean; index: number };
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

  const activeSize = useCallback(
    (index: number) => {
      if (activeIcon.active && index == activeIcon.index) {
        return true;
      }
      return false;
    },
    [activeIcon],
  );

  return (
    <View {...props} style={[props.style, layout.row]}>
      {listIcons.map((i, index) => (
        <Button
          key={i}
          size="small"
          style={{ width: 50 }}
          appearance="ghost"
          onPress={() => handleClickLike(likeTypesValues[index])}
          accessoryLeft={(props: any) => {
            const isCustomSize = activeSize(index);
            return (
              <Icon
                {...props}
                style={[
                  props?.style,
                  isCustomSize ? { width: 35, height: 35 } : 0,
                  {
                    position: 'absolute',
                    left: isCustomSize ? -27 : -17.5,
                    top: isCustomSize ? -27 : '-50%',
                  },
                ]}
                pack="vector"
                name={i}
              />
            );
          }}
        />
      ))}
    </View>
  );
}

export default LikeSelector;
