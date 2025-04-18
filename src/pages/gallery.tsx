import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './gallery.module.css';
import chiikawaImages from '@site/src/data/chiikawa-images.json';

type GalleryItem = {
  title: string;
  description: string;
  image: string;
  category: string;
  isAlbum?: boolean;
  albumImages?: string[];
  japaneseTitle?: string;
};

// 将JSON数据转换为GalleryItem格式
const convertJsonToGalleryItems = (): GalleryItem[] => {
  const items: GalleryItem[] = [];
  
  // 添加相册
  chiikawaImages.albums.forEach(album => {
    items.push({
      title: album.title,
      description: album.description,
      image: album.coverImage,
      category: album.category,
      isAlbum: album.isAlbum,
      albumImages: album.images,
      japaneseTitle: album.japaneseTitle
    });
  });
  
  return items;
};

export default function Gallery(): React.ReactNode {
  // 使用JSON数据
  const galleryItems = convertJsonToGalleryItems();
    
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryItem | null>(null);
  
  const categories = ['全部', ...Array.from(new Set(galleryItems.map(item => item.category)))];
  
  const filteredItems = activeCategory === '全部' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const openAlbum = (album: GalleryItem) => {
    setSelectedAlbum(album);
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
  };

  return (
    <Layout
      title="图片库"
      description="Chiikawa Pocket游戏精美图片展示">
      <main className="container margin-vert--lg">
        <Heading as="h1" className={styles.pageTitle}>Chiikawa 图片库</Heading>
        <p className={styles.pageDescription}>
          欣赏Chiikawa的精美图片和可爱角色。
        </p>
        
        {selectedAlbum ? (
          <div className={styles.albumView}>
            <div className={styles.albumHeader}>
              <Heading as="h2">{selectedAlbum.title} {selectedAlbum.japaneseTitle && `(${selectedAlbum.japaneseTitle})`}</Heading>
              <button className={styles.closeButton} onClick={closeAlbum}>返回</button>
            </div>
            <div className={styles.albumGrid}>
              {selectedAlbum.albumImages?.map((image, idx) => (
                <div key={idx} className={styles.albumItem}>
                  <img src={image} alt={`${selectedAlbum.title} - 图片 ${idx + 1}`} className={styles.albumImage} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className={styles.categoryFilter}>
              {categories.map((category, idx) => (
                <button 
                  key={idx} 
                  className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className={styles.galleryGrid}>
              {filteredItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className={styles.galleryItem}
                  onClick={item.isAlbum ? () => openAlbum(item) : undefined}
                >
                  <div className={styles.galleryImageContainer}>
                    <img src={item.image} alt={item.title} className={styles.galleryImage} />
                    {item.isAlbum && <div className={styles.albumBadge}>{item.title}</div>}
                  </div>
                  <div className={styles.galleryInfo}>
                    <Heading as="h3" className={styles.galleryTitle}>{item.title}</Heading>
                    <p className={styles.galleryDescription}>{item.description}</p>
                    <span className={styles.galleryCategory}>{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </Layout>
  );
} 