import styles from './ButtonMenu.module.css';

export default function ButtonMenu({ children, isActive }) {
  return (
    <button className={`${styles['main-container']} ${isActive ? styles['active'] : ''}`}>
      <span>{children}</span>
    </button>
  )
}