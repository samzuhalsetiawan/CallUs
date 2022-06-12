import styles from './ButtonNormal.module.css';

export default function ButtonNormal({ children }) {
  return (
    <button className={styles['main-container']}>
      {children}
    </button>
  )
}