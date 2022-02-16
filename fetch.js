// Variables /////////////////////////////////////////////////

//URL variables
const API_URL_BASE = "https://pokeapi.co/api/v2/pokemon"
let limit = 100
let offset = 0
let API_URL_COMPILED = `${API_URL_BASE}?limit=${limit}&offset=${offset}`
const promise = fetch(API_URL_COMPILED)
console.log(API_URL_COMPILED)

//Fetching DOM-elements
let pokemonList = document.getElementsByClassName('pokemonList')
pokemonList = pokemonList[0] //
console.log(pokemonList)

// Fetching data /////////////////////////////////////////////////
promise
    .then(function(response) {
        if (response.status != '200') {
            throw new Error('Bad response')
        }
        const data = response.json()
        return data
    })
    .then(function(data) {
        for (let i = 0; i < data.results.length; i++) {
            console.log(data.results[i].name)
            pokemonList.innerHTML += `<div>${data.results[i].name}</div>`
        }
    })
    .catch(function(error) {
        console.error(error)
        console.log('test error')
        pokemonList.innerHTML = `
            <h1>Bad request</h1>`
    }) 


// pokemonList.innerHTML = `
// <img src=${data.icon_url}></img>
// <h1>${value}</h1>`