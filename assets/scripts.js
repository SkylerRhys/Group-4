const rootEl = document.getElementById('comicData');
const formSubmit = document.getElementById('submit');
const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
const comicCards = document.getElementsByClassName('card');
var onSubmit =  document.querySelector("#submit");


// Open detail page on card click
function openDetailPage(e) {

    const characterCard = e.target.parentElement;
    const characterName = characterCard.querySelector('p').textContent; 
    const characterId = characterCard.id; 

    
    console.log(`Character ID: ${characterId}, Character Name: ${characterName}`);

    // Store both character ID and name
    localStorage.setItem('characterId', JSON.stringify(characterId)); // Storing ID for comic details
    localStorage.setItem('characterName', characterName); // Storing name for movie queries

    window.location.href = "./detailed.html"; 

    console.log(e.target.parentElement.id);
    localStorage.setItem('characterId', JSON.stringify(e.target.parentElement.id));
}

// Use local storage to save cards
function addToLocalStorage(e) {
    button = e.currentTarget;
    console.log(savedItems);
    savedItems.push(e.target.parentElement.id);
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
    button.replaceWith('Saved');
}

let offset = 0;
const limit = 5;

// Pull Marvel Api
function getMarvelApi() {
    const userInput = document.getElementById('userInput'); // pull from form
    const marvelApiStart = "https://gateway.marvel.com:443/v1/public/characters?"; // Basic start for marvel API
    const marvelPublicKey = '7493e7241069db22273aa9163a8086a6'; 
    const marvelPrivateKey = '0d7504ac031939ac69865b2724e7c563a6dcadc4';
    const nameStartsWith = userInput.value; 
    const ts = new Date().getTime();
    const hash = md5(ts + marvelPrivateKey + marvelPublicKey); // create a hash which the marvel API requires
    let requestUrl;

    if (nameStartsWith === '') { 
        requestUrl = marvelApiStart + "apikey=" + marvelPublicKey + "&ts=" + ts 
        + "&hash=" + hash + `&offset=${offset}&limit=${limit}`; 
    } else { 
        requestUrl = marvelApiStart + "nameStartsWith=" + nameStartsWith + "&apikey=" + marvelPublicKey + "&ts=" + ts 
        + "&hash=" + hash + `&offset=${offset}&limit=${limit}`;
    }
    

    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        const characterResults = data.data.results;
        console.log(characterResults);
        
        for (const character of characterResults) { // Make cards based on the Fetch
            const comicCard = document.createElement('div');
            comicCard.setAttribute('class', 'card');
            comicCard.setAttribute('id', character.id);

            const imgTag = document.createElement('img');
            imgTag.setAttribute('src', `${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`);
            imgTag.setAttribute('class', 'comicImage');

            const characterName = document.createElement('p');
            characterName.textContent = character.name;
            
            const saveButton = document.createElement('button');
            saveButton.textContent = "Save";

            const alreadySaved = document.createElement('p');
            alreadySaved.textContent = "Saved";

            rootEl.append(comicCard);
            comicCard.append(imgTag);
            comicCard.append(characterName);
            if (savedItems.indexOf(comicCard.id) !== -1) {
                comicCard.append(alreadySaved);
            } else {
                comicCard.append(saveButton);
                saveButton.addEventListener('click', addToLocalStorage);
            }
           
            imgTag.addEventListener('click', openDetailPage);
        }
    })
    
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });

 //   userInput.value = '';

}

// Navigation Function to see Search Results
function showNextCharacters() {
    offset += limit;
    console.log('Offset after increment:', offset);
    clearComicCards();
    getMarvelApi();
}

function showPreviousCharacters() {
    if (offset >= limit) {
        offset -= limit;
        console.log('Offset after decrement:', offset);
        clearComicCards();
        getMarvelApi();
    }
}

document.getElementById('leftButton').addEventListener('click', showPreviousCharacters);
document.getElementById('rightButton').addEventListener('click', showNextCharacters);

// This function clears the cards to populate the next or prev results.
function clearComicCards() {
    while (rootEl.firstChild) {
        rootEl.removeChild(rootEl.firstChild);
    }
}

function handleFormSubmit(event) {
    event.preventDefault();

    while (rootEl.firstChild) { // Clear page
        rootEl.removeChild(rootEl.firstChild);
    }
    
    getMarvelApi();
}


formSubmit.addEventListener('click', handleFormSubmit);

document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitForm();
    }
});

function submitForm() {
    document.getElementById("submit").click();
}

getMarvelApi();

onSubmit.addEventListener("click", function () {
    var closeButton = document.querySelector(".btn-close");
    closeButton.click();
});

