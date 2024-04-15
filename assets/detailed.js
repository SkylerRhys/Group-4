const detailRoot = document.getElementById('characterDetails');

function appendCharacterDetails() {
    const characterId = JSON.parse(localStorage.getItem('characterId'));
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
            imgTag.setAttribute('src', `${character.thumbnail.path}.${character.thumbnail.extension}`);
            imgTag.setAttribute('class', 'titleImage');

            const h1Tag = document.createElement('h1');
            h1Tag.textContent = character.name;

            const pTag = document.createElement('p');
            pTag.textContent = character.description;
            
            detailRoot.append(imgTag);
            detailRoot.append(h1Tag);
            detailRoot.append(pTag);
        }
    });
}

appendCharacterDetails();