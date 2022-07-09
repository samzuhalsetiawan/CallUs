const { v4: uuidV4 } = require("uuid");

class CustomerService {
  /**
   * 
   * @param {string} nama 
   * @param {string} email 
   */
  constructor(nama, email) {
    this.nama = nama;
    this.email = email;
    this.uid = uuidV4();
  }
}

module.exports = { CustomerService }