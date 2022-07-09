const namaInstansi = document.getElementsByClassName("lobby-container")[0].dataset.instansi;
const btnExit = document.querySelector('.btn-exit');
/**
 * @type {HTMLVideoElement}
 */
const localVideoEl = document.querySelector(".local-video");
const remoteVideoEl = document.querySelector(".remote-video");
let localStream;
let localPeerId;
let remoteStream;
let remoteSocketId;

let isInConversation = false;
let isCostumerService = false;

const socket = io();
socket.on("connect", () => {
  socket.emit("join-room", namaInstansi);
});

const peer = new Peer(undefined, {
  host: location.hostname,
  secure: /https/.test(location.protocol),
  port: location.port,
  path: "peerjs"
});

peer.on("open", peerId => {
  localPeerId = peerId;
  /**
   * @type {HTMLButtonElement}
   */
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
   .then(stream => {
    localStream = stream;
    localVideoEl.srcObject = localStream;
    localVideoEl.onloadedmetadata = () => localVideoEl.play();
    const btnNextCustomer = document.querySelector(".btn-next-customer");
    if (btnNextCustomer) {
      btnNextCustomer.addEventListener("click",async function() {
        if (isInConversation) {
          costumerNeedExit()
          remoteVideoEl.srcObject = undefined
          remoteStream = undefined
          isInConversation = false
        }
        socket.emit("call-customer", { csPeerId: peerId, namaInstansi });
      });
    }
    const cspeerid = document.querySelector(".lobby-main-content").dataset.cspeerid;
    if (cspeerid) {
      isCostumerService = false
      const call = peer.call(cspeerid, localStream);
      call.on("stream", rStream => {
        console.log("stream");
        remoteStream = rStream;
        remoteVideoEl.srcObject = remoteStream;
        remoteVideoEl.play();
        isInConversation = true
      });
      const conn = peer.connect(call.peer);
      conn.on("open", () => {
        conn.send({ remoteSocketId: socket.id })
      })
      const btnKirim = document.getElementById("kirim-pesan");
      btnKirim.addEventListener("click", function() {
        const pesan = document.getElementById("tulis").value; 
        conn.send(pesan);
        showMessage(pesan, true);
      });
      conn.on("data", data => {
        if (data?.remoteSocketId) {
          remoteSocketId = data.remoteSocketId
        } else {
          showMessage(data);
        }
      });
    } else {
      isCostumerService = true
      peer.on("call", call => {
        call.answer(localStream);
        call.on("stream", rStream => {
          console.log("stream");
          remoteStream = rStream;
          remoteVideoEl.srcObject = remoteStream;
          remoteVideoEl.play();
          isInConversation = true
        });
      });
      peer.on("connection", conn => {
        conn.on("open", () => {
          conn.send({ remoteSocketId: socket.id })
        })
        const btnKirim = document.getElementById("kirim-pesan");
        btnKirim.addEventListener("click", function() {
          const pesan = document.getElementById("tulis").value; 
          conn.send(pesan);
          showMessage(pesan, true);
        });
        conn.on("data", data => {
          if (data?.remoteSocketId) {
            remoteSocketId = data.remoteSocketId
          } else {
            showMessage(data);
          }
        });
      });
    }
   });
})

function showMessage(msg, my = false) {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.classList.add("chat-content");
  if (my) div.classList.add("my-chat");
  const p = document.createElement("p");
  p.textContent = msg;
  div.appendChild(p);
  chatBox.appendChild(div);
}

btnExit.addEventListener('click', function() {
  if (isCostumerService) {
    costumerNeedExit()
    keluarLobby()
  } else {
    keluarLobby(true)
  }
})

function keluarLobby(needInfo = false) {
  if (needInfo) {
    infokanKeluarLoby()
    socket.on("info-accepted", () => {
      peer.destroy()
      window.location = '/'  
    })
  } else {
    peer.destroy()
    window.location = '/'
  }
}

function infokanKeluarLoby() {
  socket.emit("exit-lobby", { to: remoteSocketId })
}

function costumerNeedExit() {
  socket.emit("exit-lobby-now", { to: remoteSocketId })
}

socket.on("exit-lobby", ({ from }) => {
  remoteVideoEl.srcObject = undefined
  remoteStream = undefined
  socket.emit("info-accepted", { to: remoteSocketId })
})

socket.on("exit-lobby-now", () => {
  keluarLobby()
})