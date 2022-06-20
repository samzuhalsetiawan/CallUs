import InstansiManager from "../../controller/InstansiManager";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const {
      namaInstansi,
      email
    } = req.body;
    function doVerification(email) { 
      //TODO: Not yet implamanted
      return true;
    }
    const instansi = InstansiManager.getInstansiByName(namaInstansi);
    if (!instansi) {res.status(500).json({ error: "instansi tidak ditemukan" }); return;}
    const customerService = instansi.getCustomerServiceByEmail(email);
    if (!customerService) {res.status(500).json({ error: "Customer Service tidak ditemukan" }); return;}
    const isVerified = doVerification(customerService.getEmail());
    if (isVerified) {
      res.status(200).json({ 
        namaCS: customerService.getNama(),
        namaInstansi: customerService.getInstansiTerkait().getNamaInstansi()
      });
    } else {
      res.status(500).json({ error: "Not Verified" });
    }
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
}