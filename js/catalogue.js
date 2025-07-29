document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".catalog__add-btn");

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      // Save to localStorage or send to planner
      let selected = JSON.parse(localStorage.getItem("selectedFurniture")) || [];
      selected.push(type);
      localStorage.setItem("selectedFurniture", JSON.stringify(selected));

      alert(`${type} added to planner!`);
    });
  });
});
