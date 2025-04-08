import { useState, useRef, useEffect } from "react";
import { PawPrint } from "lucide-react";
import styles from "./content.module.scss";
import Logo from "../../components/logo";
import Carousel from "components/carousel";
import Select from "react-select";

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

const Content: React.FC<ContentProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [leftPartHeight, setLeftPartHeight] = useState<number>(0);
  const leftPartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leftPartRef.current) {
      const height = leftPartRef.current.offsetHeight;
      setLeftPartHeight(height);
      console.log("Left part height:", height);
    }
  }, [activeIndex]);

  const renderMedia = () => {
    const mediaArray = data[activeIndex].images;
    const isMobile = window.innerWidth <= 768;
    const calculatedHeight = isMobile ? 300 : leftPartHeight - 56;

    return <div
      className={styles["content__left-part-image"]}
      style={{ height: `${calculatedHeight}px` }}
    >
      <Carousel media={mediaArray} height={calculatedHeight} />
    </div>
  };

  const isMobile = window.innerWidth <= 768;
  const selectOptions = data.map((item, index) => ({
    label: item.name,
    value: index,
  }));


  return (
    <div className={styles.content}>
      <div className={styles["content__left-part"]} ref={leftPartRef}>
        {renderMedia()}
        <div className={styles["content__left-part__content"]}>
          <p className={styles["content__left-part__content__description"]}>
            {data[activeIndex].description}
          </p>
          {data[activeIndex].lists?.map((listBlock, idx) => (
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
        <div className={styles["content__right-part-list"]}>
          {isMobile ? (
            <Select
              options={selectOptions}
              value={selectOptions.find((opt) => opt.value === activeIndex)}
              onChange={(selected) => setActiveIndex(selected?.value || 0)}
              classNamePrefix="content-select"
              className={styles["content__select"]}
            />
          ) : (
            <ul>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;