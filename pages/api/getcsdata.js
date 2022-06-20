import InstansiManager from "../../controller/InstansiManager";

export default function handler(req, res) {
  const { namainstansi } = req.query;
  const instansi = InstansiManager.getInstansiByName(namainstansi);
  const banyakcs = instansi.getAllCustomerService().size;
  res.status(200).json({ banyakCS: banyakcs });
}