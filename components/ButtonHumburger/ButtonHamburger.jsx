import { useRef, useState } from 'react';
import styles from './ButtonHamburger.module.css';

export default function ButtonHamburger() {
  const buttonHamburger = useRef();
  const [ openState, setOpenState ] = useState(false);
  const openMenu = () => setOpenState(!openState);
  return (
    <button onClick={openMenu} className={`${styles['main-container']} ${openState ? styles['openmenu'] : ""}`} ref={buttonHamburger}>
      <div>
        <span className={styles['line-1']}></span>
        <span className={styles['line-2']}></span>
        <span className={styles['line-3']}></span>
      </div>
    </button>
  )
}