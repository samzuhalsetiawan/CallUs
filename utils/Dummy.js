

//////////////////////////////////////////////////
// for development purpose only

const { InstansiManager } = require("../manager/InstansiManager");
const { Admin } = require("../models/Admin");
const { CustomerService } = require("../models/CustomerService");
const { Instansi } = require("../models/Instansi");

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

/**
 * 
 * @param {InstansiManager} instansiManager 
 */
function createDummyInstansi(instansiManager) {
  dummyinstansis.forEach(dummyinstansi => {
    const admin = new Admin(dummyinstansi.namaAdmin, dummyinstansi.emailAdmin);
    const instansi = new Instansi(dummyinstansi.namaInstansi, admin);
    instansi.logoUrl = "/img" + dummyinstansi.imgUrl;
    dummyinstansi.customerServices.forEach(customerService => {
      const { nama, email } = customerService;
      instansi.semuaCustomerService.add(new CustomerService(nama, email));
    });
    instansiManager.semuaInstansi.add(instansi);
  });
}

module.exports = createDummyInstansi;

////////////////////////////////////////////////////
// End of for Development purpose only
////////////////////////////////////////////////////