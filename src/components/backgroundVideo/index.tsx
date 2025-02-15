import React, { ReactNode, useState, useEffect } from 'react';
import styles from './backgroundVideo.module.css';
import { useLocation } from 'react-router-dom';

interface BackgroundVideoProps {
  children?: ReactNode;
}

const homeVideo = require('../../media/home.mp4');
const serviceVideo = require('../../media/services.mp4');
const aboutVideo = require('../../media/home.mp4');

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ children }) => {
  const location = useLocation();
  
  const [videoSrc, setVideoSrc] = useState(homeVideo);

  useEffect(() => {
    switch (location.pathname) {
      case '/services':
        setVideoSrc(serviceVideo);
        break;
      case '/about':
        setVideoSrc(aboutVideo);
        break;
      default:
        setVideoSrc(homeVideo);
    }
  }, [location.pathname]);

  return (
    <div className={styles.backgroundContainer}>
      <video autoPlay muted loop className={styles.backgroundVideo}>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.overlayContent}>
        {children}
      </div>
    </div>
  );
};

export default BackgroundVideo;