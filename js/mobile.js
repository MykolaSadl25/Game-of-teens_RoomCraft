(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-mobile-open]"),
    closeModalBtn: document.querySelector("[data-mobile-close]"),
    modal: document.querySelector("[data-mobile]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
    refs.modal.classList.toggle("is-visible");
    document.body.classList.toggle("no-scroll");
  }

  // Close menu on link click
  const menuLinks = refs.modal.querySelectorAll(".mobile__link");
  menuLinks.forEach(link =>
    link.addEventListener("click", () => {
      refs.modal.classList.add("is-hidden");
      refs.modal.classList.remove("is-visible");
      document.body.classList.remove("no-scroll");
    })
  );
})();
