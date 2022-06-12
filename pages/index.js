import ApplicationBrand from "../components/ApplicationBrand/ApplicationBrand";
import ButtonHamburger from "../components/ButtonHumburger/ButtonHamburger";
import ButtonMenu from "../components/ButtonMenu/ButtonMenu";
import NavigationPanel from "../components/NavigationPanel/NavigationPanel";
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles['main-container']}>
      <div className={styles['main-navigation']}>
        <ApplicationBrand />
        <div className={styles['navigation-wrapper']}>
          <NavigationPanel activeMenu="dashboard" />
        </div>
      </div>
      <div className={styles['main-section']}>
        Myanmar
      </div>
    </div>
  )
}
