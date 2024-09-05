const modalWrap = document.querySelector(".backdrop");

function getScrollBarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

function openModal() {
  modalWrap.classList.remove("visually-hidden");
  document.body.style.paddingRight = getScrollBarWidth() + "px";
  document.body.style.overflow = "hidden";

  modalWrap.addEventListener("click", onBackdropClick);
  window.addEventListener("keydown", onEscKey);
}
function onBackdropClick(e) {
  if (e.currentTarget === e.target) closeModal();
}
function onEscKey(e) {
  if (e.code === "Escape") closeModal();
}
function closeModal() {
  modalWrap.classList.add("visually-hidden");
  modalWrap.innerHTML = "";
  document.body.removeAttribute("style");
  modalWrap.removeEventListener("click", onBackdropClick);
  window.removeEventListener("keydown", onEscKey);
}

export default openModal;
