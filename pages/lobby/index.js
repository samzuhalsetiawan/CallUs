import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react";
import ApplicationBrand from "../../components/ApplicationBrand/ApplicationBrand";
import ButtonHamburger from "../../components/Button/ButtonHumburger/ButtonHamburger";
import NavigationPanel from "../../components/NavigationPanel/NavigationPanel";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useAppContext } from "../../src/context/GlobalContext";
import styles from '../../styles/Lobby.module.css';

export default function Lobby() {
  const router = useRouter();
  const inputName = useRef();
  const mainNavigation = useRef();
  const applicationBrandDrawer = useRef();
  const overlay = useRef();
  const sectionRef = useRef();
  const antrianSaatIniRef = useRef();
  const csOnlineRef = useRef();
  const [ antrianSaatIni, setAntrianSaatIni ] = useState(0);
  const [ totalCS, setTotalCs ] = useState(0);
  const { globalContext, setGlobalContext } = useAppContext();
  
  const drawerController = (open) => {
    mainNavigation.current.style.left = open ? "-80%" : "0px";
    overlay.current.classList.toggle(styles['hide']);
  }
  
  const goToWaitingRoom = () => {
    const nama = inputName.current.value;
    const namainstansi = router.query.namainstansi;
    router.push({
      pathname: '/waitingroom',
      query: {
        nama, namainstansi
      }
    })
  }

  useEffect(() => {
    const namainstansi = router.query.namainstansi;
    fetch("/api/getantriandata?namainstansi=" + namainstansi)
      .then(res => {
        res.json().then(data => {
          const { totalAntrian, totalterlayani, nomorAntrianSaatIni } = data;
          setAntrianSaatIni(totalAntrian);
        })
      })
    fetch("/api/getcsdata?namainstansi=" + namainstansi)
    .then(res => {
      res.json().then(data => {
        const { banyakCS } = data;
        setTotalCs(banyakCS);
      })
    })
  }, []);

  useEffect(() => {
    console.log("[Lobby] antrian saat ini: ", antrianSaatIni);
  }, [antrianSaatIni]);

  useEffect(() => {
    globalContext.socket.emit("join-room", router.query.namainstansi);
    globalContext.socket.on("update-antrian", antrian => {
      setAntrianSaatIni(antrian);
    });
    globalContext.socket.on("update-total-cs", totalCs => {
      setTotalCs(totalCs);
    });
  }, []);

  return (
    <div className={styles['main-container']}>
      <div className={styles['hamburger-and-profile']}>
        <div className={styles['hamburger-wrapper']}>
          <ButtonHamburger onClick={drawerController} />
        </div>
      </div>
      <div ref={overlay} className={`${styles['overlay']} ${styles['hide']}`}></div>
      <div ref={mainNavigation} className={styles['main-navigation']}>
        <div ref={applicationBrandDrawer}>
          <ApplicationBrand myStyle={{paddingTop: "0px"}} />
        </div>
        <div className={styles['navigation-wrapper']}>
          <NavigationPanel activeMenu="dashboard" />
        </div>
        <div className={styles['profile-card-wrapper']}>
          <ProfileCard />
        </div>
      </div>
      <div className={styles['main-content']}>
        <header>
          <div className={styles['logo-container']}>
            <img src="/lp_icon.png" alt="Logo Instansi" />
          </div>
          <h3>Kementrian Tenaga Kerja</h3>
          <p><span>Selamat datang di kementrian tenaga kerja, </span>silahkan masukan nama dan ambil nomor antrian anda</p>
        </header>
        <section ref={sectionRef}>
         <form onSubmit={e => e.preventDefault()}>
            <input ref={inputName} type="text" placeholder='Silahkan masukan nama anda' required={true} />
            <button type="submit" onClick={goToWaitingRoom} className={styles['btn-ambil-antrian']}>
              <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.0684 12.3203H43.9316C44.3639 12.3203 44.5801 12.5365 44.5801 12.9688V70.0312C44.5801 70.4635 44.3639 70.6797 43.9316 70.6797H39.0684C38.6361 70.6797 38.4199 70.4635 38.4199 70.0312V12.9688C38.4199 12.5365 38.6361 12.3203 39.0684 12.3203Z" fill="#EAF3FC"/>
                <path d="M14.2656 38.4199H68.7344C69.1667 38.4199 69.3828 38.6361 69.3828 39.0684V43.9316C69.3828 44.3639 69.1667 44.5801 68.7344 44.5801H14.2656C13.8333 44.5801 13.6172 44.3639 13.6172 43.9316V39.0684C13.6172 38.6361 13.8333 38.4199 14.2656 38.4199Z" fill="#EAF3FC"/>
              </svg>
              <span>
                Ambil Antrian
              </span>
            </button>
          </form>
        </section>
        <footer>
          <div className={styles['detail-container']}>
            <div className={styles['detail-left-section']}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.72 14.7599C19.07 13.9099 19.26 12.9999 19.26 11.9999C19.26 11.2799 19.15 10.5899 18.96 9.94995C18.31 10.0999 17.63 10.1799 16.92 10.1799C15.466 10.1815 14.0329 9.83347 12.7415 9.16517C11.4502 8.49687 10.3384 7.5279 9.5 6.33995C8.6031 8.51012 6.91112 10.2557 4.77 11.2199C4.73 11.4699 4.73 11.7399 4.73 11.9999C4.73 12.9547 4.91804 13.9 5.2834 14.7821C5.64875 15.6641 6.18425 16.4655 6.85933 17.1406C8.22272 18.504 10.0719 19.2699 12 19.2699C13.05 19.2699 14.06 19.0399 14.97 18.6299C15.54 19.7199 15.8 20.2599 15.78 20.2599C14.14 20.8099 12.87 21.0799 12 21.0799C9.58 21.0799 7.27 20.1299 5.57 18.4199C4.536 17.3891 3.76737 16.1229 3.33 14.7299H2V10.1799H3.09C3.42024 8.57246 4.17949 7.08436 5.28719 5.87354C6.39489 4.66272 7.80971 3.77435 9.38153 3.3027C10.9533 2.83106 12.6235 2.79372 14.2149 3.19465C15.8062 3.59559 17.2593 4.41984 18.42 5.57995C19.6802 6.8352 20.5398 8.43605 20.89 10.1799H22V14.7299H21.94L18.38 17.9999L13.08 17.3999V15.7299H17.91L18.72 14.7599M9.27 11.7699C9.57 11.7699 9.86 11.8899 10.07 12.1099C10.281 12.3227 10.3995 12.6103 10.3995 12.9099C10.3995 13.2096 10.281 13.4972 10.07 13.7099C9.86 13.9199 9.57 14.0399 9.27 14.0399C8.64 14.0399 8.13 13.5399 8.13 12.9099C8.13 12.2799 8.64 11.7699 9.27 11.7699M14.72 11.7699C15.35 11.7699 15.85 12.2799 15.85 12.9099C15.85 13.5399 15.35 14.0399 14.72 14.0399C14.09 14.0399 13.58 13.5399 13.58 12.9099C13.58 12.6076 13.7001 12.3176 13.9139 12.1038C14.1277 11.8901 14.4177 11.7699 14.72 11.7699V11.7699Z" fill="#FBFAFF"/>
              </svg>
              <div>
                <span>Customer Service</span>
                <span ref={csOnlineRef}>{totalCS}</span>
                <span>Orang</span>
              </div>
            </div>
            <div className={styles['detail-garis-tengah']}></div>
            <div className={styles['detail-right-section']}>
              <svg width="48" height="48" viewBox="0 0 69 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26 13C26 17.962 30.038 22 35 22C39.962 22 44 17.962 44 13C44 8.038 39.962 4 35 4C30.038 4 26 8.038 26 13ZM51 42H53V40C53 32.282 46.718 26 39 26H31C23.28 26 17 32.282 17 40V42H51Z" fill="white"/>
                <path d="M10 9.66675C10 12.9747 12.692 15.6667 16 15.6667C19.308 15.6667 22 12.9747 22 9.66675C22 6.35875 19.308 3.66675 16 3.66675C12.692 3.66675 10 6.35875 10 9.66675ZM26.6667 29.0001H28V27.6667C28 22.5214 23.812 18.3334 18.6667 18.3334H13.3333C8.18667 18.3334 4 22.5214 4 27.6667V29.0001H26.6667Z" fill="white"/>
                <path d="M47 9.66675C47 12.9747 49.692 15.6667 53 15.6667C56.308 15.6667 59 12.9747 59 9.66675C59 6.35875 56.308 3.66675 53 3.66675C49.692 3.66675 47 6.35875 47 9.66675ZM63.6667 29.0001H65V27.6667C65 22.5214 60.812 18.3334 55.6667 18.3334H50.3333C45.1867 18.3334 41 22.5214 41 27.6667V29.0001H63.6667Z" fill="white"/>
              </svg>
              <div>
                <span>Antrian saat ini</span>
                <span ref={antrianSaatIniRef}>{antrianSaatIni}</span>
                <span>Orang</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}