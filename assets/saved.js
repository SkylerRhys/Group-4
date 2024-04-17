const savedCardsRoot = document.getElementById('savedCards');
const savedCards = JSON.parse(localStorage.getItem('savedItems'));
console.log(savedCards);

function savedDetail(e) {
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

function handleDelete(e) {
    characterCard = e.target.parentElement;
    savedCards.pop(characterCard.id);
    localStorage.setItem('savedItems', JSON.stringify(savedCards));
    while (savedCardsRoot.firstChild) {
        savedCardsRoot.removeChild(savedCardsRoot.firstChild);
    }
    parseArray();
}

function addSavedCards(characterId) {
    const characterUrlStart = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?`
    const marvelPublicKey = '7493e7241069db22273aa9163a8086a6';
    const marvelPrivateKey = '0d7504ac031939ac69865b2724e7c563a6dcadc4';
    const ts = new Date().getTime();
    const hash = md5(ts + marvelPrivateKey + marvelPublicKey);
    const characterUrl = characterUrlStart + "apikey=" + marvelPublicKey + "&ts=" + ts 
    + "&hash=" + hash;

    fetch(characterUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        const characterResults = data.data.results;
        console.log(characterResults);

        for (const character of characterResults) {

            const savedCard = document.createElement('div');
            savedCard.setAttribute('class', 'userCards card');
            savedCard.setAttribute('id', characterId);

            const imgTag = document.createElement('img');
            imgTag.setAttribute('src', `${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`);
            imgTag.setAttribute('class', 'titleImage');

            const name = document.createElement('p');
            name.textContent = character.name;

            const button = document.createElement('button');
            button.textContent = 'Delete';
            
            savedCard.append(imgTag);
            savedCard.append(name);
            savedCard.append(button);
            savedCardsRoot.append(savedCard);

            imgTag.addEventListener('click', savedDetail);
            button.addEventListener('click', handleDelete);
        }
    });
}

function parseArray() {
    for (const id of savedCards) {
        addSavedCards(id);
    }
}

parseArray();