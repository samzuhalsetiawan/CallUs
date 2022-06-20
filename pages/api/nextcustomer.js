import InstansiManager from "../../controller/InstansiManager";

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { instansi: namainstansi } = req.query;
    const instansi = InstansiManager.getInstansiByName(namainstansi);
    if (!instansi) { res.status(500).json({ error: "Instansi Tidak ditemukan" }); return; }
    const nomorAntrian = instansi.getNomorAntrianSaatIni();
    const customer = instansi.getCustomerByNomorAntrian(nomorAntrian);
    if (!customer) { res.status(500).json({ error: "Customer tidak ditemukan" }); return; }
    instansi.incrementNomorAntrianSaatIni();
    const peerId = customer.peerId;
    const socketId = customer.socketId;
    if (!peerId) { 
      res.status(500).json({ error: "Peer belum diset" });
    } else {
      res.status(200).json({ peerId, socketId, nomorAntrian });
    }
  } else {
    res.status(404).json({ error: "Not Found" });
  }
}