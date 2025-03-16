import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './sidebar.module.css';
import Hamburger from "hamburger-react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const pages = [
    { path: '/', name: 'Головна' },
    { path: '/services', name: 'Послуги' },
    { path: '/about', name: 'Про нас' },
  ];

  const getPageName = (pathname: string) => {
    const page = pages.find(p => p.path === pathname);
    return page ? page.name : 'Сторінка';
  };

  const pageName = getPageName(location.pathname);

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${isOpen ? styles.active : ''}`}>
        <div className={styles.closeButton}>
          <Hamburger toggled={isOpen} toggle={toggleSidebar} />
        </div>
        {isOpen && 
          <nav className={styles.menu}>
            {pages.map(({ path, name }) => (
              <Link
              key={path}
              to={path}
              onClick={closeSidebar}
              className={pageName === name ? styles.activeLink : ''}
              >
                {name}
              </Link>
            ))}
          </nav>
            
        }

        
        <div className={styles.pageName}>
          <p>{pageName}</p>
        </div>
      </div>

      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </div>
  );
};
