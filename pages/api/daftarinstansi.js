import InstansiManager from "../../controller/InstansiManager";
import Admin from "../../models/Admin";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const {
      namaInstansi,
      namaAdmin,
      emailAdmin,
      customerServices
    } = req.body;
    const admin = new Admin(namaAdmin, emailAdmin);
    const instansi = InstansiManager.createInstansi(namaInstansi, admin);
    if (instansi) {
      customerServices.forEach(customerService => {
        const { nama, email } = customerService;
        instansi.addCustomerService(nama, email);
      });
      res.status(200).json({
        instansiUid: instansi.getUid()
      });
    } else {
      res.status(500).json({
        error: "Nama Instansi Sudah Pernah Ada"
      })
    }
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
}