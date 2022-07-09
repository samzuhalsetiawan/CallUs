const { Instansi } = require("../models/Instansi");

class InstansiManager {
  constructor() {
    /**
     * @type {Set<Instansi>}
     */
    this.semuaInstansi = new Set();
  }
}

module.exports = { InstansiManager }