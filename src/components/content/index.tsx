import React, { useState } from "react";
import { PawPrint } from "lucide-react";
import styles from "./content.module.scss";
import Logo from "../../components/logo";
import Carousel from "components/carousel";

export type ContentItemType = {
  name: string;
  description?: string;
  lists?: { header: string; items: string[] }[];
  images: string[];
};

export type ContentLinkType = {
  name: string;
  description: string;
  lists?: { header: string; items: string[] }[];
  images: string[];
};

type ContentProps = {
  data: ContentItemType[];
};

const isVideo = (url: string): boolean => {
  return /\.(mp4|mov|webm)$/i.test(url);
};

const Content: React.FC<ContentProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const renderMedia = () => {
    const mediaArray = data[activeIndex].images;
    if (mediaArray.length === 1) {
      const mediaUrl = mediaArray[0];
      return isVideo(mediaUrl) ? (
        <video
          className={styles["content__left-part-image"]}
          src={mediaUrl}
          autoPlay
          loop
          muted
          controls={false}
        />
      ) : (
        <div
          className={styles["content__left-part-image"]}
          style={{ backgroundImage: `url(${mediaUrl})` }}
        />
      );
    } else {
      return (
        <div className={styles["content__left-part-image"]}>
          <Carousel media={mediaArray} />
        </div>
      );
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles["content__left-part"]}>
        {renderMedia()}
        <div className={styles["content__left-part__content"]}>
          <p className={styles["content__left-part__content__description"]}>
            {data[activeIndex].description}
          </p>
          {data[activeIndex].lists &&
            data[activeIndex].lists.map((listBlock, idx) => (
              <div key={idx}>
                <h3 className={styles["content__left-part__content-header"]}>
                  {listBlock.header}
                </h3>
                <ul className={styles["content__left-part__content-list"]}>
                  {listBlock.items.map((item, j) => (
                    <li key={j}>
                      <PawPrint className={styles["content__paw"]} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>

      <div className={styles["content__right-part"]}>
        <Logo className={styles["content__right-part-logo"]} />
        <ul className={styles["content__right-part-list"]}>
          {data.map((item, index) => (
            <li
              key={index}
              className={
                index === activeIndex
                  ? `${styles["content__right-part-item"]} ${styles["content__right-part-item--active"]}`
                  : styles["content__right-part-item"]
              }
              onClick={() => setActiveIndex(index)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Content;