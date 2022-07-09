const { v4: uuidV4 } = require("uuid");

class Admin {
  /**
   * 
   * @param {string} nama 
   * @param {string} email 
   */
  constructor(nama, email) {
    this.nama = nama;
    this.email = email;
    this.id = uuidV4();
  }
}

module.exports = { Admin }