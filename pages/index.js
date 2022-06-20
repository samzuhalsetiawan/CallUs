import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAppContext } from '../src/context/GlobalContext';
import styles from '../styles/Dashboard.module.css';
import LpCard from '../components/LpCard/LpCard';
import DialogProfile from "../components/AlertDialog/DialogProfile/DialogProfile";
import AddInstansiCard from '../components/AddInstansiCard/AddInstansiCard';
import ApplicationBrand from "../components/ApplicationBrand/ApplicationBrand";
import ButtonNotification from "../components/Button/ButtonNotification/ButtonNotification";
import ButtonProfilePicture from "../components/Button/ButtonProfilePicture/ButtonProfilePicture";
import ButtonHamburger from '../components/Button/ButtonHumburger/ButtonHamburger';
import NavigationPanel from "../components/NavigationPanel/NavigationPanel";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import SearchBar from "../components/SearchBar/SearchBar";

export default function Dashboard({ instansi }) {
  const router = useRouter();
  const emailInputRef = useRef();
  const dialogCSRef = useRef();
  const instansiSelected = useRef();
  const { globalContext, setGlobalContext } = useAppContext();
  const mainNavigation = useRef();
  const applicationBrandDrawer = useRef();
  const overlay = useRef();
  const buttonPopUpProfile = useRef();
  const dialogPopUpProfile = useRef();
  
  const drawerController = (open) => {
    mainNavigation.current.style.left = open ? "-80%" : "0px";
    overlay.current.classList.toggle(styles['hide']);
  }
  const profileButtonController = () => {
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
    }
    if (isMobile) {
      dialogPopUpProfile.current.showModal();
    } else {
      console.log("Not Yet Implemented");
    }
  }
  
  const socketInitializer = async () => {
      const response = await fetch('/api/socket');
      if (response.status !== 200) {
        console.error(response.statusText);
        return;
      }
      if (!globalContext.socket) {
        const socket = io();
        socket.on("connect", () => {
          setGlobalContext({ socket });
          console.log("[Main Menu] Socket Connected: " + socket.id);
        });
      } 
  }

  useEffect(() => { socketInitializer() }, [])


  const goToLobby = (namaInstansi) => {
    router.push({
      pathname: '/lobby',
      query: {
        namainstansi: namaInstansi
      }
    });
  }
  const goToDaftar = () => {
    router.push('/daftar');
  }
  const openCsModal = (namaInstansi) => {
    instansiSelected.current = namaInstansi;
    dialogCSRef.current.showModal();
  }
  const goToCostumerServiceDashboard = async () => {
    const email = emailInputRef.current.value;
    const response = await fetch(`${location.origin}/api/verifikasiemailcs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        namaInstansi: instansiSelected.current,
        email
      })
    });
    const data = await response.json();
    if (response.status === 500) {
      console.log(data.error); //TODO: Handle dengan benar
      return;
    } else if (response.status === 200) {
      router.push({
        pathname: '/customerservice',
        query: {
          namacs: data.namaCS,
          namainstansi: data.namaInstansi
        }
      })
    }
  }

  return (
    <>
      <Head>
        <title>Online Customer Service</title>
        <meta name="description" content="Sebuah aplikasi online untuk memudahkan masyarakat menghubungi customer service via video chat tanpa harus datang secara offline" />
        <meta property="og:title" content="Online Customer Service" />
        <meta property="og:url" content="https://online-customer-service.vercel.app" />
        <meta property="og:description" content="Sebuah aplikasi online untuk memudahkan masyarakat menghubungi customer service via video chat" />
        <meta property="og:image" content="https://dl.dropboxusercontent.com/s/k93qnztbub6bj3g/preview_for_cdn.png?dl=0" />
        <meta property="og:type" content="website" />
        <meta property="oh:locale" content="id_ID" />
      </Head>
      <div className={styles['main-container']}>
        <div ref={overlay} className={`${styles['overlay']} ${styles['hide']}`}></div>
        <div ref={mainNavigation} className={styles['main-navigation']}>
          <div ref={applicationBrandDrawer}>
            <ApplicationBrand />
          </div>
          <div className={styles['navigation-wrapper']}>
            <NavigationPanel activeMenu="dashboard" />
          </div>
          <div className={styles['profile-card-wrapper']}>
            <ProfileCard />
          </div>
        </div>
        <div className={styles['main-section']}>
          <div className={styles['header-wrapper']}>
            <div className={styles['hamburger-and-profile']}>
              <div className={styles['hamburger-wrapper']}>
                <ButtonHamburger onClick={drawerController} />
              </div>
              <div className={styles['notif-and-profile']}>
                <div className={styles['notif-icon-wrapper']}>
                  <ButtonNotification />
                </div>
                <ButtonProfilePicture handler={profileButtonController} myRef={buttonPopUpProfile} />
              </div>
            </div>
            <div className={styles['application-brand-wrapper']}>
              <ApplicationBrand align="center" />
            </div>
            <div className={styles['search-bar-wrapper']}>
              <SearchBar />
            </div>
          </div>
          <div className={styles['lp-cards-container']}>
            <div>
              <AddInstansiCard handler={() => {}} />
              {instansi.map(instansi => {
                return <LpCard key={instansi.namaInstansi} instansi={{
                  ...instansi,
                  btnCustomerServiceHandler: () => openCsModal(instansi.namaInstansi),
                  btnCustomerHandler: () => goToLobby(instansi.namaInstansi)
                }}/>
              })}
            </div>
          </div>
        </div>
      </div>
      <DialogProfile myRef={dialogPopUpProfile}/>

      <dialog ref={dialogCSRef} className={styles['dialog-cs']}>
        <div>
          <h3>Customer Service</h3>
          <form method='dialog'>
            <label htmlFor="emai-input">Masukan email anda yang didaftarkan admin</label>
            <input id='emai-input' ref={emailInputRef} type="text" placeholder='Masukan email anda . . .' />
            <p className={styles['pengujian-p']}>*Gunakan email admin1@test.com (untuk pengujian)</p>
            <div className={styles['dialog-action-button']}>
              <button onClick={goToCostumerServiceDashboard}>Submit</button>
              <button>Kembali</button>
            </div>
          </form>
        </div>
      </dialog>
  </>
  )
}

export async function getServerSideProps(context) {
  const req = context.req;
  const response = await fetch(`${process.env.PROTOCOL || "http"}://${req.headers.host}/api/instansi`);
  const data = await response.json();
  return {
    props: {
      instansi: data.instansi
    }
  }
}
