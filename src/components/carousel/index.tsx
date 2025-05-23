import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { NextButton, PrevButton, usePrevNextButtons } from "./EmblaCarouselArrowButton";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

export type CarouselProps = {
  media: string[];
  autoPlayInterval?: number;
  height?: number;
};

const Carousel: React.FC<CarouselProps> = ({ media, height }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  const isVideo = useCallback((url: string): boolean => {
    return /\.(mp4|mov|webm)$/i.test(url);
  }, []);

  return (
    <div className="embla">
      <div className="embla__viewport"  ref={emblaRef}>
        <div className="embla__container">
          {media.map((url, index) => (
            <div className="embla__slide" key={index}>
              {isVideo(url) ? (
                <video
                  className="embla__slide__img"
                  src={url}
                  autoPlay
                  style={{ objectFit: 'contain', height: `${height}px` }}
                  loop
                  muted
                  controls={false}
                />
              ) : (
                <img
                  className="embla__slide__img"
                  src={url}
                  style={{ objectFit: 'cover', height: `${height}px` }}
                  alt={`Slide ${index}`}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot${index === selectedIndex ? ' embla__dot--selected' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Carousel);