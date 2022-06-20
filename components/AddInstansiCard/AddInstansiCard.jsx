import styles from './AddInstansiCard.module.css';

export default function AddInstansiCard({ handler }) {
  return (
    <div onClick={handler} className={styles['main-container']}>
      <div className={styles['add-sign']}>
        <svg width="76" height="80" viewBox="0 0 76 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56.75 49.5H64.25V60.75H75.5V68.25H64.25V79.5H56.75V68.25H45.5V60.75H56.75V49.5ZM36.125 0.75L71.75 19.5V27H0.5V19.5L36.125 0.75ZM53 34.5H64.25V42.3L60.5 42C57.875 42 55.3625 42.45 53 43.275V34.5ZM0.5 79.5V68.25H38.3C39.0125 72.525 40.9625 76.3875 43.7375 79.5H0.5ZM30.5 34.5H41.75V52.05C40.025 54.6375 38.825 57.5625 38.3 60.75H30.5V34.5ZM8 34.5H19.25V60.75H8V34.5Z" fill="#FBFAFF"/>
        </svg>
      </div>
      <div className={styles['content']}>
        <p>Ayo, daftarkan instansi anda!</p>
      </div>
    </div>
  )
}