export function toggleHamburgerButton() {
  const button = document.querySelector(".hamburger-button-container");
  const drawer = document.querySelector(".main-nav-drawer");
  button.classList.toggle("hamburger-menu-opened");
  drawer.classList.toggle("main-nav-drawer-active");
  document.body.classList.toggle("body-overflow-hidden");
}