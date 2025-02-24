import { Icon, IconElement } from '@ui-kitten/components';

function CustomIcon(props: any, name: string) {
  return <Icon name={name} {...props} />;
}

const BackIcon = (props: any): IconElement => (
  <Icon {...props} name="arrow-back" />
);

export { CustomIcon, BackIcon };
