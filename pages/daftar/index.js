import { useRouter } from "next/router";
import { useRef } from "react"

export default function Daftar() {
  const router = useRouter();
  const namaInstansiRef = useRef();
  const namaAdminRef = useRef();
  const emailAdminRef = useRef();
  const csDataContainer = useRef();
  const daftarkanInstansi = async () => {
    const namaInstansi = namaInstansiRef.current.value;
    const namaAdmin = namaAdminRef.current.value;
    const emailAdmin = emailAdminRef.current.value;
    const customerServices = [];
    const elNamaCS = csDataContainer.current.getElementsByClassName('nama-cs');
    const elEmailCS = csDataContainer.current.getElementsByClassName('email-cs');
    const allNamaCS = [...elNamaCS].map(el => el.value);
    const allEmailCS = [...elEmailCS].map(el => el.value);
    // Cek jika ada email sama
    if (allEmailCS.length !== (new Set(allEmailCS)).size) {
      console.error("Email tidak boleh ada yang sama!"); //TODO: Handle dengan benar
      return;
    }
    allEmailCS.forEach((email, index) => {
      customerServices.push({ nama: allNamaCS[index], email });
    });
    const response = await fetch(`${location.origin}/api/daftarinstansi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        namaInstansi,
        namaAdmin,
        emailAdmin,
        customerServices
      })
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log("Instansi berhasil dibuat: " + data.instansiUid); //TODO: handle dengan benar
      setTimeout(() => {
        router.push('/');
      }, 5000);
    } else if (response.status === 505) {
      console.error("Terjadi masalah diserver, redirecting to home..."); //TODO: handle dengan benar
    }
  }
  return (
    <div>
      <h1>Ini Halaman Daftar Badan Usaha</h1>
      <p>Nama Instansi Pemerintah / Badan Usaha</p>
      <input ref={namaInstansiRef} type="text" />
      <p>Nama Admin</p>
      <input ref={namaAdminRef} type="text" />
      <p>Email Admin</p>
      <input ref={emailAdminRef} type="text" />
      <div ref={csDataContainer}>
        <p>nama customer service</p>
        <input type="text" className={"nama-cs"} />
        <p>email customer service</p>
        <input type="text" className={"email-cs"} />
      </div>
      <button onClick={daftarkanInstansi}>Submit</button>
    </div>
  )
}