
const app = {};

app.init = function () {

    app.getArt('horse');

    app.eventListener();

};

app.key = "B7ZioCTY";

app.url = "https://www.rijksmuseum.nl/api/en/collection";

app.getArt = (search) => {

    const apiUrl = new URL(app.url);

    apiUrl.search = new URLSearchParams({
      key: app.key,
      p: 10,
      ps: 50,
      q: search,
      imgonly : true
    });

    fetch(apiUrl)
    .then((result) => {
        if(result.ok) {
            return result.json();
        } else {
            return new Error ('Sorry, the API is down now!')
        }
    })
    .then((jsonResult) => {
        console.log(jsonResult);

        document.querySelector("#artwork").innerHTML = "";
        app.displayArt(jsonResult.artObjects);
    })

}


app.displayArt = (artsWeGet) => {

    artsWeGet.forEach((arts) => {
      const title = document.createElement("h2");

      title.textContent = arts.title;

      const artist = document.createElement("P");

      artist.textContent = arts.principalOrFirstMaker;

      const img = document.createElement("img");

        img.alt = arts.longTitle;

        img.src = arts.webImage.url;

    const div = document.createElement('div');

    div.setAttribute('class', 'pieces');

    div.append(title, artist, img);

    document.querySelector("#artwork").append(div);

    })
}

app.eventListener = () => {
    document.querySelector("#animal").addEventListener('change', function(e) {
        e.preventDefault();

        const selectedAnimal = this.value;

        app.getArt(selectedAnimal);

        app.displayTitleChange();

    })
}

app.displayTitleChange = () => {
    const select = document.querySelector("#animal");

    const selectedText = select.selectedOptions[0].textContent;

    document.querySelector('span').innerText = selectedText;
}




app.init();