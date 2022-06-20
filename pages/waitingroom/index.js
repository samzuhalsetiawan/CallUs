import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../src/context/GlobalContext";
import ApplicationBrand from "../../components/ApplicationBrand/ApplicationBrand";
import ButtonHamburger from "../../components/Button/ButtonHumburger/ButtonHamburger";
import NavigationPanel from "../../components/NavigationPanel/NavigationPanel";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import styles from '../../styles/WaitingRoom.module.css';

export default function WaitingRoom({ nama, namaInstansi, nomorAntrian, antrianUid, error }) {
  const dialogElementRef = useRef();
  const router = useRouter();
  const mainNavigation = useRef();
  const applicationBrandDrawer = useRef();
  const overlay = useRef();
  const sectionRef = useRef();
  const antrianSaatIniRef = useRef();
  const csOnlineRef = useRef();
  const [ antrianSaatIni, setAntrianSaatIni ] = useState(0);
  const [ totalCustomerTerlayani, setTotalTerlayani ] = useState(0);
  const [ antrianMenujuAnda, setAntrianMenujuAnda ] = useState(0);
  const [ totalCS, setTotalCs ] = useState(0);
  const { globalContext, setGlobalContext } = useAppContext();

  const drawerController = (open) => {
    mainNavigation.current.style.left = open ? "-80%" : "0px";
    overlay.current.classList.toggle(styles['hide']);
  }

  useEffect(() => {
    const namainstansi = router.query.namainstansi;
    fetch("/api/getantriandata?namainstansi=" + namainstansi)
      .then(res => {
        res.json().then(data => {
          const { totalAntrian, totalterlayani, nomorAntrianSaatIni } = data;
          setAntrianSaatIni(totalAntrian);
          setTotalTerlayani(totalterlayani);
          setAntrianMenujuAnda(nomorAntrian - totalCustomerTerlayani - 1);
        });
      })
    fetch("/api/getcsdata?namainstansi=" + namainstansi)
    .then(res => {
      res.json().then(data => {
        const { banyakCS } = data;
        setTotalCs(banyakCS);
      })
    })
  }, []);

  const panggilanPromise = () => {
    return new Promise((resolve, reject) => {
      dialogElementRef.current.onclose = () => {
        const isTerima = dialogElementRef.current.returnValue;
        if (isTerima) {
          resolve(true);
        } else {
          reject(false);
        }
      } 
    })
  }

  const initializeSocketListener = () => {
    globalContext.socket.on("remote-socket-called", async ({ from, to }) => {
      dialogElementRef.current.showModal();
      const isAccepted = await panggilanPromise();
      globalContext.socket.emit("send-call-answer", ({ from: to, to: from, answer: isAccepted }));
      if (isAccepted) {
        router.push({
          pathname: '/mainlobby',
          query: {
            cs: from,
            namainstansi: namaInstansi,
            nomorantrian: nomorAntrian
          }
        });
      }
    });
  }

  useEffect(initializeSocketListener, []);

  const initializePeer = async () => {
    const Peer = (await import('peerjs')).default;
    const peer = new Peer();
    peer.on("open", async id => {
      setGlobalContext({
        ...globalContext,
        peer
      });
      const response = await fetch("/api/customer/addpeerid", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          namaInstansi, nomorAntrian, peerId: id, socketId: globalContext.socket.id
        })
      });
      if (response.status === 200) {
        const { peerId } = await response.json();
        console.log("[WaitingRoom] PeerID Added Succesfully: " + peerId);
      } else {
        const { error } = await response.json();
        console.log("[WaitingRoom] Gagal menambahkan peerID: " + error);
      }
    });
  }

  useEffect(() => { initializePeer() }, []);

  useEffect(() => {
    globalContext.socket.on("update-antrian", antrian => {
      setAntrianSaatIni(antrian);
    });
    globalContext.socket.on("update-terlayani", terlayani => {
      setTotalTerlayani(terlayani);
      setAntrianMenujuAnda(nomorAntrian - totalCustomerTerlayani - 1);
    });
    globalContext.socket.on("update-total-cs", totalCs => {
      setTotalCs(totalCs);
    });
  }, []);

  return (
    <>
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
            <p><span>Hallo {nama}, Berikut detail Nomor Antrian Anda, </span>silahkan menunggu nomor antrian anda dipanggil</p>
          </header>
          <section ref={sectionRef}>
            <div className={styles['card-nomor-antrian']}>
              <div className={styles['angka-nomor-antrian']}>
                <h3>{nomorAntrian}</h3>
              </div>
              <div className={styles['live-garis-tengah']}></div>
              <div className={styles['detail-antrian-live']}>
                <div>
                  <p>Panjang Antrian</p>
                  <p>{antrianMenujuAnda}</p>
                </div>
                <div>
                  <p>Total Customer Terlayani</p>
                  <p><span>{totalCustomerTerlayani}</span> / <span>{antrianSaatIni}</span></p>
                </div>
              </div>
            </div>
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
                <span>Online</span>
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
                <span>Antrian tersisa</span>
                <span ref={antrianSaatIniRef}>{antrianMenujuAnda}</span>
                <span>orang menuju anda</span>
              </div>
            </div>
          </div>
        </footer>
        </div>
      </div>
      <dialog className={styles['dialog-container']} ref={dialogElementRef}>
        <form method='dialog'>
          <p>Customer Service Kami Menghubungi Anda . . .</p>
          <div className={styles['dialog-button-container']}>
            <button onClick={() => {dialogElementRef.current.returnValue = true}}>
              <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="37.5" cy="37.5" r="37.5" fill="#2FA869"/>
                <g clipPath="url(#clip0_305_551)">
                <path fillRule="evenodd" clipRule="evenodd" d="M25.5789 23.6524C25.9144 23.3174 26.3173 23.0575 26.7609 22.8899C27.2044 22.7224 27.6786 22.651 28.1518 22.6806C28.625 22.7101 29.0866 22.8399 29.5059 23.0614C29.9252 23.2828 30.2926 23.5908 30.5838 23.965L34.0259 28.387C34.6568 29.1981 34.8793 30.2547 34.63 31.2519L33.5811 35.4515C33.5268 35.669 33.5298 35.8968 33.5896 36.1129C33.6494 36.3289 33.764 36.5258 33.9224 36.6845L38.634 41.3961C38.7928 41.5547 38.9901 41.6696 39.2065 41.7294C39.4229 41.7892 39.6511 41.792 39.8689 41.7374L44.0666 40.6885C44.5587 40.5654 45.0723 40.5559 45.5686 40.6605C46.0649 40.7652 46.531 40.9813 46.9315 41.2925L51.3535 44.7327C52.9432 45.9696 53.0889 48.3186 51.6661 49.7396L49.6833 51.7224C48.2642 53.1414 46.1433 53.7647 44.1663 53.0686C39.1061 51.2881 34.5116 48.3912 30.7238 44.5927C26.9256 40.8055 24.0287 36.2117 22.248 31.1522C21.5538 29.177 22.177 27.0542 23.596 25.6352L25.5789 23.6524Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_305_551">
                <rect width="30.6818" height="30.6818" fill="white" transform="translate(21.9637 22.6733)"/>
                </clipPath>
                </defs>
              </svg>
              <span>Terima</span>
            </button>
            <button onClick={() => {dialogElementRef.current.returnValue = false}}>
              <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="37.5" cy="37.5" r="37.5" fill="#FF0043"/>
                <g clipPath="url(#clip0_305_547)">
                <path fillRule="evenodd" clipRule="evenodd" d="M55.7526 39.866C55.7525 40.3401 55.6517 40.8089 55.4568 41.2411C55.2619 41.6734 54.9774 42.0593 54.622 42.3732C54.2667 42.6872 53.8487 42.9221 53.3958 43.0623C52.9428 43.2025 52.4652 43.2448 51.9947 43.1865L46.4334 42.4972C45.4137 42.3704 44.5089 41.7811 43.9795 40.9001L41.7492 37.1903C41.6336 36.9982 41.4704 36.8393 41.2752 36.729C41.0801 36.6186 40.8597 36.5606 40.6356 36.5605L33.9724 36.5649C33.7479 36.5651 33.5272 36.6235 33.332 36.7344C33.1367 36.8453 32.9735 37.0048 32.8582 37.1975L30.6341 40.9088C30.3735 41.3439 30.0173 41.7141 29.5925 41.9914C29.1678 42.2686 28.6855 42.4456 28.1823 42.5091L22.6233 43.207C20.6248 43.4578 18.8597 41.9009 18.8597 39.89L18.8579 37.0859C18.8566 35.0791 19.9143 33.138 21.8039 32.231C26.6395 29.9087 31.9359 28.7049 37.3002 28.709C42.664 28.6977 47.9614 29.8941 52.7997 32.2095C54.6878 33.114 55.7494 35.0551 55.7508 37.0619L55.7526 39.866Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_305_547">
                <rect width="30.6818" height="30.6818" fill="white" transform="translate(59 38) rotate(134.963)"/>
                </clipPath>
                </defs>
              </svg>
              <span>Tolak</span>
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}

export async function getServerSideProps(context) {
  const req = context.req;
  const { nama, namainstansi } = context.query;

  try {
    const response = await fetch(`${process.env.PROTOCOL || "http"}://${req.headers.host}/api/nomorantrian`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nama, namainstansi })
    });
    const { nomorAntrian, antrianUid } = await response.json();
    return {
      props: {
        nama, namaInstansi: namainstansi, nomorAntrian, antrianUid
      }
    }
  } catch (error) {
    return {
      props: {
        error: {
          message: error.message
        }
      }
    }
  }
}