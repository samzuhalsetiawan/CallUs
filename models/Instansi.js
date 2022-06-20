import AntrianManager from "../controller/AntrianManager";
import CustomerServiceManager from "../controller/CustomerServiceManager";
import { v4 as uuidV4 } from 'uuid';
import Admin from "./Admin";
import Customer from './Customer'
import CustomerService from "./CustomerService";

export default class Instansi {
  /**
   * @type {string} UID
   */
  #uid;
  /**
   * @type {string} Nama Instansi
   */
  #nama;
  /**
   * @type {AntrianManager}
   */
  #antrianManager = new AntrianManager();
  /**
   * @type {CustomerServiceManager}
   */
  #customerServiceManager = new CustomerServiceManager();
  /**
   * @type {Admin} Administrator
   */
  #admin;
  /**
   * 
   * @param {string} nama Nama Instansi
   * @param {Admin} admin Administrator
   */
  constructor(nama, admin) {
    this.#nama = nama;
    this.#admin = admin;
    this.#uid = uuidV4();
  }
  getUid() {
    return this.#uid;
  }
  getNamaInstansi() {
    return this.#nama;
  }
  getPanjangAntrian() {
    return this.#antrianManager.getPanjangAntrian();
  }
  getAllCustomerUID() {
    return this.#antrianManager.getAllCustomerUID();
  }
  getAllCustomer() {
    return this.#antrianManager.getAllCustomer();
  }
  createCustomer(username) {
    return this.#antrianManager.createCustomer(username);
  }
  getAllCustomerService() {
    return this.#customerServiceManager.getAllCustomerService();
  }
  getAdminName() {
    return this.#admin.getNamaAdmin();
  }
  /**
   * 
   * @param {string} nama 
   * @param {string} email 
   * @returns {CustomerService}
   */
  #createCustomerService(nama, email) {
    return new CustomerService(nama, email, this);
  }
  /**
   * 
   * @param {string} nama 
   * @param {string} email 
   */
  addCustomerService(nama, email) {
    const newCustomerService = this.#createCustomerService(nama, email);
    this.#customerServiceManager.addCustomerService(newCustomerService);
  }
  /**
   * 
   * @param {CustomerService} customerService 
   */
  deleteCustomerService(customerService) {
    this.#customerServiceManager.removeCustomerService(customerService);
  }
  /**
   * 
   * @param {string} email 
   * @returns Return customer service instance or undefined if not exist 
   */
  getCustomerServiceByEmail(email) {
    return this.#customerServiceManager.getCustomerServiceByEmail(email);
  }
  /**
   * 
   * @param {string} name
   * @returns Return customer service instance or undefined if not exist 
   */
  getCustomerServiceByName(name) {
    return this.#customerServiceManager.getCustomerServiceByName(name);
  }
  getTotalCustomerTerlayani() {
    return this.#antrianManager.getTotalCustomerTerlayani();
  }
  #incrementTotalCustomerTerlayani() {
    return this.#antrianManager.incrementTotalCustomerTerlayani();
  }
  getNomorAntrianSaatIni() {
    return this.#antrianManager.getNomorAntrianSaatIni();
  }
  incrementNomorAntrianSaatIni() {
    return this.#antrianManager.incrementNomorAntrianSaatIni();
  }
  /**
   * 
   * @param {number} nomorAntrian 
   */
  getCustomerByNomorAntrian(nomorAntrian) {
    return this.#antrianManager.getCustomerByNomorAntrian(nomorAntrian);
  }
  /**
   * 
   * @param {number} nomorAntrian 
   */
  confirmCustomerTerlayani(nomorAntrian) {
    const customer = this.getCustomerByNomorAntrian(nomorAntrian);
    this.#incrementTotalCustomerTerlayani();
    return this.#deleteCostumer(customer);
  }
  /**
   * 
   * @param {Customer} customer 
   */
  #deleteCostumer(customer) {
    return this.#antrianManager.deleteCustomer(customer);
  }
}