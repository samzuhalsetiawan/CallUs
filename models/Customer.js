import Antrian from "./Antrian";
import { v4 as uuiV4 } from 'uuid';

export default class Costumer {
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
  peerId;
  /**
   * @type {string}
   */
  socketId;
  /**
   * @type {Antrian}
   */
  #antrian;
  /**
   * 
   * @param {string} nama 
   * @param {Antrian} antrian 
   */
  constructor(nama, antrian) {
    this.#nama = nama;
    this.#antrian = antrian;
    this.#uid = uuiV4();
  }
  getUid() {
    return this.#uid;
  }
  getNama() {
    return this.#nama;
  }
  getAntrian() {
    return this.#antrian;
  }
}