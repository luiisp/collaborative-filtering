const loadConfigs = () => {
    configs = {
        "api_route": document.getElementById('api-r').getAttribute('value') || "/api/movies",
    }
}



const getModelMovies = async () => {
    const response = await fetch("/api/movies");
    const data = await response.json();
    return data;
}

const getMoviesThumbnail = async (movieTitle) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1b0b2c1b4c6d0f9e9d4b7e5c2b9c3b9e&query=${movieTitle}`);
    const data = await response.json();
    return data;
}



const init = () => {
    
    

    const randomMovies = getModelMovies().then((movies) => {
        console.log(movies);
    
    
    });        
    popupDisplayAndHide("up",wait=.1, {title: "Hello Stranger"}).then((res) => {
        popupDisplayAndHide("up",wait=.2, {title: "Let's get started?"})
    });
    

};

document.addEventListener("DOMContentLoaded", () => {
    loadConfigs();
    init();
});