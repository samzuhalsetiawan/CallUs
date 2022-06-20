import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"
import { useAppContext } from "../../src/context/GlobalContext";

export default function MainLobby() {
  const videoLocalElementRef = useRef();
  const videoRemoteElementRef = useRef();
  const router = useRouter();
  const { cs } = router.query;
  const { globalContext, setGlobalContext } = useAppContext();
  const [ localStream, setLocalStream ] = useState(); 
  
  const getUserStream = async () => {
    let _localStream = new MediaStream();
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const [ track ] = stream.getVideoTracks();
    _localStream.addTrack(track);
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
      videoLocalElement.play();
    }
    globalContext.socket.emit("calling-for-calling", { from: globalContext.socket.id, to: cs });
  }

  useEffect(() => { getUserStream() }, []);

  const initialize = () => {
    globalContext.peer.on("call", call => {
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
    })
  }

  useEffect(initialize, [localStream]);

  return (
    <div>
      <h2>Ini Main Lobby</h2>
      <video ref={videoLocalElementRef} src=""></video>
      <video ref={videoRemoteElementRef} src=""></video>
    </div>
  )
}