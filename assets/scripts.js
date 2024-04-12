const rootEl = document.getElementById('comicData');
console.log(rootEl);
function getMarvelApi() {

    const marvelApiStart = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=thanos&orderBy=modified&apikey=";
    const marvelPublicKey = '7493e7241069db22273aa9163a8086a6';
    const marvelPrivateKey = '0d7504ac031939ac69865b2724e7c563a6dcadc4';
    const name = 'thor';
    const ts = new Date().getTime();
    const hash = md5(ts + marvelPrivateKey + marvelPublicKey);
    const requestUrl = marvelApiStart + marvelPublicKey + "&ts=" + ts 
        + "&hash=" + hash;
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        const characterResults = data.data.results;
        console.log(characterResults);
        
        for (const character of characterResults) {
            const comicCard = document.createElement('div');
            comicCard.setAttribute('class', 'card');

            const imgTag = document.createElement('img');
            imgTag.setAttribute('src', `${character.thumbnail.path}.${character.thumbnail.extension}`);
            imgTag.setAttribute('class', 'comicImage');

            const characterName = document.createElement('p');
            characterName.textContent = character.name;
            rootEl.append(comicCard);
            comicCard.append(imgTag);
            comicCard.append(characterName);
        }
    })

}
getMarvelApi();

document.addEventListener('DOMContentLoaded', function() {
    const divs = document.querySelectorAll('.selectable');
    let selectedIndex = 0;

    function updateSelectedDiv() {
        divs.forEach(div => {
            div.classList.remove('highlighted');
        });

        divs[selectedIndex].classList.add('highlighted');
    }

    function selectLeft() {
        selectedIndex = (selectedIndex - 1 + divs.length) % divs.length;
        console.log('Left button clicked. selectedIndex:', selectedIndex);
        updateSelectedDiv();
    }

    function selectRight() {
        selectedIndex = (selectedIndex + 1) % divs.length;
        console.log('Right button clicked. selectedIndex:', selectedIndex);
        updateSelectedDiv();
    }

    document.getElementById('leftButton').addEventListener('click', selectLeft);
    document.getElementById('rightButton').addEventListener('click', selectRight);

    updateSelectedDiv();
});