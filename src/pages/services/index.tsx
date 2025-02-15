import React, { useState, useEffect } from 'react';
import styles from './services.module.css';
import { PawPrint } from 'lucide-react';


const serviceDefault = require('../../media/logo.jpg');
const serviceCureImage = require('../../media/service-cure.jpg');
const serviceDiagnosticImage = require('../../media/service-diagnostic.jpg');
const serviceDiffImage = require('../../media/service-diff-animals.jpg');
const serviceProfilacticImage = require('../../media/service-profilactic.jpg');

export type ServiceLinkType = {
    name: string;
    description?: string;
    list?: string[];
    image?: string[];
}

const servicesLinks: ServiceLinkType[] = [
    {
        name: 'Загальне',
        description: 'Мета нашої роботи – здоров\'я ваших улюбленців! У клініці «Надійні Руки» ми завжди готові надати висококваліфіковану допомогу та турботу для ваших тварин. Ми маємо все необхідне для проведення комплексного апаратного та лабораторного обстеження у найкоротші терміни. Чим раніше поставлений діагноз, тим ефективнішим буде лікування. У клініці є стаціонар, де ваш улюбленець буде під опікою професіоналів.',
        list: [],
        image: serviceDefault
    },
    {
        name: 'Діагностика',
        description: 'Діагностика допомагає точно визначити причину захворювання та його тяжкість. Ми використовуємо:',
        list: [
            "Фізичне обстеження: огляд, пальпація, перкусія, аускультація.",
            "Лабораторні дослідження: аналізи крові, сечі, калу.",
            "Візуальна діагностика: рентген, ультразвук.",
            "Спеціалізовані тести: цитологія, бакпосів, вірусологія."
        ],
        image: serviceDiagnosticImage
    },
    {
        name: 'Індивідуальний підхід',
        description: 'Після діагностики ми створюємо індивідуальний план лікування для вашого улюбленця:',
        list: [
            "Медикаментозна терапія: антибіотики, протизапальні, анальгетики.",
            "Хірургічне втручання: видалення пухлин, сторонніх предметів.",
            "Інфузійна терапія: внутрішньовенне введення рідин.",
        ],
        image: serviceDiffImage
    },
    {
        name: 'Профілактика',
        description: 'Профілактика спрямована на зменшення ризику захворювань та покращення якості життя тварин',
        list: [
            "Вакцинація: регулярні щеплення для захисту від інфекцій.",
            "Антипаразитарна обробка: боротьба з паразитами.",
            "Рекомендації: правильне харчування та фізична активність.",
            "Періодичні обстеження: регулярні медичні огляди."
        ],
        image: serviceProfilacticImage
    },
    {
        name: 'Лікування різних видів тварин',
        description: 'Ми застосовуємо терапевтичні методи, які враховують фізіологічні особливості кожного виду тварин. Ветеринарна терапія включає:',
        list: [
            "Симптоматична терапія: зняття небезпечних симптомів.",
            "Патогенетична терапія: корекція порушень у роботі органів.",
            "Етіотропна терапія: лікування основної причини хвороби.",
            "Замісна терапія: відновлення водно-солового балансу.",
            "Стимулююча терапія: активізація захисних сил організму."
        ],
        image: serviceCureImage
    },
];

const Services: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isHovering, setIsHovering] = useState<boolean>(false);

    useEffect(() => {
        if (!isHovering) {
            const interval = setInterval(() => {
                setActiveIndex((prevIndex) => (prevIndex + 1) % servicesLinks.length);
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [isHovering]);

    return (
        <div className={styles.services}>
            <div className={styles.leftPart}>
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${servicesLinks[activeIndex].image})` }}
                />
                <div className={styles.leftPartContent}>
                    <h2>{servicesLinks[activeIndex].name}</h2>
                    <p className={styles.description}>{servicesLinks[activeIndex].description}</p>
                    {servicesLinks[activeIndex].list && (
                        <ul className={styles.list}>
                            {servicesLinks[activeIndex].list!.map((item, idx) => (
                                <li key={idx}>
                                    <PawPrint className={styles.paw} />{item}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <ul className={styles.rightPart}>
                {servicesLinks.map((link, index) => (
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

export default Services;