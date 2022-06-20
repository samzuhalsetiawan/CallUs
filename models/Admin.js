import { v4 as uuidV4 } from 'uuid';
import Instansi from './Instansi';

export default class Admin {
  /**
   * @type {string} UID
   */
  #uid;
  /**
   * @type {string} Nama Admin
   */
  #nama;
  /**
   * @type {string} Email Admin
   */
  #email;
  /**
   * @type {Set<Instansi>}
   */
  #listInstansi = new Set();
  /**
   * 
   * @param {string} nama 
   * @param {string} email 
   */
  constructor(nama, email) {
    this.#nama = nama;
    this.#email = email;
    this.#uid = uuidV4();
  }
  /**
   * 
   * @returns {Set<Instansi>}
   */
  getAllInstansi() {
    return this.#listInstansi;
  }
  /**
   * 
   * @param {Instansi} instansi 
   */
  addInstansi(instansi) {
    this.#listInstansi.add(instansi);
  }
  /**
   * 
   * @param {Instansi} instansi 
   */
  removeInstansi(instansi) {
    this.#listInstansi.delete(instansi);
  }
  getNamaAdmin() {
    return this.#nama;
  }
}