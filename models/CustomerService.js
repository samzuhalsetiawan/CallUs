import { v4 as uuidV4 } from 'uuid';
import Instansi from './Instansi';

export default class CustomerService {
  /**
   * @type {string} UID
   */
  #uid;
  /**
   * @type {string}
   */
  #nama;
  /**
   * @type {string}
   */
  #email;
  /**
   * @type {string}
   */
  peerId;
  /**
   * @type {string}
   */
  socketId;
  /**
   * @type {Instansi}
   */
  #instansiTerkait;
  /**
   * 
   * @param {string} nama 
   * @param {string} email 
   * @param {Instansi} instansi
   */
  constructor(nama, email, instansi) {
    this.#nama = nama;
    this.#email = email;
    this.#instansiTerkait = instansi;
    this.#uid = uuidV4();
  }
  getUid() {
    return this.#uid;
  }
  getEmail() {
    return this.#email;
  }
  getNama() {
    return this.#nama;
  }
  getInstansiTerkait() {
    return this.#instansiTerkait;
  }
}