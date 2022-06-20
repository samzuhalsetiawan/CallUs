import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../src/context/GlobalContext";
import styles from '../../styles/CustomerService.module.css';

export default function CustomerServiceDashboard({ panjangAntrian, totalCustomerTerlayani, error }) {
  const router = useRouter();
  const { namacs, namainstansi } = router.query;
  const { globalContext, setGlobalContext } = useAppContext();
  const videoLocalElementRef = useRef();
  const videoRemoteElementRef = useRef();
  const btnKirimPesanRef = useRef();
  const inputMessageRef = useRef();
  const btnNextCustomer = useRef();
  const btnAkhiri = useRef();
  const [ peer, setPeer ] = useState();
  const [ nomorAntrian, setNomorAntrian ] = useState(); 
  const [ remoteSocketId, setRemoteSocketId ] = useState();

  const getLocalStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const localStream = new MediaStream();
    setGlobalContext({
      ...globalContext,
      localStream
    });
    const tracks = stream.getTracks();
    tracks.forEach(track => { localStream.addTrack(track) });
    /**
     * @type {HTMLVideoElement}
     */
    const videoElement = videoLocalElementRef.current;
    videoElement.srcObject = localStream;
    videoElement.onloadedmetadata = () => {
      videoElement.muted = true;
      videoElement.play();
    }
  }

  useEffect(() => getLocalStream(), []);

  const initializePeer = async () => {
    const Peer = (await import('peerjs')).default;
    const _peer = new Peer();
    setPeer(_peer)
    _peer.on("open", async id => {
      setGlobalContext({
        ...globalContext,
        peer: _peer
      });
      const response = await fetch("/api/customerservice/addpeerid", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          namainstansi, namacs, peerId: id, socketId: globalContext.socket.id
        })
      });
      if (response.status === 200) {
        const { peerId } = await response.json();
        console.log("[CustomerService] PeerID Added Succesfully: " + peerId);
      } else {
        const { error } = await response.json();
        console.log("[CustomerService] Gagal menambahkan peerID: " + error);
      }
    });
    globalContext.socket.on("new-message", ({ from, to, message }) => {
      const containerDiv = document.createElement("div");
      containerDiv.classList.add(styles["chat-content"]);
      const bubbleChat = document.createElement("p");
      bubbleChat.textContent = message;
      containerDiv.appendChild(bubbleChat);
      const container = document.getElementById("chat-box");
      container.appendChild(containerDiv);
    });
  }

  useEffect(() => { initializePeer() }, []);

  const setCallListener = (call) => {
    call.on("stream", stream => {
      const remoteStream = new MediaStream(); 
      setGlobalContext({
        ...globalContext,
        remoteStream
      });
      const [ track ] = stream.getVideoTracks();
      remoteStream.addTrack(track);
      /**
       * @type {HTMLVideoElement}
       */
      const videoRemoteElement = videoRemoteElementRef.current;
      videoRemoteElement.srcObject = remoteStream;
      videoRemoteElement.onloadedmetadata = () => {
        videoRemoteElement.muted = false;
        videoRemoteElement.play();
      }
    });
  }

  useEffect(() => {
    btnAkhiri.current.style.display = "none";
  }, []);

  const akhiriPelayanan = async () => {
    btnAkhiri.current.style.display = "none";
    btnNextCustomer.current.style.display = "block";
    /**
     * @type {HTMLVideoElement}
     */
    const videoElement = videoRemoteElementRef.current;
    videoElement.srcObject = undefined;
    setGlobalContext({
      ...globalContext,
      remoteStream: null
    });
    const response = await fetch("/api/customerservice/terlayani", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nomorAntrian, namaInstansi: namainstansi })
    });
    if (response.status === 200) {
      globalContext.socket.emit("pelayanan-selesai", { from: globalContext.socket.id, to: remoteSocketId });
      setRemoteSocketId(null);
    } else {
      const data = await response.json();
      console.error(data.error); //TODO: Handle dengan benar
    }
  }

  const telponSelanjutnya = async () => {
    btnNextCustomer.current.style.display = "none";
    btnAkhiri.current.style.display = "block";
    const response = await fetch(`/api/nextcustomer?instansi=${namainstansi}`);
    const data = await response.json();
    if (response.status === 500) {
      console.error(data.error) //TODO: Handle dengan benar
    } else if (response.status === 200) {
      const { peerId: remotePeerId, socketId: remoteSocketId, nomorAntrian } = data;
      setRemoteSocketId(remoteSocketId);
      setNomorAntrian(nomorAntrian);
      globalContext.socket.emit("calling-remote-socket", {
        from: globalContext.socket.id,
        to: remoteSocketId
      });
      globalContext.socket.on("call-answer-received", ({ from, to, answer }) => {
        if (answer) {
          globalContext.socket.on("calling-for-calling", ({ from, to }) => {
            const call = peer.call(remotePeerId, globalContext.localStream);
            setCallListener(call);
          });
        } else {
          console.log("Decline"); //TODO: Handle dengan benar
        }
      })
    }
  }

  const kirimPesan = (pesan) => {
    globalContext.socket.emit("new-message", { from: globalContext.socket.id, to: remoteSocketId, message: pesan });
    const containerDiv = document.createElement("div");
    containerDiv.classList.add(styles["chat-content"], styles['my-chat']);
    const bubbleChat = document.createElement("p");
    bubbleChat.textContent = pesan;
    containerDiv.appendChild(bubbleChat);
    const container = document.getElementById("chat-box");
    container.appendChild(containerDiv);
    inputMessageRef.current.value = "";
  } 

  return (
    <div className={styles['main-container']}>
      <div className={styles['main-content']}>
        <div className={styles["video-layer"]}>
            <video ref={videoRemoteElementRef} className={styles['remote-video']}>Video Tidak didukung</video>
            <video ref={videoLocalElementRef} className={styles['local-video']}>Video Tidak didukung</video>
        </div>
        <div className={styles["chat-layer"]}>
          <h2>chat</h2>
          <div id="chat-box" className={styles["chat-box"]}></div>
          <div className={styles["tulis"]}>
            <div className={styles['input-container']}>
              <input ref={inputMessageRef} placeholder="Ketik Pesan.." type="text" id="tulis" />
              <button onClick={() => kirimPesan(inputMessageRef.current.value)} ref={btnKirimPesanRef} type="submit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="#0361FE"/>
                </svg>
              </button>
            </div>
          </div>
          <div className={styles['button-container']}>
            <button ref={btnNextCustomer} onClick={telponSelanjutnya} className={styles['btn-next-customer']}>Customer Selanjutnya</button>
            <button ref={btnAkhiri} onClick={akhiriPelayanan} className={styles['btn-next-customer']}>Akhiri Pelayanan</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const req = context.req;
  const { namainstansi } = context.query;
  const response = await fetch(`${process.env.PROTOCOL || "http"}://${req.headers.host}/api/antrian?namainstansi=${namainstansi}`);
  const data = await response.json();
  if (response.status === 200) {
    return {
      props: {
        panjangAntrian: data.panjangAntrian,
        totalCustomerTerlayani: data.totalCustomerTerlayani
      }
    }
  } else {
    return {
      props: {
        error: data.error
      }
    }
  }
}