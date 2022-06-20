import { useRef } from 'react';
import styles from './LpCard.module.css';

export default function LpCard({ instansi }) {
  const btnMasukSebagaiRef = useRef();
  const outerContainerRef = useRef();

  const mainCardClickHandler = () => {
    outerContainerRef.current.classList.toggle(styles['expand']);
  }

  return (
    <div ref={outerContainerRef} className={`${styles['outer-container']}`} onClick={mainCardClickHandler}>
      <div className={styles['main-container']}>
        <div className={styles['lp-picture']}>
          <img src="/lp_icon.png" alt="lp icon" />
        </div>
        <div className={styles['main-content']}>
          <h3>{instansi.namaInstansi}</h3>
          <div className={styles['description']}>
            <div className={styles['cs']} style={{gridArea: "cs"}}>
              <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38.22 30.135C38.9346 28.3995 39.3225 26.5416 39.3225 24.5C39.3225 23.03 39.0979 21.6212 38.71 20.3145C37.3829 20.6208 35.9946 20.7841 34.545 20.7841C31.5763 20.7873 28.6504 20.0767 26.0139 18.7123C23.3774 17.3478 21.1076 15.3695 19.3958 12.9441C17.5646 17.3749 14.1102 20.9389 9.73873 22.9075C9.65706 23.4179 9.65706 23.9691 9.65706 24.5C9.65706 26.4492 10.041 28.3793 10.7869 30.1801C11.5328 31.9809 12.6262 33.6172 14.0045 34.9955C16.788 37.7791 20.5634 39.3429 24.5 39.3429C26.6437 39.3429 28.7058 38.8733 30.5637 38.0362C31.7275 40.2616 32.2583 41.3641 32.2175 41.3641C28.8691 42.487 26.2762 43.0383 24.5 43.0383C19.5591 43.0383 14.8429 41.0987 11.3721 37.6075C9.26097 35.5029 7.69169 32.9178 6.79873 30.0737H4.08331V20.7841H6.30873C6.98297 17.5022 8.53311 14.464 10.7947 11.9919C13.0562 9.51979 15.9448 7.70604 19.1539 6.74309C22.3631 5.78014 25.773 5.70391 29.022 6.52249C32.271 7.34106 35.2377 9.02391 37.6075 11.3925C40.1804 13.9553 41.9354 17.2237 42.6504 20.7841H44.9166V30.0737H44.7941L37.5258 36.75L26.705 35.525V32.1154H36.5662L38.22 30.135ZM18.9262 24.0304C19.5387 24.0304 20.1308 24.2754 20.5596 24.7245C20.9904 25.159 21.2322 25.746 21.2322 26.3579C21.2322 26.9697 20.9904 27.5568 20.5596 27.9912C20.1308 28.42 19.5387 28.665 18.9262 28.665C17.64 28.665 16.5987 27.6441 16.5987 26.3579C16.5987 25.0716 17.64 24.0304 18.9262 24.0304ZM30.0533 24.0304C31.3396 24.0304 32.3604 25.0716 32.3604 26.3579C32.3604 27.6441 31.3396 28.665 30.0533 28.665C28.7671 28.665 27.7258 27.6441 27.7258 26.3579C27.7258 25.7406 27.971 25.1486 28.4075 24.7121C28.844 24.2756 29.436 24.0304 30.0533 24.0304Z" fill="#0361FE"/>
              </svg>
              <span>5/5</span>
            </div>
            <div className={styles['time']} style={{gridArea: "time"}}>
              <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 3.25C10.5625 3.25 3.25 10.5625 3.25 19.5C3.25 28.4375 10.5625 35.75 19.5 35.75C28.4375 35.75 35.75 28.4375 35.75 19.5C35.75 10.5625 28.4375 3.25 19.5 3.25ZM12.5125 25.1875L11.375 23.075L17.875 19.3375V11.375H20.3125V20.8L12.5125 25.1875Z" fill="#0361FE"/>
              </svg>
              <span>08:00 - 17:00 WIB</span>
            </div>
            <div className={styles['user']} style={{gridArea: "user"}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5.5C12.9283 5.5 13.8185 5.86875 14.4749 6.52513C15.1313 7.1815 15.5 8.07174 15.5 9C15.5 9.92826 15.1313 10.8185 14.4749 11.4749C13.8185 12.1313 12.9283 12.5 12 12.5C11.0717 12.5 10.1815 12.1313 9.52513 11.4749C8.86875 10.8185 8.5 9.92826 8.5 9C8.5 8.07174 8.86875 7.1815 9.52513 6.52513C10.1815 5.86875 11.0717 5.5 12 5.5V5.5ZM5 8C5.56 8 6.08 8.15 6.53 8.42C6.38 9.85 6.8 11.27 7.66 12.38C7.16 13.34 6.16 14 5 14C4.20435 14 3.44129 13.6839 2.87868 13.1213C2.31607 12.5587 2 11.7956 2 11C2 10.2044 2.31607 9.44129 2.87868 8.87868C3.44129 8.31607 4.20435 8 5 8V8ZM19 8C19.7956 8 20.5587 8.31607 21.1213 8.87868C21.6839 9.44129 22 10.2044 22 11C22 11.7956 21.6839 12.5587 21.1213 13.1213C20.5587 13.6839 19.7956 14 19 14C17.84 14 16.84 13.34 16.34 12.38C17.2119 11.2544 17.6166 9.8362 17.47 8.42C17.92 8.15 18.44 8 19 8V8ZM5.5 18.25C5.5 16.18 8.41 14.5 12 14.5C15.59 14.5 18.5 16.18 18.5 18.25V20H5.5V18.25ZM0 20V18.5C0 17.11 1.89 15.94 4.45 15.6C3.86 16.28 3.5 17.22 3.5 18.25V20H0ZM24 20H20.5V18.25C20.5 17.22 20.14 16.28 19.55 15.6C22.11 15.94 24 17.11 24 18.5V20Z" fill="#0361FE"/>
              </svg>
              <span>250 Customer</span>
            </div>
          </div>
        </div>
      </div>
      <div ref={btnMasukSebagaiRef} className={`${styles['masuk-sebagai']}`}>
        <button onClick={instansi.btnCustomerServiceHandler}>Customer Service</button>
        <button onClick={instansi.btnCustomerHandler}>Masyarakat</button>
      </div>
    </div>
  )
}