import styles from './ApplicationBrand.module.css';

export default function ApplicationBrand({ align = "left" }) {
  return (
    <h2 className={styles['main-container']} style={{textAlign: align}}>
      Nama Aplikasi
    </h2>
  )
}