import { Server } from 'socket.io';
import ConnectionManager from '../../../controller/ConnectionManager';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    ConnectionManager.io = io;
    res.socket.server.io = io;
    io.on("connection", socket => {
      console.log("[socket api] Socket Connected!: " + socket.id);
      socket.on("calling-remote-socket", ({ from, to }) => {
        const remoteSocket = io.sockets.sockets.get(to);
        remoteSocket.emit("remote-socket-called", { from, to });
      });
      socket.on("send-call-answer", ({ from, to, answer }) => {
        const remoteSocket = io.sockets.sockets.get(to);
        remoteSocket.emit("call-answer-received", { from, to, answer });
      });
      socket.on("calling-for-calling", ({ from, to }) => {
        const remoteSocket = io.sockets.sockets.get(to);
        remoteSocket.emit("calling-for-calling", { from, to });
      });
      socket.on("pelayanan-selesai", ({ from, to }) => {
        const remoteSocket = io.sockets.sockets.get(to);
        remoteSocket.emit("pelayanan-selesai", { from, to });
      });
      socket.on("new-message", ({ from, to, message }) => {
        const remoteSocket = io.sockets.sockets.get(to);
        remoteSocket.emit("new-message", { from, to, message })
      });
      socket.on("join-room", namaInstansi => {
        socket.join(namaInstansi);
      });
    });
  }
  res.status(200).json({ result: 'ok' });
}