const { v4: uuidV4 } = require("uuid");
const { AntrianManager } = require("../manager/AntrianManager");
const { Admin } = require("./Admin");
const { CustomerService } = require("./CustomerService");

class Instansi {
  /**
   * 
   * @param {string} nama 
   * @param {Admin} admin 
   */
  constructor(nama, admin) {
    this.nama = nama;
    this.admin = admin;
    this.id = uuidV4();
    this.logoUrl = "/lp_icon.png";
    this.antrianManager = new AntrianManager();
  }
  /**
   * @type {Set<CustomerService>}
   */
  semuaCustomerService = new Set();
}

module.exports = { Instansi }