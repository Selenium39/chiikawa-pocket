import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Image: React.ComponentType<React.ComponentProps<'img'>>;
  description: ReactNode;
};

const FEATURE_TITLES = {
  GUIDE: '全面的游戏攻略',
  CHARACTERS: '图片库',
  NEWS: '最新游戏动态',
};

const FEATURE_DESCRIPTIONS = {
  GUIDE: '提供Chiikawa Pocket游戏的详细攻略，包括新手指南、关卡攻略、收集要素和隐藏内容等，帮助玩家轻松探索游戏世界。',
  CHARACTERS: '收集展示游戏中的精美图片和截图，包括角色立绘、场景图、活动海报等丰富视觉内容。',
  NEWS: '及时更新游戏的最新消息，包括版本更新、活动信息、官方公告等，让玩家不错过任何重要信息。',
};

const FeatureList: FeatureItem[] = [
  {
    title: FEATURE_TITLES.GUIDE,
    Image: () => <img src="/img/cover1.jpg" alt="游戏攻略" className={styles.featureSvg} />,
    description: (
      <>
        {FEATURE_DESCRIPTIONS.GUIDE}
      </>
    ),
  },
  {
    title: FEATURE_TITLES.CHARACTERS,
    Image: () => <img src="/img/cover2.jpg" alt="角色介绍" className={styles.featureSvg} />,
    description: (
      <>
        {FEATURE_DESCRIPTIONS.CHARACTERS}
      </>
    ),
  },
  {
    title: FEATURE_TITLES.NEWS,
    Image: () => <img src="/img/cover3.jpg" alt="游戏动态" className={styles.featureSvg} />,
    description: (
      <>
        {FEATURE_DESCRIPTIONS.NEWS}
      </>
    ),
  },
];

function Feature({title, Image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Image className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
