import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './about.module.css';

export default function About(): React.ReactNode {
  return (
    <Layout
      title="关于我们"
      description="关于Chiikawa Pocket中文站">
      <main className="container margin-vert--lg">
        <div className={styles.aboutContainer}>
          <Heading as="h1" className={styles.pageTitle}>关于我们</Heading>
          
          <div className={styles.aboutSection}>
            <Heading as="h2" className={styles.sectionTitle}>网站介绍</Heading>
            <p className={styles.sectionContent}>
              Chiikawa Pocket中文站是一个专注于提供Chiikawa Pocket游戏相关内容的网站。我们致力于为中文玩家提供最全面、最及时的游戏攻略、角色介绍和最新动态，帮助玩家更好地享受游戏乐趣。
            </p>
          </div>
          
          <div className={styles.aboutSection}>
            <Heading as="h2" className={styles.sectionTitle}>我们的使命</Heading>
            <p className={styles.sectionContent}>
              我们的使命是成为Chiikawa Pocket游戏中文社区的中心，连接游戏爱好者，分享游戏体验，传递游戏乐趣。我们希望通过我们的努力，让更多的玩家了解并喜欢上这款可爱的游戏。
            </p>
          </div>
          
          <div className={styles.aboutSection}>
            <Heading as="h2" className={styles.sectionTitle}>网站内容</Heading>
            <ul className={styles.contentList}>
              <li>详细的游戏攻略，包括新手指南、关卡攻略和收集要素</li>
              <li>角色介绍，包括每个角色的特性、技能和互动方式</li>
              <li>游戏最新动态，包括版本更新、活动信息和官方公告</li>
              <li>精美的游戏图片库，展示游戏中的场景和角色</li>
              <li>玩家交流平台，分享游戏心得和经验</li>
            </ul>
          </div>
          
          <div className={styles.aboutSection}>
            <Heading as="h2" className={styles.sectionTitle}>支持我们</Heading>
            <p className={styles.sectionContent}>
              如果您喜欢我们的网站内容，并希望支持我们继续提供更优质的服务，欢迎赞助我们
            </p>
            <div className={styles.donationSection}>
              <a href='https://ko-fi.com/E1E01DBMCP' target='_blank' rel="noreferrer">
                <img height='36' style={{border:0, height:'36px'}} src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' alt='Buy Me a Coffee at ko-fi.com' />
              </a>
            </div>
            <p className={styles.sectionContent} style={{marginTop: '1rem'}}>
              您的每一份支持都将帮助我们创造更多高质量的内容，感谢您的慷慨相助！
            </p>
          </div>
          
          <div className={styles.aboutSection}>
            <Heading as="h2" className={styles.sectionTitle}>联系我们</Heading>
            <p className={styles.sectionContent}>
              如果你有任何问题、建议或合作意向，欢迎通过以下方式联系我们
            </p>
            <ul className={styles.contactList}>
              <li><strong>邮箱：</strong> contact@chiikawa-pocket.me</li>
            </ul>
          </div>
          
          <div className={styles.aboutSection}>
            <Heading as="h2" className={styles.sectionTitle}>免责声明</Heading>
            <p className={styles.sectionContent}>
              本站为Chiikawa Pocket游戏的非官方粉丝网站，所有游戏相关内容的版权归游戏开发商和发行商所有。本站提供的游戏攻略、角色介绍和图片等内容仅供玩家参考，不代表游戏官方立场。
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
} 