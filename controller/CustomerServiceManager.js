import { v4 as uuidV4 } from 'uuid';
import CustomerService from '../models/CustomerService';

export default class CustomerServiceManager {
  /**
   * @type {string} UID
   */
  #uid;
  /**
   * @type {Set<CustomerService>}
   */
  #listCustomerService = new Set();
  constructor() {
    this.#uid = uuidV4();
  }
  /**
   * 
   * @returns {Set<CustomerService>}
   */
  getAllCustomerService() {
    return this.#listCustomerService;
  }
  /**
   * 
   * @param {CustomerService} customerService 
   */
  addCustomerService(customerService) {
    this.#listCustomerService.add(customerService);
  }
  /**
   * 
   * @param {CustomerService} customerService 
   */
  removeCustomerService(customerService) {
    this.#listCustomerService.delete(customerService);
  }
  /**
   * 
   * @param {string} email 
   */
  getCustomerServiceByEmail(email) {
    return [...this.#listCustomerService].find(customerService => customerService.getEmail() === email);
  }
  /**
   * 
   * @param {string} name
   */
  getCustomerServiceByName(name) {
    return [...this.#listCustomerService].find(customerService => customerService.getNama() === name);
  }
}