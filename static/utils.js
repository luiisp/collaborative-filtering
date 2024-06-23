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
const createMovieElement = (title, thumbnail,id) => {

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.id = "m-"+id;
   

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

const pointerEventsMovies = (mode) => {
    const moviesDiv = document.querySelector('.movies-list');
    if (mode === null || mode === undefined) {
        moviesDiv.style.pointerEvents = "none";
        moviesDiv.style.opacity = "0.5";
    }else{
        moviesDiv.style.pointerEvents = "auto";
        moviesDiv.style.opacity = "1";
    }
};

const addMovieToList = (movie) => {
    const moviesList = document.querySelector('.movies-list');
    const movieElement = createMovieElement(movie.title,movie.thumbnailUrl,movie.id);
    createPopup(movie.title,movie.plot, movie.id);
    movieElement.addEventListener('click', () => {
      console.log(movie.id);
      pointerEventsMovies(null);
        let popup = document.getElementById("popup-"+movie.id);

        console.log(popup);
        popup.style.display = "flex";
        popup.classList.add('fast-in');
        setTimeout(() => {
          popup.classList.remove('fast-in');
        }, 500);
    });

    moviesList.appendChild(movieElement);
    movieElement.classList.add('fade-in');
    setTimeout(() => {
        movieElement.classList.remove('fade-in');
    }, 1000);
}

const addNewMovies = async (moviesObj) => {
  moviesObj.forEach((movie) => {
        addMovieToList(movie);
    });
}

const clearMovies = () => {
    const moviesList = document.querySelector('.movies-list');
    movies = []
    moviesList.innerHTML = '';
}

function createStar(mark, id) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'star-'+id;
  svg.classList.add('star');
  svg.classList.add('star-marked');
  svg.setAttribute('mark', mark);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('clip-rule', 'evenodd');
  svg.setAttribute('fill', '#FFF');
  svg.setAttribute('stroke-miterlimit', '2');
  svg.setAttribute('stroke-linejoin', 'round');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'm11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z');
  path.setAttribute('fill-rule', 'nonzero');

  svg.appendChild(path);
  return svg;
}

const starActivate = (index,id) => {
  const stars = document.querySelectorAll("#"+'star-'+id);
  stars.forEach((star, i) => {
      if (i <= index) {
          star.classList.remove('star');
          star.classList.add('star-marked');
      } else {
        star.classList.add('star')
          star.classList.remove('star-marked');
      }
  });
}

const confirmRate = (id) => {
  const parent = document.querySelector('#popup-'+id);
  const stars = document.querySelectorAll("#"+'star'+id);
  let mark = 0;
  stars.forEach((star, i) => {
      if (star.classList.contains('star-marked')) {
          mark = i + 1;
      }
  });
  
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  movies[movieIndex].stars = mark;
  console.log(movies,movies[movieIndex]);
  parent.style.display = "none";
  pointerEventsMovies(true);
};

const confirmRates = () => {
  if (movies.length === 0) {
      return;
  }

  const sendObj = movies.map((movie) => {
      return {
          id: movie.id,
          stars: movie.stars || 0
      };
  });

  console.table(sendObj);
  clearMovies();
  
  popupDisplayAndHide("up",wait=.3, {title: "Your preferences are great, now we are going to recommend you some things"}).then((res) => {
    if (recommendations.length === 0) {
        popupDisplayAndHide("up",wait=.3, {title: "Visit the official repository at github.com/luiisp/collaborative-filtering"}).then((res) => {
            msgsDisplayBooks("This is taking longer than expected");
        });
    }
});

};

function createPopup(title, desc, id) {
  const popupDiv = document.createElement('div');
  popupDiv.id = "popup-"+id;
  popupDiv.classList.add('popup');

  const h1 = document.createElement('h1');
  h1.textContent = `Rate the film "${title}"`;

  const rateDesc = document.createElement('p');
  rateDesc.classList.add('rate-desc');
  rateDesc.textContent = desc;

  const starsDiv = document.createElement('div');
  starsDiv.classList.add('stars');
  for (let i = 0; i < 5; i++) {
      const starSVG = createStar(0, id); 
      starsDiv.appendChild(h1)
      starsDiv.appendChild(starSVG);
      starSVG.addEventListener('click', () => {
          starActivate(i,id);
      });
  }


  const rateError = document.createElement('p');
  rateError.classList.add('rate-error');
  rateError.textContent = 'You must rate the film';

  const confirmBtn = document.createElement('button');
  confirmBtn.classList.add('rate-btn');
  confirmBtn.textContent = 'Confirm';
  confirmBtn.addEventListener('click', () => confirmRate(id))

  popupDiv.appendChild(h1);
  popupDiv.appendChild(rateDesc);
  popupDiv.appendChild(starsDiv);
  popupDiv.appendChild(rateError);
  popupDiv.appendChild(confirmBtn);


  popupDiv.style.display = "none";
  document.querySelector(".rate-popup").appendChild(popupDiv);
 
}


