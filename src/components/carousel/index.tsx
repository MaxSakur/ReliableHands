import React, { useState, useEffect } from "react";
import styles from "./carousel.module.scss";

export type CarouselProps = {
  media: string[];
  autoPlayInterval?: number;
};

const isVideo = (url: string): boolean => /\.(mp4|mov|webm)$/i.test(url);

const Carousel: React.FC<CarouselProps> = ({ media, autoPlayInterval = 3000 }) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [media, autoPlayInterval]);

  if (media.length === 0) return null;

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselInner}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {media.map((url, index) => (
          <div className={styles.carouselItem} key={index}>
            {isVideo(url) ? (
              <video src={url} autoPlay loop muted className={styles.media} />
            ) : (
              <div
                className={styles.media}
                style={{ backgroundImage: `url(${url})` }}
              />
            )}
          </div>
        ))}
      </div>
      <div className={styles.carouselDots}>
        {media.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={index === current ? styles.active : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;