// Storing API keys and base URL
const movieApiKey = 'api_key=922557ff91daa7a52711e45eba6cf97b';
const movieBaseUrl = 'https://api.themoviedb.org/3/';

// Grabbing elements from the DOM.
const userRequest = document.getElementById("userRequest");
const main = document.getElementById('main');
const form = document.getElementById('form');

// URLs for API requests.
const movieApiUrl = `${movieBaseUrl}search/movie?sort_by=popularity.desc&${movieApiKey}`;
const moviePosterUrl = 'https://image.tmdb.org/t/p/w500/';
const userRequestValueUrl = `${movieBaseUrl}search/movie?sort_by=popularity.desc&${movieApiKey}`;

document.addEventListener('DOMContentLoaded', function() {
    const characterName = localStorage.getItem('characterName');
    if (characterName) {
        getMovies(`${movieBaseUrl}search/movie?sort_by=popularity.desc&${movieApiKey}&query=${encodeURIComponent(characterName)}`);
    } else {
        console.log('No character name found in local storage.');
    }
});

// Initial call to get popular movies when the page loads.
getMovies(movieApiUrl);

// Function to fetch movie data from the API.
function getMovies(url) {
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        main.innerHTML = '<p>Failed to load movies. Please try again later.</p>';
    });
}

// Function to display movie data on the page.
function showMovies(data) {
    main.innerHTML = '';  // Clear the main container first
    let moviesHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        moviesHTML += `
        <div class="movie">
            <img src="${moviePosterUrl + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getVoteColor(vote_average)}">${vote_average.toFixed(2)}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        </div>`;
    });

    main.innerHTML = moviesHTML;  // Update the DOM once with the complete HTML string
}

// Function to determine the color of the vote average score based on its value.
function getVoteColor(vote) {
    if (vote >= 8) {
        return 'green';  // High score, shows green.
    } else if (vote >= 5) {
        return 'orange';  // Okay score, shows orange.
    } else {
        return 'red';  // Low score, shows red.
    }
}

// Event listener for form submission to search movies.
form.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent the form reseting.

    const userRequestValue = userRequest.value;  // Get the user input.

    // Make a new API request with the user's search term if it's not empty.
    if (userRequestValue) {
        getMovies(`${userRequestValueUrl}&query=${encodeURIComponent(userRequestValue)}`);
    }
});
