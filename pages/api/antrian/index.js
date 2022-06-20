import InstansiManager from "../../../controller/InstansiManager";

export default function handler(req, res) {
  const { namainstansi } = req.query;
  if (namainstansi) {
    const instansi = InstansiManager.getInstansiByName(namainstansi);
    const panjangAntrian = instansi.getPanjangAntrian();
    const totalCustomerTerlayani = instansi.getTotalCustomerTerlayani();
    res.status(200).json({ panjangAntrian, totalCustomerTerlayani });
  } else {
    res.status(500).json({ error: "query (namainstansi) dibutuhkan" });
  }
}