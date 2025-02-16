import { LikeTypes, likeTypeToIconMap } from '@/hooks/domain/like/enums';
import { LikeSchema } from '@/hooks/domain/like/schema';
import { useTheme } from '@/theme';
import { Button, Icon } from '@ui-kitten/components';
import { useMemo } from 'react';
import { View } from 'react-native';

function getThreeLast(likes: any[]): LikeTypes[] {
  const countMap = likes.reduce((acc: any, like) => {
    acc[like.type] = (acc[like.type] || 0) + 1;
    return acc;
  }, {});

  const countArray = Object.entries(countMap);
  countArray.sort((a: any, b: any) => b[1] - a[1]);
  return countArray.slice(0, 3).map((item: any) => item[0]);
}

function LikeShowComponent(props: any) {
  const { likes }: { likes: LikeSchema[] } = props;
  if (!likes || likes.length === 0) return <View />;
  const { layout, gutters } = useTheme();

  const listLikeIcons: LikeTypes[] = useMemo(
    () => getThreeLast(likes),
    [likes],
  );
  return (
    <View style={[layout.row, layout.justifyStart]}>
      <Button
        size="small"
        appearance="ghost"
        accessoryLeft={props => {
          return (
            <View style={[layout.row]}>
              {listLikeIcons.map((value: any) => {
                const iconName = likeTypeToIconMap[value];

                if (!iconName) {
                  // Nếu không tồn tại, sử dụng một biểu tượng mặc định
                  console.warn(
                    `Biểu tượng cho ${value} không được định nghĩa.`,
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
    </View>
  );
}

export default LikeShowComponent;
