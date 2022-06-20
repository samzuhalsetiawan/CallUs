import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../src/context/GlobalContext";

export default function CustomerServiceDashboard({ panjangAntrian, totalCustomerTerlayani, error }) {
  const router = useRouter();
  const { namacs, namainstansi } = router.query;
  const { globalContext, setGlobalContext } = useAppContext();
  const videoLocalElementRef = useRef();
  const videoRemoteElementRef = useRef();
  const [ peer, setPeer ] = useState();
  const [ nomorAntrian, setNomorAntrian ] = useState(); 
  const [ remoteSocketId, setRemoteSocketId ] = useState();

  const getLocalStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const localStream = new MediaStream();
    setGlobalContext({
      ...globalContext,
      localStream
    });
    const [ track ] = stream.getVideoTracks();
    localStream.addTrack(track);
    /**
     * @type {HTMLVideoElement}
     */
    const videoElement = videoLocalElementRef.current;
    videoElement.srcObject = localStream;
    videoElement.onloadedmetadata = () => {
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
        videoRemoteElement.play();
      }
    });
  }

  const akhiriPelayanan = async () => {
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
    } else {
      const data = await response.json();
      console.error(data.error); //TODO: Handle dengan benar
    }
  }

  const telponSelanjutnya = async () => {
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

  return (
    <div>
      {error ? error: ""}
      <h1>Ini Dashboard Customer Service ({namainstansi})</h1>
      <div>
        <video ref={videoLocalElementRef} src="">Video Not Supported</video>
      </div>
      <div>
        <video ref={videoRemoteElementRef} src="">Video Not Supported</video>
      </div>
      <div>
        <p>Nama</p>
        <p>{namacs}</p>
      </div>
      <div>
        <button onClick={telponSelanjutnya}>Customer Selanjutnya</button>
        <button onClick={akhiriPelayanan}>Akhiri Pelayanan</button>
        <p>detail antrian</p>
        <p>panjang antrian: {panjangAntrian}</p>
        <p>customer terlayani: {totalCustomerTerlayani}</p>
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