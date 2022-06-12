import ApplicationBrand from "../components/ApplicationBrand/ApplicationBrand";
import ButtonNotification from "../components/Button/ButtonNotification/ButtonNotification";
import ButtonProfilePicture from "../components/Button/ButtonProfilePicture/ButtonProfilePicture";
import ButtonHamburger from '../components/Button/ButtonHumburger/ButtonHamburger';
import NavigationPanel from "../components/NavigationPanel/NavigationPanel";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import SearchBar from "../components/SearchBar/SearchBar";
import styles from '../styles/Dashboard.module.css';
import LpCard from "../components/LpCard/LpCard";
import { useRef } from "react";

export default function Dashboard() {
  const mainNavigation = useRef();
  const applicationBrandDrawer = useRef();
  const overlay = useRef();
  const drawerController = (open) => {
    mainNavigation.current.style.left = open ? "-80%" : "0px";
    overlay.current.classList.toggle(styles['hide']);
    // applicationBrandDrawer.current.classList.toggle(styles['hide']);
  }
  return (
    <div className={styles['main-container']}>
      <div ref={overlay} className={`${styles['overlay']} ${styles['hide']}`}></div>
      <div ref={mainNavigation} className={styles['main-navigation']}>
        <div ref={applicationBrandDrawer}>
          <ApplicationBrand />
        </div>
        <div className={styles['navigation-wrapper']}>
          <NavigationPanel activeMenu="dashboard" />
        </div>
        <div className={styles['profile-card-wrapper']}>
          <ProfileCard />
        </div>
      </div>
      <div className={styles['main-section']}>
        <div className={styles['header-wrapper']}>
          <div className={styles['hamburger-and-profile']}>
            <div className={styles['hamburger-wrapper']}>
              <ButtonHamburger onClick={drawerController} />
            </div>
            <div className={styles['notif-and-profile']}>
              <div className={styles['notif-icon-wrapper']}>
                <ButtonNotification />
              </div>
              <ButtonProfilePicture />
            </div>
          </div>
          <div className={styles['application-brand-wrapper']}>
            <ApplicationBrand align="center" />
          </div>
          <div className={styles['search-bar-wrapper']}>
            <SearchBar />
          </div>
        </div>
        <div className={styles['lp-cards-container']}>
          <div>
            <LpCard />
            <LpCard />
            <LpCard />
            <LpCard />
            <LpCard />
            <LpCard />
            <LpCard />
            <LpCard />
          </div>
        </div>
      </div>
    </div>
  )
}
