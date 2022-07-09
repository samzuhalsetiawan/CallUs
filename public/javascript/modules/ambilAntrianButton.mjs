export async function ambilAntrian(namaInstansi, socketId) {
  const res = await fetch("/get-antrian", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      namaInstansi, socketId
    })
  });
  const data = await res.json();
  document.querySelector(".info-antrian.sisa span").textContent = data.sisaAntrian;
  document.querySelector(".nomor-antrian p:nth-child(2)").textContent = data.nomor;
  document.querySelector(".uniq-number").textContent = `Kode Antrian: ${data.uCode}`
  document.querySelector(".slider").classList.add("slide");
}