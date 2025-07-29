const room = document.getElementById("room-canvas");
const items = document.querySelectorAll(".planner__item");

// Make palette items draggable and set drag data
items.forEach((item) => {
  item.setAttribute('draggable', 'true');
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", item.dataset.type);
  });
});

// Allow drop inside the room
room.addEventListener("dragover", (e) => {
  e.preventDefault();
});

// On drop, create new furniture image inside the room
room.addEventListener("drop", (e) => {
  e.preventDefault();

  const type = e.dataTransfer.getData("text/plain");
  if (!type) return;

  const img = document.createElement("img");
  img.src = `../img/${type}.webp`;
  img.alt = type;
  img.classList.add("furniture");

  img.style.position = "absolute";

  // Position relative to container using offsetX/Y (good for drop)
  img.style.left = `${e.offsetX}px`;
  img.style.top = `${e.offsetY}px`;

  // Disable native drag for the furniture image
  img.setAttribute('draggable', 'false');

  makeDraggable(img);
  enableRightClickDelete(img);

  room.appendChild(img);
});

function makeDraggable(el) {
  el.addEventListener("mousedown", function (e) {
    if (e.button !== 0) return; // Left click only
    e.preventDefault();

    const roomRect = room.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const shiftX = e.clientX - elRect.left;
    const shiftY = e.clientY - elRect.top;

    function moveAt(clientX, clientY) {
      const left = clientX - roomRect.left - shiftX;
      const top = clientY - roomRect.top - shiftY;

      // Optional: clamp to stay inside the room boundaries
      const maxLeft = room.clientWidth - el.offsetWidth;
      const maxTop = room.clientHeight - el.offsetHeight;

      el.style.left = Math.min(Math.max(0, left), maxLeft) + "px";
      el.style.top = Math.min(Math.max(0, top), maxTop) + "px";
    }

    function onMouseMove(e) {
      moveAt(e.clientX, e.clientY);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );
  });

  // Prevent default dragstart native behavior
  el.ondragstart = () => false;
}

function enableRightClickDelete(el) {
  el.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // Prevent default menu
    el.remove(); // Delete element on right click
  });
}
