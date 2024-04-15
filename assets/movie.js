const movieApiKey = 'api_key=922557ff91daa7a52711e45eba6cf97b';
const movieBaseUrl = 'https://api.themoviedb.org/3/';
const userRequest = document.getElementById("userRequest");
const movieApiUrl = `${movieBaseUrl}discover/movie?sort_by-popularity.desc&${movieApiKey}`;
const moviePosterUrl= 'https://image.tmdb.org/t/p/w500/';
const userRequestValueUrl = `${movieBaseUrl}search/movie?sort_by-popularity.desc&${movieApiKey}`
const main = document.getElementById('main');
const form = document.getElementById('form');


getMovies(movieApiUrl);

function getMovies(url) {

    fetch(url).then(response => response.json()).then(data => {
        console.log(data.results);

        showMovies(data.results);
    })

}


function showMovies(data){
    main.innerHTML = ' ';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie')
        movieEl.innerHTML =`
        <img  src="${moviePosterUrl+poster_path}" alt="${title}"
                />

                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getVoteColor(vote_average)}">${vote_average}</span>
                </div>

                <div class="overview">

                    <h3>overview</h3>
                    ${overview}
                    </div>
        `
        
        main.appendChild(movieEl);


    });

}

function getVoteColor(vote){

    if(vote >=8) 
        return 'green'
    else if(vote >= 5)
        return 'orange'
    else{
        return 'red'
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const userRequestValue = userRequest.value

    if(userRequestValue) {
        getMovies(userRequestValueUrl+'&query='+userRequestValue)
    }

})