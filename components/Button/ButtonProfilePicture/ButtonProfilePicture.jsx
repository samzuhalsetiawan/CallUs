import styles from './ButtonProfilePicture.module.css';

export default function ButtonProfilePicture() {
  return (
    <button className={styles['main-container']}>
      <img src="/orang.svg" alt="profile-picture" />
    </button>
  )
}