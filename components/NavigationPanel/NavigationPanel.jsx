import ApplicationBrand from '../ApplicationBrand/ApplicationBrand';
import ButtonMenu from '../ButtonMenu/ButtonMenu';
import styles from './NavigationPanel.module.css';

export default function NavigationPanel({activeMenu = 'dashboard'}) {
  return (
    <div className={styles['main-container']}>
      <ButtonMenu isActive={activeMenu == 'dashboard' ? true : false}>
        <span className='rows-gravity-center'>
          <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.0833 34.1667V23.9167H23.9167V34.1667H32.4583V20.5H37.5833L20.5 5.125L3.41666 20.5H8.54166V34.1667H17.0833Z" fill={activeMenu == 'dashboard' ? "#FBFAFF" : "#BFC6D0"}/>
          </svg>
          <span className='icon-title'>
            Dashboard
          </span>
        </span>
      </ButtonMenu>
      <ButtonMenu isActive={activeMenu == 'profile' ? true : false}>
        <span className='rows-gravity-center'>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6.66669C21.7681 6.66669 23.4638 7.36907 24.714 8.61931C25.9643 9.86955 26.6667 11.5652 26.6667 13.3334C26.6667 15.1015 25.9643 16.7972 24.714 18.0474C23.4638 19.2976 21.7681 20 20 20C18.2319 20 16.5362 19.2976 15.2859 18.0474C14.0357 16.7972 13.3333 15.1015 13.3333 13.3334C13.3333 11.5652 14.0357 9.86955 15.2859 8.61931C16.5362 7.36907 18.2319 6.66669 20 6.66669ZM20 23.3334C27.3667 23.3334 33.3333 26.3167 33.3333 30V33.3334H6.66666V30C6.66666 26.3167 12.6333 23.3334 20 23.3334Z" fill={activeMenu == 'profile' ? "#FBFAFF" : "#BFC6D0"}/>
          </svg>
          <span className='icon-title'>
            Profile
          </span>
        </span>
      </ButtonMenu>
      <ButtonMenu isActive={activeMenu == 'contacts' ? true : false}>
        <span className='rows-gravity-center'>
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.99917 13.0379C9.73917 16.4575 12.5425 19.2608 15.9621 21.0008L18.6204 18.3425C18.9588 18.0042 19.43 17.9075 19.8529 18.0404C21.2063 18.4875 22.6562 18.7292 24.1667 18.7292C24.4871 18.7292 24.7945 18.8565 25.0211 19.0831C25.2477 19.3097 25.375 19.617 25.375 19.9375V24.1667C25.375 24.4871 25.2477 24.7945 25.0211 25.0211C24.7945 25.2477 24.4871 25.375 24.1667 25.375C18.7187 25.375 13.4938 23.2108 9.64151 19.3585C5.78921 15.5062 3.625 10.2813 3.625 4.83333C3.625 4.51286 3.75231 4.20552 3.97891 3.97891C4.20552 3.75231 4.51286 3.625 4.83333 3.625H9.0625C9.38297 3.625 9.69031 3.75231 9.91692 3.97891C10.1435 4.20552 10.2708 4.51286 10.2708 4.83333C10.2708 6.34375 10.5125 7.79375 10.9596 9.14708C11.0925 9.57 10.9958 10.0413 10.6575 10.3796L7.99917 13.0379Z" fill={activeMenu == 'contacts' ? "#FBFAFF" : "#BFC6D0"}/>
          </svg>
          <span className='icon-title'>
            Contacts
          </span>
        </span>
      </ButtonMenu>
      <ButtonMenu isActive={activeMenu == 'notifications' ? true : false}>
        <span className='rows-gravity-center'>
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.375 22.9584V24.1667H3.625V22.9584L6.04167 20.5417V13.2917C6.04167 9.54585 8.49458 6.2471 12.0833 5.18377V4.83335C12.0833 4.19241 12.3379 3.57773 12.7912 3.12451C13.2444 2.6713 13.8591 2.41669 14.5 2.41669C15.1409 2.41669 15.7556 2.6713 16.2088 3.12451C16.6621 3.57773 16.9167 4.19241 16.9167 4.83335V5.18377C20.5054 6.2471 22.9583 9.54585 22.9583 13.2917V20.5417L25.375 22.9584ZM16.9167 25.375C16.9167 26.016 16.6621 26.6306 16.2088 27.0839C15.7556 27.5371 15.1409 27.7917 14.5 27.7917C13.8591 27.7917 13.2444 27.5371 12.7912 27.0839C12.3379 26.6306 12.0833 26.016 12.0833 25.375" fill={activeMenu == 'notifications' ? "#FBFAFF" : "#BFC6D0"}/>
          </svg>
          <span className='icon-title'>
            Notifications
          </span>
        </span>
      </ButtonMenu>
      <ButtonMenu isActive={activeMenu == 'help' ? true : false}>
        <span className='rows-gravity-center'>
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.2096 13.5938L17.1221 14.7054C16.2521 15.5754 15.7083 16.3125 15.7083 18.125H13.2917V17.5209C13.2917 16.1796 13.8354 14.9713 14.7054 14.1013L16.2037 12.5788C16.6508 12.1438 16.9167 11.5396 16.9167 10.875C16.9167 10.2341 16.662 9.61939 16.2088 9.16618C15.7556 8.71297 15.1409 8.45835 14.5 8.45835C13.859 8.45835 13.2444 8.71297 12.7911 9.16618C12.3379 9.61939 12.0833 10.2341 12.0833 10.875H9.66666C9.66666 9.59314 10.1759 8.36376 11.0823 7.45734C11.9887 6.55091 13.2181 6.04169 14.5 6.04169C15.7819 6.04169 17.0112 6.55091 17.9177 7.45734C18.8241 8.36376 19.3333 9.59314 19.3333 10.875C19.3316 11.8939 18.9277 12.871 18.2096 13.5938ZM15.7083 22.9584H13.2917V20.5417H15.7083V22.9584ZM14.5 2.41669C12.9132 2.41669 11.3419 2.72923 9.8759 3.33648C8.40988 3.94372 7.07782 4.83377 5.95578 5.95581C3.68972 8.22188 2.41666 11.2953 2.41666 14.5C2.41666 17.7047 3.68972 20.7782 5.95578 23.0442C7.07782 24.1663 8.40988 25.0563 9.8759 25.6636C11.3419 26.2708 12.9132 26.5834 14.5 26.5834C17.7047 26.5834 20.7781 25.3103 23.0442 23.0442C25.3103 20.7782 26.5833 17.7047 26.5833 14.5C26.5833 7.81794 21.1458 2.41669 14.5 2.41669Z" fill={activeMenu == 'help' ? "#FBFAFF" : "#BFC6D0"}/>
          </svg>
          <span className='icon-title'>
            Help
          </span>
        </span>
      </ButtonMenu>
    </div>
  )
}