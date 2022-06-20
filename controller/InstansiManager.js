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
  static createInstansi(nama, admin) {
    if (this.getInstansiByName(nama)) return;
    const newInstansi = new Instansi(nama, admin);
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
const dummyinstansi = {
  namaInstansi: "SamZ Group",
  namaAdmin: "SamZ",
  emailAdmin: "sam@test.com",
  customerServices: [
    {
      nama: "cs1",
      email: "cs1@test.com"
    },
    {
      nama: "cs2",
      email: "cs2@test.com"
    }
  ]
}
const admin = new Admin(dummyinstansi.namaAdmin, dummyinstansi.emailAdmin);
const instansi = InstansiManager.createInstansi(dummyinstansi.namaInstansi, admin);
if (instansi) {
  dummyinstansi.customerServices.forEach(customerService => {
    const { nama, email } = customerService;
    instansi.addCustomerService(nama, email);
  });
}
////////////////////////////////////////////////////
// End of for Development purpose only
////////////////////////////////////////////////////