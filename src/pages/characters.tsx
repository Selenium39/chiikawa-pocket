import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './characters.module.css';

type CharacterItem = {
  name: string;
  description: string;
  traits: string[];
  image: string;
};

const CharacterList: CharacterItem[] = [
  {
    name: '小松鼠',
    description: '游戏中最受欢迎的角色之一，活泼可爱，喜欢收集坚果和各种小物件。在游戏中擅长收集资源和探索隐藏区域。',
    traits: ['活泼', '好奇', '收集能手'],
    image: '/img/characters/squirrel.png',
  },
  {
    name: '小兔子',
    description: '性格温和，动作迅速的角色。在游戏中移动速度快，适合完成需要计时的任务和挑战。',
    traits: ['温和', '迅速', '敏捷'],
    image: '/img/characters/rabbit.png',
  },
  {
    name: '小熊',
    description: '力量型角色，虽然动作较慢但力量很大。在游戏中可以搬运重物，打开特殊区域。',
    traits: ['强壮', '友善', '勇敢'],
    image: '/img/characters/bear.png',
  },
  {
    name: '小鸟',
    description: '游戏中唯一能飞行的角色，可以到达其他角色无法到达的区域，适合探索和侦查。',
    traits: ['灵活', '聪明', '观察力强'],
    image: '/img/characters/bird.png',
  },
  {
    name: '小猫',
    description: '夜行性角色，在夜间场景中有特殊能力，可以看到隐藏的物品和路径。',
    traits: ['神秘', '独立', '敏锐'],
    image: '/img/characters/cat.png',
  },
  {
    name: '小狐狸',
    description: '狡猾聪明的角色，擅长解谜和找出隐藏线索，在解密游戏中非常有用。',
    traits: ['聪明', '机智', '善于观察'],
    image: '/img/characters/fox.png',
  },
];

function Character({name, description, traits, image}: CharacterItem) {
  return (
    <div className={styles.characterCard}>
      <div className={styles.characterImageContainer}>
        <img src={image} alt={name} className={styles.characterImage} />
      </div>
      <div className={styles.characterInfo}>
        <Heading as="h3" className={styles.characterName}>{name}</Heading>
        <p className={styles.characterDescription}>{description}</p>
        <div className={styles.characterTraits}>
          {traits.map((trait, idx) => (
            <span key={idx} className={styles.characterTrait}>{trait}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Characters(): React.ReactNode {
  return (
    <Layout
      title="角色介绍"
      description="Chiikawa Pocket游戏中的可爱角色介绍">
      <main className="container margin-vert--lg">
        <Heading as="h1" className={styles.pageTitle}>游戏角色介绍</Heading>
        <p className={styles.pageDescription}>
          Chiikawa Pocket游戏中有许多可爱的角色，每个角色都有独特的特性和技能。
          了解这些角色的特点，可以帮助你在游戏中更好地搭配和使用它们。
        </p>
        <div className={styles.charactersContainer}>
          {CharacterList.map((props, idx) => (
            <Character key={idx} {...props} />
          ))}
        </div>
      </main>
    </Layout>
  );
} 