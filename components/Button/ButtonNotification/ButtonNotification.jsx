import styles from './ButtonNotification.module.css';

export default function ButtonNotification() {
  return (
    <button className={styles['main-container']}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42 38V40H6V38L10 34V22C10 15.8 14.06 10.34 20 8.58V8C20 6.93913 20.4214 5.92172 21.1716 5.17157C21.9217 4.42143 22.9391 4 24 4C25.0609 4 26.0783 4.42143 26.8284 5.17157C27.5786 5.92172 28 6.93913 28 8V8.58C33.94 10.34 38 15.8 38 22V34L42 38ZM28 42C28 43.0609 27.5786 44.0783 26.8284 44.8284C26.0783 45.5786 25.0609 46 24 46C22.9391 46 21.9217 45.5786 21.1716 44.8284C20.4214 44.0783 20 43.0609 20 42" fill="#0361FE"/>
      </svg>
    </button>
  )
}