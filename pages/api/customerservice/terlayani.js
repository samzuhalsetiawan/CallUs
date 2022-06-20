import InstansiManager from "../../../controller/InstansiManager";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { nomorAntrian, namaInstansi } = req.body;
    if (nomorAntrian && namaInstansi) {
      const instansi = InstansiManager.getInstansiByName(namaInstansi);
      if (!instansi) { res.status(500).json({ error: "Instansi tidak ditemukan" }); return }
      const terlayani = instansi.confirmCustomerTerlayani(nomorAntrian);
      if (terlayani) {
        res.status(200).json({ result: "ok" });
      } else {
        res.status(500).json({ error: "Customer Not Found" });
      }
    } else {
      res.status(500).json({ error: "body nomorAntrian dan namaInstansi needed" });
    }
  } else {
    res.status(404).json({ error: "Not Found" });
  }
}