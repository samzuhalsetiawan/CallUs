import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"
import { useAppContext } from "../../src/context/GlobalContext";
import styles from '../../styles/MainLobby.module.css';

export default function MainLobby() {
  const videoLocalElementRef = useRef();
  const videoRemoteElementRef = useRef();
  const router = useRouter();
  const { cs, namainstansi, nomorantrian } = router.query;
  const { globalContext, setGlobalContext } = useAppContext();
  const [ localStream, setLocalStream ] = useState(); 
  const [ myCall, setMyCall ] = useState();
  const btnKirimPesanRef = useRef();
  const inputMessageRef = useRef();
  
  const getUserStream = async () => {
    let _localStream = new MediaStream();
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const tracks = stream.getTracks();
    tracks.forEach(track => { _localStream.addTrack(track) });
    setGlobalContext({
      ...globalContext,
      localStream: _localStream
    });
    setLocalStream(_localStream);
    /**
     * @type {HTMLVideoElement}
     */
    const videoLocalElement = videoLocalElementRef.current;
    videoLocalElement.srcObject = _localStream;
    videoLocalElement.onloadedmetadata = () => {
      videoLocalElement.muted = true;
      videoLocalElement.play();
    }
    globalContext.socket.emit("calling-for-calling", { from: globalContext.socket.id, to: cs });
  }

  useEffect(() => { getUserStream() }, []);

  const initialize = () => {
    globalContext.peer.on("call", call => {
      setMyCall(call);
      call.answer(localStream);
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
      globalContext.socket.on("pelayanan-selesai", ({ from, to }) => {
        const peer = globalContext.peer;
        call.close();
        peer.disconnect();
        peer.destroy();
        setGlobalContext({
          ...globalContext,
          peer: null,
          localStream: null,
          remoteStream: null
        });
        setLocalStream(null);
        videoRemoteElementRef.current.srcObject = undefined;
        router.push("/");
      });
    });
  }

  useEffect(initialize, [localStream]);

  useEffect(() => {
    globalContext.socket.on("new-message", ({ from, to, message }) => {
      const containerDiv = document.createElement("div");
      containerDiv.classList.add(styles["chat-content"]);
      const bubbleChat = document.createElement("p");
      bubbleChat.textContent = message;
      containerDiv.appendChild(bubbleChat);
      const container = document.getElementById("chat-box");
      container.appendChild(containerDiv);
    });
  }, []);

  const kirimPesan = (pesan) => {
    globalContext.socket.emit("new-message", { from: globalContext.socket.id, to: cs, message: pesan });
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
        </div>
      </div>
    </div>
  )
}