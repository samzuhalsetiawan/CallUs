import InstansiManager from "../../../controller/InstansiManager";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { namaInstansi, nomorAntrian, peerId, socketId } = req.body;
    const instansi = InstansiManager.getInstansiByName(namaInstansi);
    if (!instansi) { res.status(500).json({ error: "Instansi tidak ditemukan" }); return; }
    const customer = instansi.getCustomerByNomorAntrian(nomorAntrian);
    if (!customer) { res.status(500).json({ error: "Customer tidak ditemukan" }); return; }
    customer.peerId = peerId;
    customer.socketId = socketId;
    res.status(200).json({ peerId });
  } else {
    res.status(404).json({ error: "Not Found" });
  }
}