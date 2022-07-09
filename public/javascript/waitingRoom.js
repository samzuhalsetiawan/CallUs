import { ambilAntrian } from './modules/ambilAntrianButton.mjs'
import masukDenganKodeAntrian from './modules/masukDenganKodeAntrian.js';

/**
 * @type {HTMLDivElement}
 */
const slider = document.querySelector(".slider");
const namaInstansi = slider.dataset.instansi;
const socket = io();
socket.on("connect", () => {
  socket.emit("join-room", namaInstansi);
});
socket.on("update-room", ({ panjangAntrian, terlayani }) => {
  document.querySelector(".info-antrian.sisa span").textContent = parseInt(document.querySelector(".nomor-antrian p:nth-child(2)").textContent) - terlayani - 1;
  document.querySelector(".detail-antrian .info p:nth-child(2)").textContent = panjangAntrian;
});

document.querySelector(".ambil-antrian button").addEventListener("click", () => ambilAntrian(namaInstansi, socket.id));

socket.on("call-cs", csPeerId => {
  /**
   * @type {HTMLDialogElement}
   */
  const modal = document.querySelector(".dialog-container");
  modal.dataset.cspeerid = csPeerId;
  modal.showModal();
});

document.querySelector(".info-antrian").addEventListener("click", function() {
  masukDenganKodeAntrian(namaInstansi, socket.id)
})