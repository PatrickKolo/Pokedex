let currentPokemon;
let fetchedPokemon = [];
let cardOpened = false;
let currentOpenedPokemon;


/**
 * fetches the API and pushes it into the Array fetchePokemon
 * 
 */
async function loadPokemon() {
    for (let i = 1; i <= 50; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        fetchedPokemon.push(currentPokemon);
        renderAllPokemon(fetchedPokemon, i); 
    }
}


/**
 * renders the pokemon cards
 * 
 * @param {*} fetchedPokemon -the Array with all the pokemon data
 * @param {*} i the index of the the indivual pokemon
 */
function renderAllPokemon(fetchedPokemon, i) {
    let name = fetchedPokemon[i - 1]['name'];
    FinalName = name.charAt(0).toUpperCase() + name.slice(1);
    let Image = fetchedPokemon[i - 1]['sprites']['other']['official-artwork']['front_default'];
    let Types = fetchedPokemon[i - 1]['types']['0']['type']['name']
    FinalTypes = Types.charAt(0).toUpperCase() + Types.slice(1);
    document.getElementById('pokeArea').innerHTML += returnPokemonCardHTML(i, FinalName, Image, FinalTypes);
}


/**
 * generates the searchbar 
 * 
 */
function searchPokemon() {
    document.getElementById('bg').classList.add('fullBgInSearch')
    let search = document.getElementById('searchForPokemon').value;
    search = search.toLowerCase();
    let pokedex = document.getElementById('pokeArea');
    pokedex.innerHTML = '';
    for (let i = 0; i < fetchedPokemon.length; i++) {
        let pokemonName = fetchedPokemon[i]['name'];
        if (pokemonName.toLowerCase().includes(search)) {
            renderAllPokemon(fetchedPokemon, i + 1);
        }
    }
}


/**
 * clears the search
 * 
 */
function clearSearch() {
    let search = document.getElementById('searchForPokemon');
    let pokeArea = document.getElementById('pokeArea');
    search.value = "";
    pokeArea.innerHTML = "";
    refillPokeArea();
}


/**
 * refills the pokemon area with pokemon cards
 * 
 */
function refillPokeArea() {
    for (let i = 1; i <= fetchedPokemon.length; i++) {
        renderAllPokemon(fetchedPokemon, i);
    }
}

/**
 * shows the detail pokemon card when you click on one card
 * 
 * @param {*} i -index for the pokemon
 */
function showSinglePokemon(i) {
    openPokemonDetailContainer(i)
    let SpotlightPokemon = fetchedPokemon[i]
    let name = SpotlightPokemon['name']
    FinalName = name.charAt(0).toUpperCase() + name.slice(1);
    let Image = SpotlightPokemon['sprites']['other']['dream_world']['front_default'];
    let Types = SpotlightPokemon['types']['0']['type']['name']
    FinalTypes = Types.charAt(0).toUpperCase() + Types.slice(1);
    let Weight = SpotlightPokemon['weight'];
    let Height = SpotlightPokemon['height'];
    let stats = SpotlightPokemon['stats'];
    let allTypes = SpotlightPokemon['types'];
    document.getElementById('singlePokemonContainer').innerHTML =
        returnPokemonDetailContainerHTML(i, FinalName, FinalTypes, Image, Weight, Height);
    returnAllTypesContainerHTML(SpotlightPokemon, allTypes);
    returnPokemonStats(stats);
    showMoves(SpotlightPokemon)
}


/**
 * generates the attack moves for the detail pokemons
 *  
 * @param {*} SpotlightPokemon - clicked on pokemon for detail view
 */
function showMoves(SpotlightPokemon){
    for (let y = 0; y < 5; y++) {
        let moves = SpotlightPokemon['moves'][y];
        let MoveName = moves['move']['name'];
        let learnedAtLevel = moves['version_group_details']['0']['level_learned_at'];
        FinalMoveName = MoveName.charAt(0).toUpperCase() + MoveName.slice(1);
        document.getElementById('bottomSectionTwo').innerHTML += returnAttackContainer(y, FinalMoveName, learnedAtLevel);
    }
}


/**
 * generates the types of the pokemon
 * 
 * @param {*} SpotlightPokemon - the detail pokemon
 * @param {*} allTypes - types of the pokemon
 */
function returnAllTypesContainerHTML(SpotlightPokemon, allTypes) {
    for (let x = 0; x < allTypes.length; x++) {
        allType = SpotlightPokemon['types'][x]['type']['name'];
        FinalallType = allType.charAt(0).toUpperCase() + allType.slice(1);
        document.getElementById('allTypesContainer').innerHTML += /*html*/`<p class="TypeChips">${FinalallType}</p> `;
    }
}


/**
 * directs to second detail window
 * 
 */
function showMoreDetails(){
    document.getElementById('bottomSection').classList.add('d-none');
    document.getElementById('bottomSectionTwo').classList.remove('d-none');
}


/**
 * directs to first detail window
 * 
 */
function backToBaseStats(){
    document.getElementById('bottomSection').classList.remove('d-none');
    document.getElementById('bottomSectionTwo').classList.add('d-none');
}


/**
 * opens the Detail container 
 * 
 * @param {*} i - index of the pokemon
 */
function openPokemonDetailContainer(i){
    document.getElementById('singlePokemonContainer').classList.remove('d-none');
    document.getElementById('searchBar').classList.add('blur');
    document.getElementById('pokeArea').classList.add('blur');
    cardOpened = true;
    currentOpenedPokemon = i;
}


/**
 * closes the Detail container
 * 
 */
function closePokemonDetailContainer() {
    document.getElementById('singlePokemonContainer').classList.add('d-none');
    document.getElementById('searchBar').classList.remove('blur');
    document.getElementById('pokeArea').classList.remove('blur');
    cardOpened = false;
}


/**
 * directs to the next pokemon
 * 
 * @param {*} i - index of the pokemon
 */
function showNextPokemon(i) {
    i++;
    showSinglePokemon(i)
}


/**
 * directs to the previous pokemon
 * 
 * @param {*} i -index of the pokemon
 */
function showPreviousPokemon(i) {
    i--;
    showSinglePokemon(i)
}


/**
 * prevents closing when clicking on the detail container
 * 
 * @param {*} event clicking on the Detail Container
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * returns the html for the stats of the indivudual pokemon
 * 
 * @param {*} stats - the stats of the pokemon
 */
function returnPokemonStats(stats) {
    for (let j = 0; j < stats.length; j++) {
        let stat = stats[j]
        StatName = stats[j]['stat']['name'];
        FinalStatName = StatName.charAt(0).toUpperCase() + StatName.slice(1);
        StatValue = stats[j]['base_stat']
        document.getElementById('PokemonStats').innerHTML += returnPokemonStatsHTML(FinalStatName, FinalTypes, StatValue );
    }
}


// Event Listeners
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closePokemonDetailContainer();
    }
});
document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight" && cardOpened == true) {
        showNextPokemon(currentOpenedPokemon);
    }
});
document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowLeft" && cardOpened == true) {
        showPreviousPokemon(currentOpenedPokemon);
    }
});