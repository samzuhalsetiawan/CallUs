import InstansiManager from "../../controller/InstansiManager";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { nama, namainstansi } = req.body;
    const instansi = InstansiManager.getInstansiByName(namainstansi);
    if (instansi) {
      const customer = instansi.createCustomer(nama);
      res.status(200).json({ nomorAntrian: customer.getAntrian().nomorAntrian, antrianUid: customer.getAntrian().uid });
    } else {
      res.status(500).json({
        error: "Instansi Tidak Ditemukan"
      });
    }
  } else {
    res.status(404).json({ error: "Not Found" });
  }
}