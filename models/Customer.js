const { Antrian } = require("./Antrian");
const { v4: uuidV4 } = require("uuid");

class Customer {
  /**
   * 
   * @param {Antrian} antrian
   * @param {string} socketId 
   */
  constructor(antrian, socketId) {
    this.antrian = antrian;
    this.id = uuidV4();
    this.socketId = socketId;
  }
}

module.exports = { Customer }