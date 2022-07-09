const express = require("express");
const { InstansiManager } = require("./manager/InstansiManager");
const createDummyInstansi = require("./utils/Dummy");
const app = express();
const fs = require("fs");
const path = require("path");
const cert = fs.readFileSync(path.resolve(__dirname, "cert/localhost.crt"));
const key = fs.readFileSync(path.resolve(__dirname, "cert/localhost.decrypted.key"));
const https = require("https");
const server = https.createServer({ cert, key }, app);
const { ExpressPeerServer } = require('peer');
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 443;
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/peerjs'
});

app.use('/', peerServer);

const instansiManager = new InstansiManager();
createDummyInstansi(instansiManager);

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render('dashboard', { semuaInstansi: [...instansiManager.semuaInstansi] });
});

app.get("/waitingroom", (req, res) => {
  if (!req.query.namainstansi) res.sendStatus(404);
  const { namainstansi } = req.query;
  const instansi = [...instansiManager.semuaInstansi].find(instansi => instansi.nama == namainstansi);
  if (instansi) {
    res.render("waiting-room", { instansi });
  } else {
    res.sendStatus(404);
  }
});

app.post("/get-antrian", (req, res) => {
  const { namaInstansi, socketId } = req.body;
  const instansi = [...instansiManager.semuaInstansi].find(instansi => instansi.nama == namaInstansi);
  if (!instansi) res.sendStatus(404);
  const nomorAntrian = instansi.antrianManager.buatNomorAntrian(socketId);
  io.to(namaInstansi).emit("update-room", { 
    panjangAntrian: instansi.antrianManager.getPanjangAntrian(),
    terlayani: instansi.antrianManager.totalCustomerTerlayani
  })
  res.status(200).json({
    nomor: nomorAntrian.nomorAntrian,
    sisaAntrian: nomorAntrian.nomorAntrian - instansi.antrianManager.totalCustomerTerlayani - 1,
    uCode: nomorAntrian.uCode
  })
})

app.post("/get-ucode", (req, res) => {
  const { namaInstansi, socketId, uCode } = req.body;
  const instansi = [...instansiManager.semuaInstansi].find(instansi => instansi.nama == namaInstansi);
  if (!instansi) res.sendStatus(404);
  const nomorAntrian = instansi.antrianManager.getNomorAntrianByUCode(uCode, socketId)
  if (nomorAntrian) {
    res.status(200).json({
      nomor: nomorAntrian,
      sisaAntrian: nomorAntrian - instansi.antrianManager.totalCustomerTerlayani - 1,
      uCode: uCode
    })
  } else {
    res.sendStatus(404)
  }
})

app.get("/lobby", (req, res) => {
  const kind = req.query.m;
  const namaInstansi = req.query.i;
  if (req.query.cs) {
    res.render("lobby", { kind, namaInstansi, csPeerId: req.query.cs });
  } else {
    res.render("lobby", { kind, namaInstansi });
  }
});

io.on("connection", socket => {
  socket.on("join-room", roomId => {
    socket.join(roomId);
    socket.on("call-customer", ({ csPeerId, namaInstansi }) => {
      const instansi = [...instansiManager.semuaInstansi].find(instansi => instansi.nama == namaInstansi);
      const customer = instansi.antrianManager.semuaCustomer.shift();
      const cSocketId = customer.socketId;
      const cSocket = io.sockets.sockets.get(cSocketId);
      cSocket.emit("call-cs", csPeerId);
    });
    socket.on("exit-lobby", ({ to }) => {
      const remoteSocket = io.sockets.sockets.get(to)
      if (remoteSocket) remoteSocket.emit("exit-lobby", { from: socket.id });
    })
    socket.on("exit-lobby-now", ({ to }) => {
      const remoteSocket = io.sockets.sockets.get(to)
      if (remoteSocket) remoteSocket.emit("exit-lobby-now");
    })
    socket.on("info-accepted", ({ to }) => {
      const remoteSocket = io.sockets.sockets.get(to)
      if (remoteSocket) remoteSocket.emit("info-accepted")
    })
  });
});

server.listen(PORT, () => console.log(`[server.js] Server is listening in PORT: ${PORT}`));