import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import useIsBrowser from '@docusaurus/useIsBrowser';

interface Card {
  id: number;
  imageId: number;
  isFlipped: boolean;
  isMatched: boolean;
  position: {
    row: number;
    col: number;
  };
}

export default function ChiikawaLianliankan() {
  const isBrowser = useIsBrowser();
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [remainingPairs, setRemainingPairs] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  // 音频引用
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const matchSoundRef = useRef<HTMLAudioElement | null>(null);

  // 初始化音频
  useEffect(() => {
    if (!isBrowser) return;

    backgroundMusicRef.current = new Audio('/audio/chiikawa-game/lianliankan/background_music.mp3');
    backgroundMusicRef.current.loop = true;
    matchSoundRef.current = new Audio('/audio/chiikawa-game/lianliankan/chiikawa_bonus.mp3');

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
      }
      if (matchSoundRef.current) {
        matchSoundRef.current.pause();
        matchSoundRef.current.currentTime = 0;
      }
    };
  }, [isBrowser]);

  // 计时器
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isStarted && !isGameOver) {
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
      // 开始游戏时播放背景音乐
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.play();
      }
    } else {
      // 游戏结束或未开始时停止背景音乐
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
      }
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isStarted, isGameOver]);

  // 格式化时间
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 获取卡片图片路径
  const getCardImagePath = (imageId: number) => {
    const images = [
      '/img/chiikawa-game/lianliankan/chiikawa.png',
      '/img/chiikawa-game/lianliankan/hachiware.png',
      '/img/chiikawa-game/lianliankan/usagi.png',
      '/img/chiikawa-game/lianliankan/momonga.png',
      '/img/chiikawa-game/lianliankan/kurimanju.png',
      '/img/chiikawa-game/lianliankan/rakko.png',
      '/img/chiikawa-game/lianliankan/shisa.png',
      '/img/chiikawa-game/lianliankan/all.png'
    ];
    return images[imageId];
  };

  // 初始化游戏
  const initializeGame = () => {
    const numPairs = 8; // 8对卡片，总共16张
    const cardPairs: Card[] = [];
    
    // 创建卡片对
    for (let i = 0; i < numPairs; i++) {
      for (let j = 0; j < 2; j++) {
        cardPairs.push({
          id: i * 2 + j,
          imageId: i,
          isFlipped: false,
          isMatched: false,
          position: {
            row: 0,
            col: 0,
          },
        });
      }
    }

    // 随机打乱卡片
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);

    // 设置卡片位置
    const arrangedCards = shuffledCards.map((card, index) => ({
      ...card,
      position: {
        row: Math.floor(index / 4),
        col: index % 4,
      },
    }));

    setCards(arrangedCards);
    setRemainingPairs(numPairs);
    setTime(0);
    setIsGameOver(false);
    setSelectedCards([]);
    setIsStarted(true);
  };

  // 处理卡片点击
  const handleCardClick = (card: Card) => {
    if (!isStarted || card.isMatched || card.isFlipped || selectedCards.length >= 2) {
      return;
    }

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newSelectedCards = [...selectedCards, card];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      // 检查是否匹配
      if (newSelectedCards[0].imageId === newSelectedCards[1].imageId) {
        setTimeout(() => {
          // 播放匹配音效
          if (matchSoundRef.current) {
            matchSoundRef.current.currentTime = 0;
            matchSoundRef.current.play();
          }

          const matchedCards = cards.map((c) =>
            c.id === newSelectedCards[0].id || c.id === newSelectedCards[1].id
              ? { ...c, isMatched: true }
              : c
          );
          setCards(matchedCards);
          setSelectedCards([]);
          setRemainingPairs((prev) => prev - 1);

          // 检查游戏是否结束
          if (remainingPairs === 1) {
            setIsGameOver(true);
            setIsStarted(false);
          }
        }, 500);
      } else {
        // 不匹配，翻回去
        setTimeout(() => {
          const resetCards = cards.map((c) =>
            c.id === newSelectedCards[0].id || c.id === newSelectedCards[1].id
              ? { ...c, isFlipped: false }
              : c
          );
          setCards(resetCards);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  if (!isBrowser) {
    return null;
  }

  return (
    <div className={styles.gameContainer}>
      <div className={styles.statusBar}>
        <h1 className={styles.title}>Chiikawa 连连看</h1>
        <div className={styles.stats}>
          <div className={styles.time}>
            用时<span>{formatTime(time)}</span>
          </div>
          <div className={styles.remainingPairs}>
            剩余配对<span>{remainingPairs}</span>
          </div>
        </div>
      </div>
      <div className={styles.gameBoard}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${styles.card} ${
              card.isFlipped || card.isMatched ? styles.flipped : ''
            } ${card.isMatched ? styles.matched : ''}`}
            style={{
              gridRow: card.position.row + 1,
              gridColumn: card.position.col + 1,
            }}
            onClick={() => handleCardClick(card)}
          >
            <div className={styles.cardInner}>
              <div className={styles.cardFront} />
              <div
                className={styles.cardBack}
                style={{
                  backgroundImage: `url(${getCardImagePath(card.imageId)})`,
                }}
              />
            </div>
          </div>
        ))}
        {(!isStarted || isGameOver) && (
          <button className={styles.startButton} onClick={initializeGame}>
            {isGameOver ? '再玩一次' : '开始游戏'}
          </button>
        )}
        {isGameOver && (
          <div className={styles.gameOver}>
            完成！用时 {formatTime(time)}
          </div>
        )}
      </div>
    </div>
  );
} 