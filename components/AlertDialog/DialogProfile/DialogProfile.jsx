import { useEffect, useRef } from 'react';
import ButtonNormal from '../../Button/ButtonNormal/ButtonNormal';
import ProfileCard from '../../ProfileCard/ProfileCard';
import styles from './DialogProfile.module.css';

export default function DialogProfile({ myRef = useRef() }) {
  const closeDialogModal = () => {
    myRef.current.close();
  }
  return (
    <dialog ref={myRef} className={styles['main-container']}>
      <ProfileCard>
        <div className={styles['button-container']}>
          <ButtonNormal ketikaDiKlik={closeDialogModal}>
            Open Profile
          </ButtonNormal>
          <ButtonNormal ketikaDiKlik={closeDialogModal}>
            Logout
          </ButtonNormal>
        </div>
      </ProfileCard>
    </dialog>
  )
}