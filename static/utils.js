const up = (mode, args) => {
  const { title = "Default", load = false } = args;
  const popup = document.querySelector(".up");
  const titleUp = popup.querySelector("h1");
  const loader = popup.querySelector(".loader");

  if (load) {
    loader.style.display = "flex";
  } else if (loader) {
    loader.style.display = "none";
  }

  titleUp.innerText = title;
  if (mode === "in") {
    popup.style.display = "flex";
    popup.classList.add("fade-in");
    setTimeout(() => {
      popup.classList.remove("fade-in");
    }, 800);
  } else if (mode === "out") {
    popup.classList.add("fade-out");
    setTimeout(() => {
      popup.classList.remove("fade-out");
      popup.style.display = "none";
    }, 800);
  }
};

const popup = (type, mode, args = {}) => {
  const modes = ["in", "out", "none"];
  const popupTypes = {
    up: up,
  };
  if (!popupTypes[type] || !mode) throw new Error("Invalid popup type or mode");
  if (!modes.includes(mode)) throw new Error("Invalid popup mode");
  popupTypes[type](mode, args);
};
