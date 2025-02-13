import { Dimensions, Image } from 'react-native';
import { z } from 'zod';

const logoPropsSchema = z.object({
  sizePercent: z.number(),
  styles: z.record(z.union([z.string(), z.number()])).optional(),
});

type LogoProps = z.infer<typeof logoPropsSchema>;

const screenSize = Dimensions.get('window');

function AppLogo(props: LogoProps) {
  const { sizePercent, styles } = logoPropsSchema.parse(props);
  const { width, height } = screenSize;
  const squareSize = Math.min(width, height) * sizePercent;
  return (
    <Image
      source={require('@/theme/assets/images/whitebeargif.gif')}
      style={[
        {
          width: squareSize,
          height: squareSize,
        },
        styles,
      ]}
    />
  );
}

export default AppLogo;
