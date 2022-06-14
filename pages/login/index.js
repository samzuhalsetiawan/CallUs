import { useRouter } from 'next/router';
import styles from '../../styles/Login.module.css';

export default function Login() {
const route = useRouter();
const goToAdmin = () => {
  route.push('/admin');
}
const goToCustomerService = () => {
  route.push('/customer-service');
}
const goToMainPage = () => {
  route.push('/');
}

  return (
    <div className={styles['main-container']}>
      <div className={styles['content-container']}>
        <div className={styles['app-logo-container']}>
          <img src="" alt="App Logo" />
        </div>
        <div>
          <div className={styles['input-nohp']}>
            <label htmlFor="phone-number">Silahkan masukan nomor ponsel anda</label>
            <input type="number" id='phone-number' />
          </div>
          <div>
            <p>Kami perlu memverifikasi bahwa nomor ini benar milik anda</p>
            <div>
              <input type="radio" name="metode-verifikasi" value="wa" id="metode-wa" />
              <label htmlFor="metode-wa">Whatsapp</label>
            </div>
            <div>
              <input type="radio" name="metode-verifikasi" value="sma" id="metode-sms" defaultChecked />
              <label htmlFor="metode-sms">SMS</label>
            </div>
          </div>
        </div>
        <div className={styles['login-as-container']}>
          <p>Login Sebagai</p>
          <div className={styles['garis']}></div> 
        </div>
        <div className={styles['buttons-container']}>
          <ul>
            <li>
              <button onClick={goToMainPage}>Masyarakat</button>
            </li>
            <li>
              <button onClick={goToCustomerService}>Customer Service</button>
            </li>
            <li>
              <button onClick={goToAdmin}>Admin</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}