import Admin from "../models/Admin";
import Instansi from "../models/Instansi";

export default class InstansiManager {
  /**
   * @type {Set<Instansi>}
   */
  static #allInstansi = new Set();
  /**
   * 
   * @param {Instansi} instansi 
   */
  static #addInstansi(instansi) {
    this.#allInstansi.add(instansi);
  }
  /**
   * 
   * @param {Instansi} instansi 
   */
  static #removeInstansi(instansi) {
    this.#allInstansi.delete(instansi);
  }
  /**
   * 
   * @param {string} name 
   */
  static getInstansiByName(name) {
    return [...this.#allInstansi].find(instansi => instansi.getNamaInstansi() == name);
  }
  /**
   * 
   * @param {string} nama 
   * @param {Admin} admin
   * @return {Instansi}
   */
  static createInstansi(nama, imgUrl, admin) {
    if (this.getInstansiByName(nama)) return;
    const newInstansi = new Instansi(nama, imgUrl, admin);
    admin.addInstansi(newInstansi);
    this.#addInstansi(newInstansi);
    return newInstansi;
  }
  /**
   * 
   * @param {string} name 
   */
  static removeInstansiByName(name) {
    const instansi = this.getInstansiByName(name);
    if (!instansi) return;
    this.#removeInstansi(instansi);
  }
  static getAllInstansi() {
    return this.#allInstansi;
  }
}


//////////////////////////////////////////////////
// for development purpose only
///////////////////////////////////////////////////
const dummyinstansis = [
  {
    namaInstansi: "Kementrian Tenaga Kerja",
    imgUrl: "/img0.png",
    namaAdmin: "Admin",
    emailAdmin: "admin@test.com",
    customerServices: [
      {
        nama: "Adam Buana",
        email: "admin1@test.com"
      },
      {
        nama: "Agus Prawito",
        email: "admin2@test.com"
      },
      {
        nama: "Cahyono",
        email: "admin3@test.com"
      },
      {
        nama: "Bagus Budi",
        email: "admin4@test.com"
      },
      {
        nama: "Eka Putri",
        email: "admin5@test.com"
      },
      {
        nama: "Rayhan",
        email: "admin6@test.com"
      }
    ]
  },
  {
    namaInstansi: "Puskesmas Karang Rejo",
    imgUrl: "/img1.png",
    namaAdmin: "Admin",
    emailAdmin: "admin@test.com",
    customerServices: [
      {
        nama: "Adam Buana",
        email: "admin1@test.com"
      },
      {
        nama: "Agus Prawito",
        email: "admin2@test.com"
      },
      {
        nama: "Cahyono",
        email: "admin3@test.com"
      },
      {
        nama: "Bagus Budi",
        email: "admin4@test.com"
      },
      {
        nama: "Eka Putri",
        email: "admin5@test.com"
      },
      {
        nama: "Rayhan",
        email: "admin6@test.com"
      }
    ]
  },
  {
    namaInstansi: "Kelurahan Sempaja",
    imgUrl: "/img2.png",
    namaAdmin: "Admin",
    emailAdmin: "admin@test.com",
    customerServices: [
      {
        nama: "Adam Buana",
        email: "admin1@test.com"
      },
      {
        nama: "Agus Prawito",
        email: "admin2@test.com"
      },
      {
        nama: "Cahyono",
        email: "admin3@test.com"
      },
      {
        nama: "Bagus Budi",
        email: "admin4@test.com"
      },
      {
        nama: "Eka Putri",
        email: "admin5@test.com"
      },
      {
        nama: "Rayhan",
        email: "admin6@test.com"
      }
    ]
  },
  {
    namaInstansi: "Xiaomi Service Center",
    imgUrl: "/img3.png",
    namaAdmin: "Admin",
    emailAdmin: "admin@test.com",
    customerServices: [
      {
        nama: "Adam Buana",
        email: "admin1@test.com"
      },
      {
        nama: "Agus Prawito",
        email: "admin2@test.com"
      },
      {
        nama: "Cahyono",
        email: "admin3@test.com"
      },
      {
        nama: "Bagus Budi",
        email: "admin4@test.com"
      },
      {
        nama: "Eka Putri",
        email: "admin5@test.com"
      },
      {
        nama: "Rayhan",
        email: "admin6@test.com"
      }
    ]
  },
  {
    namaInstansi: "Kominfo",
    imgUrl: "/img4.png",
    namaAdmin: "Admin",
    emailAdmin: "admin@test.com",
    customerServices: [
      {
        nama: "Adam Buana",
        email: "admin1@test.com"
      },
      {
        nama: "Agus Prawito",
        email: "admin2@test.com"
      },
      {
        nama: "Cahyono",
        email: "admin3@test.com"
      },
      {
        nama: "Bagus Budi",
        email: "admin4@test.com"
      },
      {
        nama: "Eka Putri",
        email: "admin5@test.com"
      },
      {
        nama: "Rayhan",
        email: "admin6@test.com"
      }
    ]
  },
  {
    namaInstansi: "Kemendikbud",
    imgUrl: "/img5.png",
    namaAdmin: "Admin",
    emailAdmin: "admin@test.com",
    customerServices: [
      {
        nama: "Adam Buana",
        email: "admin1@test.com"
      },
      {
        nama: "Agus Prawito",
        email: "admin2@test.com"
      },
      {
        nama: "Cahyono",
        email: "admin3@test.com"
      },
      {
        nama: "Bagus Budi",
        email: "admin4@test.com"
      },
      {
        nama: "Eka Putri",
        email: "admin5@test.com"
      },
      {
        nama: "Rayhan",
        email: "admin6@test.com"
      }
    ]
  }
] 

dummyinstansis.forEach(dummyinstansi => {
  const admin = new Admin(dummyinstansi.namaAdmin, dummyinstansi.emailAdmin);
  const instansi = InstansiManager.createInstansi(dummyinstansi.namaInstansi, dummyinstansi.imgUrl, admin);
  if (instansi) {
    dummyinstansi.customerServices.forEach(customerService => {
      const { nama, email } = customerService;
      instansi.addCustomerService(nama, email);
    });
  }
});
////////////////////////////////////////////////////
// End of for Development purpose only
////////////////////////////////////////////////////