import { type FC } from 'react';

import type { FeedCardControllerProps } from './feedCard.type';
import FeedCardView from './feedCard.view';

const FeedCardController: FC<FeedCardControllerProps> = (props) => {
  const { article } = props;

  return <FeedCardView article={article} />;
};

export default FeedCardController;
