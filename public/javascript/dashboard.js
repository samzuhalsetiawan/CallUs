import { cardClickHandler, btnOpenCSDialog, pindahKeWaitingRoom } from './modules/dashboardCard.mjs';

document.querySelectorAll(".card-outer-container").forEach(card => card.addEventListener("click", function(ev) {cardClickHandler(ev, card)}));
document.querySelectorAll(".card-masuk-sebagai button:first-child").forEach(button => button.addEventListener("click", () => btnOpenCSDialog(button)));
document.querySelectorAll(".card-masuk-sebagai button:nth-child(2)").forEach(button => button.addEventListener("click", () => pindahKeWaitingRoom(button)));