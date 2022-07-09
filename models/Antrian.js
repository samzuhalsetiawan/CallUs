const { v4: uuidV4 } = require("uuid");

class Antrian {
  /**
   * 
   * @param {number} nomorAntrian 
   */
  constructor(nomorAntrian) {
    /**
     * @type {number}
     */
    this.nomor = nomorAntrian;
    /**
     * @type {string}
     */
    this.id = uuidV4();
  }
}

module.exports = { Antrian }