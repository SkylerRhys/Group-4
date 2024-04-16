const detailRoot = document.getElementById('characterDetails');
const comicRoot = document.getElementById('characterComics');
const characterId = JSON.parse(localStorage.getItem('characterId'));

function appendCharacterDetails() {
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
            const imgTag = document.createElement('img');
            imgTag.setAttribute('src', `${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`);
            imgTag.setAttribute('class', 'titleImage');

            const charDescription = document.createElement('div');
            charDescription.setAttribute('id', 'charDescription');

            const h1Tag = document.createElement('h1');
            h1Tag.textContent = character.name;

            const pTag = document.createElement('p');
            pTag.textContent = character.description || "No Data Available";
            
            detailRoot.append(imgTag);
            charDescription.append(h1Tag);
            charDescription.append(pTag);
            detailRoot.append(charDescription);
        }
    });
}

function appendCharacterComics() {
    const comicsUrlStart = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?`
    const marvelPublicKey = '7493e7241069db22273aa9163a8086a6';
    const marvelPrivateKey = '0d7504ac031939ac69865b2724e7c563a6dcadc4';
    const ts = new Date().getTime();
    const hash = md5(ts + marvelPrivateKey + marvelPublicKey);
    const comicsUrl = comicsUrlStart + "apikey=" + marvelPublicKey + "&ts=" + ts 
    + "&hash=" + hash;

    fetch(comicsUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        const comicsResults = data.data.results;
        console.log(comicsResults);

        for (const comic of comicsResults) {
            const comicCard = document.createElement('div');
            comicCard.setAttribute('class', 'card');
            comicCard.setAttribute('id', comic.id);

            const imgTag = document.createElement('img');
            imgTag.setAttribute('src', `${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`);
            imgTag.setAttribute('class', 'comicImage');

            const comicName = document.createElement('p');
            comicName.textContent = comic.title;
            comicRoot.append(comicCard);
            comicCard.append(imgTag);
            comicCard.append(comicName);
        }
    })
}
appendCharacterDetails();
appendCharacterComics();