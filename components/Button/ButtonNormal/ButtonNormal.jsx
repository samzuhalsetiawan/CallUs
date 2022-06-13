import styles from './ButtonNormal.module.css';

export default function ButtonNormal({ children, ketikaDiKlik = () => {} }) {
  return (
    <button className={styles['main-container']} onClick={ketikaDiKlik}>
      {children}
    </button>
  )
}