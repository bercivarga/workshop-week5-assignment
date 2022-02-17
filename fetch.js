// Variables /////////////////////////////////////////////////

//URL variables
const API_URL_BASE = "https://pokeapi.co/api/v2/pokemon"
let limit = 9
let page = 1
let totalPages = 0
let urlNext = ''
let urlPrev = ''

//Single Pokemon details
let pokemonDetails = ''

//Fetching DOM-elements
let pokemonList = document.querySelector('.pokemonList')
let filterPrevious = document.querySelector('.previous')
let filterNext = document.querySelector('.next')
let filterCounter = document.querySelector('.counter')
let searchBar = document.querySelector('.search')
let submitSearchButton = document.querySelector('.submit')
let resetSearchButton = document.querySelector('.reset')


// functions /////////////////////////////////////////////////

//Retrieve Pokemon list
function retrieveAllPokemon(Url) {
    pokemonList.classList.add('loading')
    pokemonList.innerHTML = ''
    fetch(Url)
    .then(function(response) {
        if (response.status != '200') {
            throw new Error('Bad response')
        }
        let data = response.json()
        return data
    })
    .then(function(data) {
        //setting attributes
        total = Math.ceil(data.count / limit)
        filterCounter.innerHTML = `${page} of ${total}`
        urlNext = data.next
        urlPrev = data.previous

        //parsing data per pokemon
        for (let i = 0; i < data.results.length; i++) {
            pokemonName = `${data.results[i].name}`
            pokemonList.innerHTML += `
                <div class='pokemon ${pokemonName}'></div>
                `
            retrievePokemon(`${API_URL_BASE}/${pokemonName}`, pokemonName)
        }

        //setting next and previous buttons
        if (data.previous !== null) {
            filterPrevious.innerHTML = "<button class='filter previous'>Previous</button>"
        } else {
            filterPrevious.innerHTML = ''
        }
        if (data.next !== null) {
            filterNext.innerHTML = "<button class='filter next'>Next</button>"
        } else {
            filterNext.innerHTML = ''
        }
        
    })
    .then(function() {
        pokemonList.classList.remove('loading')
    })
    .catch(function(error) {
        console.error(error)
        console.log('An error has occured')
        pokemonList.innerHTML = `
            <h1>Bad request</h1>`
    }) 
}

// Retrieve one Pokemon
function retrievePokemon(Url, pokemonName) {
    fetch(Url)
    .then(function(response) {
        if (response.status != '200') {
            throw new Error('Bad response')
        }
        let data = response.json()
        return data
    })
    .then(function(data) {
        let pokemonElement = document.querySelector(`.${pokemonName}`)
        pokemonElement.innerHTML += `
            <img src=${data.sprites.front_default}></img>
            <div class='name'>${data.name} </div>
            <div class='type'>Type: ${data.types[0].type.name}</div>` 
    })
    .catch(function(error) {
        console.error(error)
        console.log('Pokemon not found!')
        pokemonList.innerHTML = `
            <h1>Not found!</h1>`
    }) 
}

//Retrieve by search
function retrievePokemonSearch(searchValue) {
    pokemonList.innerHTML = `<div class='pokemon ${searchValue}'></div>`
    retrievePokemon(`${API_URL_BASE}/${searchValue}`, searchValue)
}

//Reset search
function resetSearch() {
    searchBar.value = ''
    initialCall()
}

//Next page
function nextPage() {
    retrieveAllPokemon(urlNext)
    page += 1
}

//Previous page
function previousPage () {
    retrieveAllPokemon(urlPrev)
    page -= 1
}

function initialCall() {
    retrieveAllPokemon(`${API_URL_BASE}?limit=${limit}`)
}

//Setting filter button event listeners
filterNext.addEventListener(
    'click',
    function() {nextPage()}
)

filterPrevious.addEventListener(
    'click',
    function() {previousPage()}
)

submitSearchButton.addEventListener(
    'click',
    function() {retrievePokemonSearch(searchBar.value)}
)


resetSearchButton.addEventListener(
    'click',
    function() {resetSearch()}
)
// Initial calls /////////////////////////////////////////////////
initialCall()