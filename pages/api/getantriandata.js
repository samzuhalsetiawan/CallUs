import InstansiManager from "../../controller/InstansiManager";

export default function handler(req, res) {
  const { namainstansi } = req.query;
  const instansi = InstansiManager.getInstansiByName(namainstansi);
  const totalAntrian = instansi.getPanjangAntrian();
  const totalterlayani = instansi.getTotalCustomerTerlayani();
  const nomorAntrianSaatIni = instansi.getNomorAntrianSaatIni();
  res.status(200).json({ totalAntrian, totalterlayani, nomorAntrianSaatIni });
}