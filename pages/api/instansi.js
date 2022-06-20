import InstansiManager from "../../controller/InstansiManager";

export default function handler(req, res) {
  const allInstansi = InstansiManager.getAllInstansi();
  const data = [...allInstansi].map(instansi => {
    return {
      namaInstansi: instansi.getNamaInstansi()
    }
  });
  res.status(200).json({ instansi: data })
}