const rootEl = document.getElementById('data');
console.log(rootEl);
function getMarvelApi() {

    const marvelApiStart = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=spider&apikey=";
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
        
        for (const character of data) {
            const imgTag = document.createElement('img');
            imgTag.setAttribute('src', `${character.data.results.thumbnail.path}.jpg`);
            rootEl.append(imgTag);
        }
    })

}
getMarvelApi();