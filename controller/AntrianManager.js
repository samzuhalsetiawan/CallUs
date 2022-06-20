import Antrian from "../models/Antrian";
import Customer from "../models/Customer";

export default class AntrianManager {
  /**
   * @type {number}
   */
  #panjangAntrian = 0;
  /**
   * @type {number}
   */
  #totalCustomerTerlayani = 0;
  /**
   * @type {number}
   */
  #nomorAntrianSaatIni = 1;
  /**
   * @type {Set<string>}
   */
  #customersUID = new Set();
  /**
   * @type {Set<Customer>}
   */
  #customers = new Set();
  /**
   * 
   * @returns {string} UID
   */
  #generateUid() {
    const posible = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let newUid = "";
    for (let i = 0; i < 4; i++) {
      newUid += posible[Math.floor(Math.random() * posible.length)];
    }
    return newUid;
  }
  /**
   * 
   * @param {Set<string>} exclude UID yg sudah pernah ada
   * @return {string} UID
   */
  #generateUidBesides(exclude) {
    let newUid = this.#generateUid();
    while (exclude.has(newUid)) {
      newUid = this.#generateUid();
    }
    return newUid;
  }
  #getAntrianUID() {
    return this.#generateUidBesides(this.#customersUID);
  }
  #createNomorAntrian() {
    this.#panjangAntrian++
    return this.#panjangAntrian;
  }
  getAllCustomerUID() {
    return this.#customersUID;
  }
  getAllCustomer() {
    return this.#customers;
  }
  getPanjangAntrian() {
    return this.#panjangAntrian;
  }
  /**
   * 
   * @param {Customer} customer 
   */
  #addCustomer(customer) {
    this.#customers.add(customer);
  }
  /**
   * 
   * @param {string} username 
   * @returns {Customer}
   */
  createCustomer(username) {
    const uid = this.#getAntrianUID();
    const nomorAntrian = this.#createNomorAntrian();
    const antrian = new Antrian(nomorAntrian, uid);
    const customer = new Customer(username, antrian);
    this.#addCustomer(customer);
    return customer;
  }
  getTotalCustomerTerlayani() {
    return this.#totalCustomerTerlayani;
  }
  incrementTotalCustomerTerlayani() {
    this.#totalCustomerTerlayani++;
    return this.#totalCustomerTerlayani;
  }
  getNomorAntrianSaatIni() {
    return this.#nomorAntrianSaatIni;
  }
  incrementNomorAntrianSaatIni() {
    this.#nomorAntrianSaatIni++;
    return this.#nomorAntrianSaatIni;
  }
  /**
   * 
   * @param {number} nomorAntrian 
   */
  getCustomerByNomorAntrian(nomorAntrian) {
    return [...this.#customers].find(customer => customer.getAntrian().nomorAntrian === nomorAntrian);
  }
  /**
   * 
   * @param {Customer} customer 
   */
  deleteCustomer(customer) {
    this.#customersUID.delete(customer.getAntrian().uid);
    return this.#customers.delete(customer);
  }
}