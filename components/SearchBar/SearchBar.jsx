import styles from './SearchBar.module.css';

export default function SearchBar() {
  return (
    <div className={styles['main-container']}>
      <input type="text" name="search" id="search" placeholder='Cari Instansi ...' />
      <svg width="45" height="40" viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.0388 16.7427C31.0388 24.6068 24.779 30.911 17.1438 30.911C9.50856 30.911 3.24874 24.6068 3.24874 16.7427C3.24874 8.8787 9.50856 2.57446 17.1438 2.57446C24.779 2.57446 31.0388 8.8787 31.0388 16.7427Z" stroke="#BFC6D0" stroke-width="5"/>
        <path d="M30.1822 27.642L41.9125 37.0072" stroke="#BFC6D0" stroke-width="5" stroke-linecap="round"/>
      </svg>
    </div>
  )
}