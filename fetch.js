// Variables /////////////////////////////////////////////////

//URL variables
const API_URL_BASE = "https://pokeapi.co/api/v2/pokemon"
let limit = 100
let objectCounter = 100
let resultCount = 0
let total = 0
let urlNext = ''
let urlPrev = ''


//Fetching DOM-elements
let pokemonList = document.querySelector('.pokemonList')
let filterPrevious = document.querySelector('.previous')
let filterNext = document.querySelector('.next')
let filterCounter = document.querySelector('.counter')



// functions /////////////////////////////////////////////////

//Fetching data
function retrievePokemon(Url) {
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
        console.log(data)
        total = data.count
        resultCount = data.results.length
        console.log(resultCount)
        filterCounter.innerHTML = `${objectCounter} of ${total}`
        urlNext = data.next
        urlPrev = data.previous
        for (let i = 0; i < data.results.length; i++) {
            pokemonList.innerHTML += `<div class='pokemon'>${data.results[i].name}</div>`
        }

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
    .catch(function(error) {
        console.error(error)
        console.log('test error')
        pokemonList.innerHTML = `
            <h1>Bad request</h1>`
    }) 
}

//Next page
function nextPage() {
    retrievePokemon(urlNext)
    console.log(objectCounter)
    console.log(resultCount)
    objectCounter += resultCount
}

//Previous page
function previousPage () {
    retrievePokemon(urlPrev)
    objectCounter -= resultCount
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

// Initial calls /////////////////////////////////////////////////

retrievePokemon(`${API_URL_BASE}?limit=${limit}`)