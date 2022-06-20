import styles from './ApplicationBrand.module.css';

export default function ApplicationBrand({ myStyle }) {
  return (
    <h2 className={styles['main-container']} style={myStyle}>
      Nama Aplikasi
    </h2>
  )
}