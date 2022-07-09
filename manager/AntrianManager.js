const { v4: uuidV4 } = require("uuid");
const { Customer } = require("../models/Customer");
const { NomorAntrian } = require("../models/NomorAntrian");
const { Antrian } = require('../models/Antrian')

class AntrianManager {
  constructor() {
    this.id = uuidV4();
  }
  panjangUCode = 4;
  /**
   * @type {number}
   */
  totalCustomerTerlayani = 0;
  /**
   * @type {number}
   */
  nomorAntrianTersedia = 0;
  /**
   * @type {Array<Customer>}
   */
  semuaCustomer = new Array();
  /**
   * @type {Set<string>}
   */
  uCodePool = new Set()
  /**
   * @type {Set<NomorAntrian>}
   */
  listNomorAntrian = new Set()
  /**
   * 
   * @param {string} socketId 
   * @returns 
   */
  buatNomorAntrian(socketId) {
    const nomor = ++this.nomorAntrianTersedia;
    const uCode = this.generateUCode()
    const nomorAntrian = new NomorAntrian(nomor, uCode)
    this.listNomorAntrian.add(nomorAntrian)
    this.semuaCustomer.push(new Customer(new Antrian(nomor), socketId));
    return nomorAntrian;
  }
  getPanjangAntrian() {
    return this.nomorAntrianTersedia - this.totalCustomerTerlayani;
  }
  generateUCode() {
    const posible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    let uCode = ""
    do {
      for (let i = 0; i < this.panjangUCode; i++) {
        const randomIndex = Math.floor(Math.random() * posible.length)
        uCode += posible.charAt(randomIndex)
      }
    } while(this.uCodePool.has(uCode))
    this.uCodePool.add(uCode)
    return uCode
  }
  /**
   * 
   * @param {string} uCode 
   * @param {string} socketId
   * @returns nomor antrian
   */
  getNomorAntrianByUCode(uCode, socketId) {
    const nomorAntrian = [...this.listNomorAntrian].find(nomorAntrian => nomorAntrian.uCode == uCode)
    if (nomorAntrian) {
      const customer = this.semuaCustomer.find(customer =>  customer.antrian.nomor == nomorAntrian.nomorAntrian)
      customer.socketId = socketId
    }
    return nomorAntrian?.nomorAntrian
  }
}

module.exports = { AntrianManager }