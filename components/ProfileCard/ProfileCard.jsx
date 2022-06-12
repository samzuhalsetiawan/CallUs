import ButtonNormal from '../Button/ButtonNormal/ButtonNormal';
import styles from './ProfileCard.module.css';

export default function ProfileCard() {
  return (
    <div className={styles['main-container']}>
      <div className={styles['profile-picture']}>
        <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M31.2902 0.693298C35.3951 0.693298 39.3318 2.32296 42.2344 5.22376C45.137 8.12457 46.7677 12.0589 46.7677 16.1613C46.7677 20.2636 45.137 24.198 42.2344 27.0988C39.3318 29.9996 35.3951 31.6293 31.2902 31.6293C27.1853 31.6293 23.2485 29.9996 20.3459 27.0988C17.4433 24.198 15.8127 20.2636 15.8127 16.1613C15.8127 12.0589 17.4433 8.12457 20.3459 5.22376C23.2485 2.32296 27.1853 0.693298 31.2902 0.693298V0.693298ZM31.2902 39.3632C48.3928 39.3632 62.2452 46.2852 62.2452 54.8312V62.5652H0.335175V54.8312C0.335175 46.2852 14.1875 39.3632 31.2902 39.3632Z" fill="#FBFAFF"/>
        </svg>
      </div>
      <h3>Sam Zuhal Setiawan</h3>
      <p>+6282250550032</p>
      {/* <div className={styles['button-edit-profile']}>
        <ButtonNormal>
          Edit Profile
        </ButtonNormal>
      </div> */}
    </div>
  )
}