export default function masukDenganKodeAntrian(namaInstansi, socketId) {
  /**
   * @type {HTMLDialogElement}
   */
  const dialog = document.getElementById("masuk-dengan-kode-dialog")
  dialog.showModal()
  document.getElementById("uCode-submit").addEventListener("click", async function(ev) {
    ev.preventDefault()
    /**
     * @type {string}
     */
    let uCode = document.getElementById("uCode").value
    uCode = uCode.toUpperCase()
    const res = await fetch("/get-ucode", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        namaInstansi, socketId, uCode
      })
    });
    if (res.status == 200) {
      const data = await res.json();
      document.querySelector(".info-antrian.sisa span").textContent = data.sisaAntrian;
      document.querySelector(".nomor-antrian p:nth-child(2)").textContent = data.nomor;
      document.querySelector(".uniq-number").textContent = `Kode Antrian: ${data.uCode}`
      document.querySelector(".slider").classList.add("slide");
    }
    dialog.close()
  })
}