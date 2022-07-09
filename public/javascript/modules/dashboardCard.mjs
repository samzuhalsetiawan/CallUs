/**
 * 
 * @param {MouseEvent} ev 
 * @param {HTMLDivElement} card 
 */
export function cardClickHandler(ev, card) {
  card.classList.toggle("card-expand");
}

export function btnOpenCSDialog(button) {
  /**
   * @type {HTMLDialogElement}
   */
  const dialog = document.querySelector(".dialog-cs");
  dialog.dataset.instansi = button.dataset.instansi;
  dialog.showModal();
}

/**
 * 
 * @param {HTMLButtonElement} button 
 */
export function pindahKeWaitingRoom(button) {
  const namaInstansi = button.dataset.instansi;
  window.location = `/waitingroom?namainstansi=${namaInstansi}`;
}