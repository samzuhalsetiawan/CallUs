import { useRef } from 'react';
import styles from './ButtonProfilePicture.module.css';

export default function ButtonProfilePicture({ handler = () => {}, myRef = useRef() }) {
  return (
    <button className={styles['main-container']} ref={myRef} onClick={handler} id="updateDetails">
      <img src="/orang.svg" alt="profile-picture" />
    </button>
  )
}