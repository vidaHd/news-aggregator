import HeaderView from './HeaderView';

import type { FC } from 'react';
import type { HeaderControllerProps } from './HeaderTypes';

const HeaderController: FC<HeaderControllerProps> = (props) => {
  return <HeaderView {...props} />;
};

export default HeaderController;
