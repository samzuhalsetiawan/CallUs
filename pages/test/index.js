import ButtonHamburger from '../../components/ButtonHumburger/ButtonHamburger';
import ButtonMenu from '../../components/ButtonMenu/ButtonMenu';
import styles from '../../styles/TestPage.module.css';

export default function TestPage() {
  return (
    <div className={styles['main-container']}>
      <ButtonMenu isActive>
        <span className='rows-gravity-center'>
          <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.0833 34.1667V23.9167H23.9167V34.1667H32.4583V20.5H37.5833L20.5 5.125L3.41666 20.5H8.54166V34.1667H17.0833Z" fill="#FBFAFF"/>
          </svg>
          <span className='icon-title'>
            Dashboard
          </span>
        </span>
      </ButtonMenu>
    </div>
  )
}