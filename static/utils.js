const popupDisplayAndHide = (type,wait, args = {}) => {
    
    return new Promise((resolve, reject) => {
        const time = popup(type, "in", args);
        setTimeout(() => {
            const animTime = popup(type, "out", args)
            setTimeout(() => {
                resolve(true);
            }, animTime);
        }, time + (wait * 1000));
    });
} 


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
  const times = {
    in: 1900,
    out: 500,
  }

  titleUp.innerText = title;
  if (mode === "in") {
    popup.style.display = "flex";
    popup.classList.add("fade-in");
    setTimeout(() => {
      popup.classList.remove("fade-in");
    }, times.in);
    return times.in;
  } else if (mode === "out") {
    popup.classList.add("fade-out");
    setTimeout(() => {
      popup.classList.remove("fade-out");
      popup.style.display = "none";
    }, times.out);
    return times.out;
  }else if (mode === "none") {
    popup.style.display = "none";
    return 0;
  }
};

const popup = (type, mode, args = {}) => {
  const modes = ["in", "out", "none"];
  const popupTypes = {
    up: up,
  };
  if (!popupTypes[type] || !mode) throw new Error("Invalid popup type or mode");
  if (!modes.includes(mode)) throw new Error("Invalid popup mode");
  return popupTypes[type](mode, args);
};
