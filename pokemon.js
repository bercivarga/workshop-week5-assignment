
var _pokeList;
var _pokemon;
starturl = "https://pokeapi.co/api/v2/pokemon/?limit=30"
getList(starturl)
var shown = 50

document.addEventListener("scroll", function (event) {
    console.log(window.pageYOffset + window.innerHeight + "-" + document.scrollingElement.scrollHeight)
    if (window.pageYOffset + window.innerHeight === document.scrollingElement.scrollHeight) {
        getList(_pokeList.next)
    }
});

function updatePage(pokeList) {
    const main = document.getElementById("plist");
    numberOfResults = pokeList.results.length
    for (let i = 1; i < numberOfResults; i++) {
        const para = document.createElement("div");
        let position = pokeList.results[i]['url'].search("pokemon/")
        let pokemonNumbertemp = pokeList.results[i]['url'].substring(position + 8);
        let pokemonNumber = pokemonNumbertemp.slice(0, -1)
        para.classList.add('card', 'pokemon' + pokemonNumber);
        const node = document.createTextNode(pokeList.results[i]['name']);
        para.appendChild(node);
        main.appendChild(para);
        getPokemon(pokeList.results[i]['url'], pokemonNumber);
    }
}

function getList(url) {
    const retrieve =
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    retrieve
        .then(function (response) {
            const processingPromise = response.json();
            return processingPromise;
        })
        .then(function (pokeList) {
            _pokeList = pokeList //debug
            updatePage(pokeList)
            console.log(pokeList);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}


function getPokemon(url, number) {
    const retrieve =
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    retrieve
        .then(function (response) {
            const processingPromise1 = response.json();
            return processingPromise1;
        })
        .then(function (pokemon) {
            _pokemon = pokemon //debug
            const pokemonElement = document.getElementsByClassName("pokemon" + number);
            var x = document.createElement("IMG");
            x.setAttribute("src", pokemon['sprites']['front_default']);
            x.classList.add('pokemonImg');
            pokemonElement[0].appendChild(x);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

