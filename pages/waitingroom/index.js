import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
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
  const { globalContext, setGlobalContext } = useAppContext();

  const drawerController = (open) => {
    mainNavigation.current.style.left = open ? "-80%" : "0px";
    overlay.current.classList.toggle(styles['hide']);
  }

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
                  <p>3</p>
                </div>
                <div>
                  <p>Total Customer Terlayani</p>
                  <p><span>7</span> / <span>10</span></p>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <div className={styles['detail-container']}>
              <div className={styles['detail-left-section']}>
                <span>Status Antrian</span>
                <div className={styles['status-operasi']}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3C10.89 3 10 3.89 10 5H3V19H2V21H22V19H21V5C21 3.89 20.11 3 19 3H12ZM12 5H19V19H12V5ZM5 11H7V13H5V11Z" fill="#2FA869"/>
                  </svg>
                  <span>Dibuka</span>
                </div>
                <span>08:00 - 17:00 WIB</span>
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
                  <span>5</span>
                  <span>Orang</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <dialog ref={dialogElementRef}>
        <form method="dialog">
          <p><span></span>Menelpon Anda</p>
          <menu>
            <button onClick={() => {dialogElementRef.current.returnValue = true}}>Jawab</button>
            <button onClick={() => {dialogElementRef.current.returnValue = false}}>Tolak</button>
          </menu>
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