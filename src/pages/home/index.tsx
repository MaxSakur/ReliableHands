import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import Logo from '../../components/logo';
import { Phone, MapPin, Clock } from 'lucide-react';

const homeLinks = [
    'Хірургія',
    'Лабораторні',
    'Дослідження',
    'Вакцинація',
    'Терапія',
    'Корми',
    'Дієти',
    'УЗД',
    'Стаціонар для тварин',
];

const Home: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * homeLinks.length);
            setActiveIndex(randomIndex);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const openGoogleMaps = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                const destination = 'ул. Новая, 3б, Гореничи, Киевская область, 08114';
                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
                window.open(googleMapsUrl, '_blank');
            }, error => {
                alert('Не удалось определить ваше местоположение. Разрешите доступ к геолокации.' + error.message);
            });
        } else {
            alert('Геолокация не поддерживается вашим браузером.');
        }
    };

    return (
        <div className={styles.home}>
            <div className={styles.leftPart}>
                <div className={styles.leftPartLogo}>
                    <Logo className={styles.logo} />
                    <p className={styles.name}>Ветеринарна Клініка <br /> "Надійні Руки"</p>
                </div>

                <ul>
                    <li className={styles.leftPartInfo}>
                        <Phone className={styles.icon} />
                        <div className={styles.leftPartInfoPhones}>
                            <a href="tel:+380989137549" className={styles.phoneButton}>
                                <p>+38 098 913 75 49</p>
                            </a>
                            <a href="tel:+380969169696" className={styles.phoneButton}>
                                <p>+38 096 916 96 96</p>
                            </a>
                        </div>
                    </li>

                    <li className={styles.leftPartInfo} >
                        <MapPin className={styles.icon} />
                        <div className={styles.leftPartInfoAddress}>
                            <p>с. Гореничі, вул.Нова, 3Б</p>
                            <button className={styles.mapButton} onClick={openGoogleMaps}>
                                <p>Прокласти маршрут</p>
                            </button>

                        </div>
                    </li>

                    <li className={styles.leftPartInfo}>
                        <Clock className={styles.icon} />
                        <div className={styles.leftPartInfoContent}>
                            <p>9:00 до 20:00</p>
                        </div>
                    </li>
                </ul>
            </div>

            <ul className={styles.rightPart}>
                {homeLinks.map((link, index) => (
                    <li key={index} className={index === activeIndex ? styles.activeItem : ''}>{link}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;