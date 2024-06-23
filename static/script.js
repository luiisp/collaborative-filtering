movies = [];

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
      console.error('Erro ao buscar informações do filme:', error);
      return null;
    }
  };

  const cleanMovieTitle = (title) => {
    if (title.includes(',')) return title.split(',')[0];
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
              imdbRating: movieInfo.imdbRating
            };
            moviesInfo.push(movie);
          } else {
            console.error(`Not found '${movieTitle}' -> ${cleanTitle}.`);
          }
        }
      }
  
      return moviesInfo;
    } catch (error) {
      return [];
    }
  };
  

const init = () => {
    
    

    const randomMovies = getModelMovies(3).then((moviesObj) => {
        getMoviesInfo(moviesObj).then((moviesInfo) => {
            movies = moviesInfo;
        });
        console.log(moviesObj);
    
    
    });        
    popupDisplayAndHide("up",wait=.1, {title: "Hello Stranger"}).then((res) => {
        popupDisplayAndHide("up",wait=.2, {title: "Let's get started?"}).then((res) => {
            movies.forEach((movie) => {
                addMovieToList(movie.title, movie.thumbnailUrl);
                setTimeout(() => {
                    
                }, 300);
            });
        })
    });
    

};

document.addEventListener("DOMContentLoaded", () => {
    updateTitle("Getting movies");
    loadConfigs();
    init();
});