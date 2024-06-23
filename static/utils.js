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

const notLoadMsg = (err) => {
    const txt = document.querySelector(".movies-error")
    if (err){
        txt.style.display = "block";
        txt.innerText = err;
    }else{
        txt.style.display = "none";
    }
};

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
    titleUp.classList.add("fade-in");
    setTimeout(() => {
        titleUp.classList.remove("fade-in");
    }, times.in);
    return times.in;
  } else if (mode === "out") {
    titleUp.classList.add("fade-out");
    setTimeout(() => {
        titleUp.classList.remove("fade-out");
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

const updateTitle = (title) => {
    const split = document.title.split(" : ");
    document.title = split[0] + " : " + title;
    }

const infoKey = (value) =>{
   const i = document.getElementById(value);
   if (i) {
       return i.getAttribute('value') || undefined;
   }else{
       return undefined;
   }
}
const createMovieElement = (title, thumbnail) => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const img = document.createElement('img');
    img.classList.add('movie-img');
    img.src = `${thumbnail}`;
    img.alt = title;

    const titleDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.classList.add('movie-title');
    h2.textContent = title;

    titleDiv.appendChild(h2);
    movieDiv.appendChild(img);
    movieDiv.appendChild(titleDiv);

    return movieDiv;
}

const addMovieToList = (title, thumbnail) => {
    const moviesList = document.querySelector('.movies-list');
    const movieElement = createMovieElement(title, thumbnail);
    moviesList.appendChild(movieElement);
    movieElement.classList.add('fade-in');
    setTimeout(() => {
        movieElement.classList.remove('fade-in');
    }, 1000);
}

const addNewMovies = async (moviesObj) => {
    const moviesInfo = await getMoviesInfo(moviesObj);
    moviesInfo.forEach((movie) => {
        addMovieToList(movie.title, movie.thumbnailUrl);
    });
}

const clearMovies = () => {
    const moviesList = document.querySelector('.movies-list');
    moviesList.innerHTML = '';
}
