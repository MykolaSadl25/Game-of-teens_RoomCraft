const room = document.getElementById("room-canvas");
const items = document.querySelectorAll(".planner__item");

// Handle dragging furniture from sidebar
items.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", item.dataset.type);
  });
});

// Allow dropping into room
room.addEventListener("dragover", (e) => {
  e.preventDefault();
});

room.addEventListener("drop", (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData("text/plain");

  const img = document.createElement("img");
  img.src = `../img/${type}.webp`;
  img.alt = type;
  img.classList.add("furniture");
  img.style.position = "absolute";

  // Calculate position relative to room
  const roomRect = room.getBoundingClientRect();
  const left = e.clientX - roomRect.left;
  const top = e.clientY - roomRect.top;
  img.style.left = `${left}px`;
  img.style.top = `${top}px`;

  makeDraggable(img);
  room.appendChild(img);
});

// Allow dragging inside the room
function makeDraggable(el) {
  el.addEventListener("mousedown", function (e) {
    e.preventDefault();

    const roomRect = room.getBoundingClientRect();
    const shiftX = e.clientX - el.getBoundingClientRect().left;
    const shiftY = e.clientY - el.getBoundingClientRect().top;

    function moveAt(clientX, clientY) {
      const newX = clientX - roomRect.left - shiftX;
      const newY = clientY - roomRect.top - shiftY;

      el.style.left = `${newX}px`;
      el.style.top = `${newY}px`;
    }

    function onMouseMove(e) {
      moveAt(e.clientX, e.clientY);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener(
      "mouseup",
      function () {
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );
  });

  // Prevent image from being draggable by browser
  el.ondragstart = () => false;
}
