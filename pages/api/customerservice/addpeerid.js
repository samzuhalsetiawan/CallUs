import InstansiManager from "../../../controller/InstansiManager";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { namainstansi, namacs, peerId, socketId } = req.body;
    const instansi = InstansiManager.getInstansiByName(namainstansi);
    if (!instansi) { res.status(500).json({ error: "Instansi tidak ditemukan" }); return; }
    const customerService = instansi.getCustomerServiceByName(namacs);
    if (!customerService) { res.status(500).json({ error: "Customer Service tidak ditemukan" }); return; }
    customerService.peerId = peerId;
    customerService.socketId = socketId;
    res.status(200).json({ peerId });
  } else {
    res.status(404).json({ error: "Not Found" });
  }
}