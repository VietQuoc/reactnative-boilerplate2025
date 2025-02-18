import { LikeTypes, likeTypeToIconMap } from '@/hooks/domain/like/enums';
import { LikeSchema } from '@/hooks/domain/like/schema';
import { useTheme } from '@/theme';
import { Button, Icon, Popover } from '@ui-kitten/components';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

function groupLikeType(likes: any[]) {
  const countMap: Array<Record<LikeTypes, number>> = likes.reduce(
    (acc, like) => {
      acc[like.type] = (acc[like.type] || 0) + 1;
      return acc;
    },
    {},
  );

  const countArray = Object.entries(countMap);

  return countArray.sort((a: any, b: any) => b[1] - a[1]);
}

function LikeShowComponent(props: any) {
  const { likes }: { likes: LikeSchema[] } = props;
  if (!likes || likes.length === 0) return <View />;
  const { layout, gutters } = useTheme();
  const [listLikeVisible, setListLikeVisible] = useState(false);
  const groupLikes = useMemo(() => groupLikeType(likes), [likes]);

  return (
    <View style={[layout.row, layout.justifyStart]}>
      <Popover
        anchor={() => (
          <Button
            size="small"
            appearance="ghost"
            onPress={() => setListLikeVisible(true)}
            accessoryLeft={props => {
              return (
                <View style={[layout.row]}>
                  {groupLikes.slice(0, 3).map((value: any) => {
                    const iconName = likeTypeToIconMap[value[0]];

                    if (!iconName) {
                      // Nếu không tồn tại, sử dụng một biểu tượng mặc định
                      console.warn(
                        `Biểu tượng cho ${value[0]} không được định nghĩa.`,
                      );
                      return 'face-angry'; // Hoặc có thể trả về một biểu tượng mặc định
                    }
                    return (
                      <Icon
                        {...props}
                        key={iconName}
                        style={[
                          props?.style,
                          gutters.marginLeft_0,
                          gutters.paddingLeft_0,
                          gutters.marginRight_0,
                          gutters.paddingRight_0,
                        ]}
                        pack="vector"
                        name={iconName}
                      />
                    );
                  })}
                </View>
              );
            }}>
            {likes.length}
          </Button>
        )}
        visible={listLikeVisible}
        placement="top start"
        style={{ borderRadius: 15, borderWidth: 2 }}
        onBackdropPress={() => setListLikeVisible(false)}>
        <View style={[layout.col]}>
          {groupLikes.map(i => (
            <Button
              key={i[0]}
              size="small"
              appearance="ghost"
              accessoryLeft={(props: any) => (
                <Icon
                  {...props}
                  style={[props?.style]}
                  pack="vector"
                  name={likeTypeToIconMap[i[0]]}
                />
              )}>
              {'' + i[1]}
            </Button>
          ))}
        </View>
      </Popover>
    </View>
  );
}

export default LikeShowComponent;
