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
        <div className={styles['buttons-container']}>
          <ul>
            <li>
              <button>Masyarakat</button>
            </li>
            <li>
              <button>Customer Service</button>
            </li>
            <li>
              <button>Admin</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}