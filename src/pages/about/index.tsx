import React, { useState, useEffect } from 'react';
import styles from './about.module.css';
import { ServiceLinkType } from 'pages/services';

const aboutContent: ServiceLinkType[] = [  // Исправлено здесь: добавлен [] для указания массива
  {
    name: 'Наш Початок',
    description: `
      Усе почалося 11 вересня 2011 року у серці села Гореничі. Тут, за адресою Центр, 20, ми відкрили маленьку ветеринарну допомогу. Це був наш перший крок до великої місії — допомагати кожній тварині, що потребує підтримки.
    `,
    image: require('../../media/about-1.jpg')
  },
  {
    name: 'Наша Команда',
    description: `
      Сьогодні "Надійні руки" — це клініка професіоналів, де працюють висококваліфіковані фахівці, готові стати підтримкою для кожного власника тварини. Ми розуміємо, що ваші улюбленці — це частинка вашої родини, і тому завжди прагнемо дбати про них із любов'ю та відданістю.
    `,
    image: require('../../media/about-2.jpg')
  },
  {
    name: 'Наші Цінності',
    description: `
      💙 Професійність — ми постійно вдосконалюємо свої знання та уміння.
      💚 Дбайливий підхід — кожен улюбленець отримує особливу увагу.
      💛 Чесність — відкрито інформуємо про всі методи лікування та процедури.
      ❤️ Надійність — ваша довіра є для нас найбільшою нагородою.
    `,
    image: require('../../media/about-3.jpg')
  }
];

const About: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % aboutContent.length);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [isHovering]);

  return (
    <div className={styles.about}>
      <div className={styles.leftPart}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${aboutContent[activeIndex].image})` }}
        />
        <div className={styles.leftPartContent}>
          <h2>{aboutContent[activeIndex].name}</h2>
          <p className={styles.description}>{aboutContent[activeIndex].description}</p>
        </div>
      </div>

      <ul className={styles.rightPart}>
        {aboutContent.map((link, index) => (
          <li
            key={index}
            className={index === activeIndex ? styles.activeItem : ''}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {link.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;