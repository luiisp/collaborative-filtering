movies = [];
recommendations = []; 

const loadConfigs = () => {
    configs = {
        "api_route":infoKey("api-r") || "/api/movies",
        "omdb_key": infoKey("api-k") || "YOUR_OMDB_API_KEY"
    }
}



const getModelMovies = async (count) => {
    const response = await fetch(`${configs.api_route}/movies/random?count=${count}`);
    const data = await response.json();
    return data;
}

const fetchMovieInfo = async (movieTitle) => {
    try {
      const omdbApiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${configs.omdb_key}`;
      const response = await fetch(omdbApiUrl);
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('error: ', error);
      return null;
    }
  };

  const cleanMovieTitle = (title) => {
    if (title.includes(',')) return title.split(',')[0];
    if (title.includes(':')) return title.split(':')[0];
    if (title.includes('(')) return title.split('(')[0];
    if (title.includes('.')) return title.split('.')[0];
    if (title.includes('.')) return title.split('.')[0];
    if (title.includes('-')) return title.split('-')[0];
    if (title.includes(' . ')) return title.split(' . ')[0];
    return title.replace(/\s*\(\d+\)/, ''); 
  };
  
  const getMoviesInfo = async (moviesObj) => {
    try {
      const moviesInfo = [];
  

      for (const movieId in moviesObj) {
        if (moviesObj.hasOwnProperty(movieId)) {
          const movieTitle = moviesObj[movieId].title;
          const cleanTitle = cleanMovieTitle(movieTitle);
          console.log(cleanTitle);
          const movieInfo = await fetchMovieInfo(cleanTitle);
          if (movieInfo && movieInfo.Response === 'True') {
            const movie = {
              title: movieInfo.Title,
              releaseDate: movieInfo.Released,
              thumbnailUrl: movieInfo.Poster,
              plot: movieInfo.Plot,
              imdbRating: movieInfo.imdbRating,
              id: movieId,
              stars: 0,
            };
            moviesInfo.push(movie);
          } else {
            console.error(`Not found '${movieTitle}' -> ${cleanTitle}.`);
            notLoadMsg(true)
          }
        }
      }
  
      return moviesInfo;
    } catch (error) {
      return [];
    }
  };

const noOpnion = () => {
    callNewMovies();
    notLoadMsg(false);
    msgsDisplayBooks("I'm glad you told us that... let's start again but with something different now");


 
  };
  

const att = () =>{
    const moviesBtn = document.querySelector('.movies-btn');
    const regenBtn = document.querySelector('.regen');
    regenBtn.addEventListener('click',noOpnion);
    moviesBtn.addEventListener('click',confirmRates )
}

const callNewMovies = () => {
    clearMovies();
    updateTitle("Getting movies");
    const randomMovies = getModelMovies(3).then((moviesObj) => {
        getMoviesInfo(moviesObj).then((moviesInfo) => {
            updateTitle("Rate these movies");
            movies = moviesInfo;
            addNewMovies(movies);
        });
        
    });       
}

const msgsDisplayBooks = (msg1) =>{
    popupDisplayAndHide("up",wait=.4, {title: msg1}).then((res) => {
        if (movies.length === 0) {
            popupDisplayAndHide("up",wait=.3, {title: "We're getting everything ready for you!"}).then((res) => {
                if (movies.length === 0) {
                    popupDisplayAndHide("up",wait=.3, {title: "we are experiencing instability at the moment.. shall we try again?"}).then((res) => {
                        clearMovies();
                        msgsDisplayBooks("Starting all over again, let's hope it works out");
                    });
                }
            });
         
        }
    });
}

const init = () => {
    
    
    callNewMovies();
    msgsDisplayBooks("Hello Stranger!, Let's get started? ")

    

};

document.addEventListener("DOMContentLoaded", () => {
    updateTitle("Getting movies");
    loadConfigs();
    att();
    init();
});