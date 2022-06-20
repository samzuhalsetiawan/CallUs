import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useAppContext } from "../../src/context/GlobalContext";

export default function WaitingRoom({ nama, namaInstansi, nomorAntrian, antrianUid, error }) {
  const dialogElementRef = useRef();
  const router = useRouter();
  const { globalContext, setGlobalContext } = useAppContext();

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
            cs: from
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
      <div>
        {error ? <p>{error.message}</p> : ""} {/* //TODO: Handle dengan benar */}
        <h2>Ini Waiting room</h2>
        <p>Nama Anda</p>
        <p>{nama}</p>
        <p>Nama Instansi</p>
        <p>{namaInstansi}</p>
        <p>Nomor Antrian</p>
        <p>{nomorAntrian}</p>
        <p>Antrian UID</p>
        <p>{antrianUid}</p>
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