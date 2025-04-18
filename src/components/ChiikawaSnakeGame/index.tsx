import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './styles.module.css';
import useIsBrowser from '@docusaurus/useIsBrowser';

interface Position {
  x: number;
  y: number;
}

export default function ChiikawaSnakeGame() {
  const isBrowser = useIsBrowser();
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [snake, setSnake] = useState<Position[]>(() => createInitialSnake());
  const [food, setFood] = useState<Position>(() => ({ x: 20, y: 10 }));
  const [direction, setDirection] = useState<string>('right');
  const [showSnakeBonus, setShowSnakeBonus] = useState(false);
  const [showRabbitBonus, setShowRabbitBonus] = useState(false);
  const [showChiikawaBonus, setShowChiikawaBonus] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [debug, setDebug] = useState('');
  
  // 使用useRef存储当前值，避免闭包问题
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentDirectionRef = useRef<string>(direction);
  const currentSnakeRef = useRef<Position[]>(snake);
  const isGameOverRef = useRef<boolean>(isGameOver);
  const isStartedRef = useRef<boolean>(isStarted);
  const foodRef = useRef<Position>(food);
  const scoreRef = useRef<number>(score);
  
  // 音频引用
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const eatSoundRef = useRef<HTMLAudioElement | null>(null);
  const gameoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const popupSoundRef = useRef<HTMLAudioElement | null>(null);
  const popupSound1Ref = useRef<HTMLAudioElement | null>(null);
  const popupSound2Ref = useRef<HTMLAudioElement | null>(null);

  // 在方向改变时更新ref
  useEffect(() => {
    currentDirectionRef.current = direction;
  }, [direction]);

  // 在蛇状态改变时更新ref
  useEffect(() => {
    currentSnakeRef.current = snake;
  }, [snake]);

  // 在食物状态改变时更新ref
  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  // 在游戏状态改变时更新ref
  useEffect(() => {
    isGameOverRef.current = isGameOver;
    isStartedRef.current = isStarted;
  }, [isGameOver, isStarted]);

  // 在分数改变时更新ref
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // 创建初始蛇 - 函数需要在useState之前定义
  function createInitialSnake(): Position[] {
    const initialSnake = [];
    for (let i = 0; i < 4; i++) {
      initialSnake.push({ x: 3 - i, y: 1 });
    }
    return initialSnake;
  }

  // 初始化音频
  useEffect(() => {
    if (!isBrowser) return;

    backgroundMusicRef.current = new Audio('/audio/chiikawa-game/snake/background_music.mp3');
    backgroundMusicRef.current.loop = true;
    eatSoundRef.current = new Audio('/audio/chiikawa-game/snake/eat.mp3');
    gameoverSoundRef.current = new Audio('/audio/chiikawa-game/snake/gameover.mp3');
    popupSoundRef.current = new Audio('/audio/chiikawa-game/snake/snake_bonus.mp3');
    popupSound1Ref.current = new Audio('/audio/chiikawa-game/snake/rabbit_bonus.mp3');
    popupSound2Ref.current = new Audio('/audio/chiikawa-game/snake/chiikawa_bonus.mp3');

    return () => {
      // 清理音频资源
      [backgroundMusicRef, eatSoundRef, gameoverSoundRef, popupSoundRef, popupSound1Ref, popupSound2Ref].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      });
    };
  }, [isBrowser]);

  // 生成随机食物位置
  const generateFood = () => {
    // 确保食物不会生成在蛇身上
    let newFood;
    let isOnSnake = true;
    
    while (isOnSnake) {
      const x = Math.floor(Math.random() * 33);
      const y = Math.floor(Math.random() * 19);
      newFood = { x, y };
      
      // 检查是否与蛇重叠
      isOnSnake = currentSnakeRef.current.some(
        segment => segment.x === newFood.x && segment.y === newFood.y
      );
    }
    
    return newFood;
  };

  // 检查碰撞
  const checkCollision = (head: Position, snakeBody: Position[]) => {
    // 检查墙壁碰撞
    if (head.x < 0 || head.x >= 33 || head.y < 0 || head.y >= 19) {
      return true;
    }
    // 检查自身碰撞
    return snakeBody.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
  };

  // 显示奖励图片
  const showBonus = (type: 'snake' | 'rabbit' | 'chiikawa') => {
    const setterMap = {
      snake: setShowSnakeBonus,
      rabbit: setShowRabbitBonus,
      chiikawa: setShowChiikawaBonus
    };
    setterMap[type](true);
    setTimeout(() => setterMap[type](false), 3000);
  };

  // 移动蛇 - 不使用useCallback以避免过时的依赖
  const moveSnake = () => {
    // 使用ref中的最新值
    const prevSnake = [...currentSnakeRef.current];
    if (prevSnake.length === 0) return;
    
    const head = { ...prevSnake[0] };
    const currentDirection = currentDirectionRef.current;
    
    // 根据当前方向移动头部
    switch (currentDirection) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }

    // 检查碰撞
    if (checkCollision(head, prevSnake)) {
      // 游戏结束
      setIsGameOver(true);
      setIsStarted(false);
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
      if (gameoverSoundRef.current) {
        if (backgroundMusicRef.current) {
          backgroundMusicRef.current.pause();
        }
        gameoverSoundRef.current.play();
      }
      return;
    }

    // 获取当前食物位置
    const currentFood = foodRef.current;
    
    // 检查是否吃到食物
    const ate = (head.x === currentFood.x) && (head.y === currentFood.y);

    // 创建新蛇身体
    let newSnake;
    
    if (ate) {
      // 吃到食物 - 蛇增长
      // 让蛇增长
      newSnake = [head, ...prevSnake];
      
      // 播放音效
      if (eatSoundRef.current) {
        eatSoundRef.current.currentTime = 0;
        eatSoundRef.current.play();
      }
      
      // 更新分数和奖励
      const newScore = scoreRef.current + 1;
      setScore(newScore);
      scoreRef.current = newScore;
      
      // 检查特殊奖励
      if (newScore % 20 === 0) {
        if (popupSound1Ref.current) {
          popupSound1Ref.current.currentTime = 0;
          popupSound1Ref.current.play();
        }
        showBonus('rabbit');
      } else if (newScore % 5 === 0) {
        if (popupSoundRef.current) {
          popupSoundRef.current.currentTime = 0;
          popupSoundRef.current.play();
        }
        showBonus('snake');
      } else if (newScore % 3 === 0) {
        if (popupSound2Ref.current) {
          popupSound2Ref.current.currentTime = 0;
          popupSound2Ref.current.play();
        }
        showBonus('chiikawa');
      }
      
      // 生成新食物
      const newFood = generateFood();
      setFood(newFood);
    } else {
      // 没吃到食物 - 蛇移动
      newSnake = [head, ...prevSnake.slice(0, -1)];
    }
    
    // 更新蛇的状态
    setSnake(newSnake);
    currentSnakeRef.current = newSnake;
  };

  // 游戏主循环
  const gameLoop = useCallback(() => {
    if (isGameOverRef.current) return;
    
    moveSnake();
    
    // 计算蛇的速度，随着长度增加而加快
    // 基础速度200ms，每增加5个长度减少10ms，最快速度为50ms
    const baseSpeed = 200;
    const speedReduction = Math.min(150, Math.floor((currentSnakeRef.current.length - 4) / 5) * 10);
    const currentSpeed = Math.max(50, baseSpeed - speedReduction);
    
    // 为下一帧安排下一次移动
    const timerId = setTimeout(gameLoop, currentSpeed);
    intervalRef.current = timerId;
  }, []);
  
  // 处理开始/重新开始游戏
  const handleGameStart = () => {
    // 清除现有的定时器
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    
    // 重置游戏状态
    const initialSnake = createInitialSnake();
    setSnake(initialSnake);
    currentSnakeRef.current = initialSnake;
    
    // 生成初始食物 - 确保不在蛇身上
    const initialFood = generateFood();
    setFood(initialFood);
    
    setScore(0);
    scoreRef.current = 0;
    setDirection('right');
    currentDirectionRef.current = 'right';
    
    setIsGameOver(false);
    isGameOverRef.current = false;
    
    setIsStarted(true);
    isStartedRef.current = true;
    
    // 播放背景音乐
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.currentTime = 0;
      backgroundMusicRef.current.play();
    }
    
    // 直接启动游戏循环
    gameLoop();
  };

  // 处理键盘事件
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // 空格键控制游戏开始/暂停/重新开始
    if (e.key === ' ' || e.code === 'Space') {
      if (!isStartedRef.current || isGameOverRef.current) {
        // 如果游戏未开始或者已结束，则开始新游戏
        handleGameStart();
      } else {
        // 暂停/继续现有游戏 - 通过按钮实现
        document.querySelector('button')?.click();
      }
      return;
    }

    // 只有在游戏进行中才能控制方向
    if (isStartedRef.current && !isGameOverRef.current) {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (currentDirectionRef.current !== 'down') {
            setDirection('up');
            currentDirectionRef.current = 'up';
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (currentDirectionRef.current !== 'up') {
            setDirection('down');
            currentDirectionRef.current = 'down';
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (currentDirectionRef.current !== 'right') {
            setDirection('left');
            currentDirectionRef.current = 'left';
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (currentDirectionRef.current !== 'left') {
            setDirection('right');
            currentDirectionRef.current = 'right';
          }
          break;
      }
    }
  }, []);

  // 修改按钮文本逻辑，以反映游戏状态
  const getButtonText = () => {
    if (isGameOver) return '重新开始';
    if (!isStarted) return '开始游戏';
    if (!intervalRef.current) return '继续游戏';
    return '暂停游戏';
  };

  // 处理按钮点击，暂停/继续游戏
  const handleButtonClick = () => {
    if (isGameOver || !isStarted) {
      handleGameStart();
    } else {
      // 暂停/继续游戏
      if (intervalRef.current) {
        // 暂停游戏
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
        if (backgroundMusicRef.current) {
          backgroundMusicRef.current.pause();
        }
      } else {
        // 恢复游戏
        if (backgroundMusicRef.current) {
          backgroundMusicRef.current.play();
        }
        // 使用相同的gameLoop函数恢复游戏
        gameLoop();
      }
    }
  };

  // 添加键盘事件监听
  useEffect(() => {
    if (!isBrowser) return;

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isBrowser, handleKeyPress]);

  if (!isBrowser) {
    return null;
  }

  return (
    <div className={styles.gameContainer}>
      <div className={styles.map}>
        {snake.map((segment, index) => (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            className={`${styles.segment} ${index === 0 ? styles.head : styles.body}`}
            style={{
              left: `${segment.x * 40}px`,
              top: `${segment.y * 40}px`,
            }}
          />
        ))}
        <div
          className={styles.food}
          style={{
            left: `${food.x * 40}px`,
            top: `${food.y * 40}px`,
            width: '40px',
            height: '40px',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        {isGameOver && <div className={styles.gameOver} />}
      </div>
      <div className={styles.btnbox}>
        <h1>Chiikawa 贪吃蛇</h1>
        <div className={styles.score}>
          得分: <span>{score}</span>
        </div>
        <button onClick={handleButtonClick}>
          {getButtonText()}
        </button>
      </div>
      <img
        src="/img/chiikawa-game/snake/snake_bonus.gif"
        alt="Snake Bonus"
        className={`${styles.popupImage} ${showSnakeBonus ? styles.showPopup : ''}`}
      />
      <img
        src="/img/chiikawa-game/snake/rabbit.gif"
        alt="Rabbit Bonus"
        className={`${styles.popupImage1} ${showRabbitBonus ? styles.showPopup : ''}`}
      />
      <img
        src="/img/chiikawa-game/snake/chiikawa.gif"
        alt="Chiikawa Bonus"
        className={`${styles.popupImage2} ${showChiikawaBonus ? styles.showPopup : ''}`}
      />
    </div>
  );
} 