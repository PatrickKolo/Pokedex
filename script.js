let currentPokemon;
let fetchedPokemon = []; // Array for fetched Pokemon/////////////////////////////

async function loadPokemon() {  // download API from Server//////////////////////////////
    for (let i = 1; i <= 50; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let currentPokemon = await response.json(); // in Json umwandeln
        fetchedPokemon.push(currentPokemon); // Pokemon in Array pushen

        renderAllPokemon(fetchedPokemon, i);
    }
}

function renderAllPokemon(fetchedPokemon, i) {

    let name = fetchedPokemon[i - 1]['name'];
    FinalName = name.charAt(0).toUpperCase() + name.slice(1);

    let Image = fetchedPokemon[i - 1]['sprites']['other']['official-artwork']['front_default'];

    let Types = fetchedPokemon[i - 1]['types']['0']['type']['name']
    FinalTypes = Types.charAt(0).toUpperCase() + Types.slice(1);

    document.getElementById('pokeArea').innerHTML += returnPokemonCardHTML(i, FinalName, Image, FinalTypes);
}


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


function clearSearch() {                         
    let search = document.getElementById('searchForPokemon');
    let pokeArea = document.getElementById('pokeArea');
    search.value = "";
    pokeArea.innerHTML = "";
    refillPokeArea();                        
}


function refillPokeArea() {
    for (let i = 1; i <= fetchedPokemon.length; i++) {
        renderAllPokemon(fetchedPokemon, i);
    }
}


function showSinglePokemon(i) {

    document.getElementById('singlePokemonContainer').classList.remove('d-none');
    document.getElementById('searchBar').classList.add('blur');
    document.getElementById('pokeArea').classList.add('blur');

    let SpotlightPokemon = fetchedPokemon[i]

    let name = SpotlightPokemon['name']
    FinalName = name.charAt(0).toUpperCase() + name.slice(1);
    let Image = SpotlightPokemon['sprites']['other']['dream_world']['front_default'];
    let Types = SpotlightPokemon['types']['0']['type']['name']
    FinalTypes = Types.charAt(0).toUpperCase() + Types.slice(1);

    let Weight = SpotlightPokemon['weight'];
    let Height = SpotlightPokemon['height'];
    let stats = SpotlightPokemon['stats'];
    let abilities = SpotlightPokemon['abilities'];
    let allTypes = SpotlightPokemon['types'];

    document.getElementById('singlePokemonContainer').innerHTML = returnPokemonDetailContainerHTML(i, FinalName, FinalTypes, Image, Weight, Height);
    returnAllTypesContainerHTML(SpotlightPokemon, allTypes);
    returnPokemonStatsHTML(stats);
    returnAttackContainerHTML(abilities);
}


function closePokemonDetailContainer() {
    document.getElementById('singlePokemonContainer').classList.add('d-none');
    document.getElementById('searchBar').classList.remove('blur');
    document.getElementById('pokeArea').classList.remove('blur');
}


function showNextPokemon(i) {
    i++;
    showSinglePokemon(i)
}


function showPreviousPokemon(i) {
    i--;
    showSinglePokemon(i)
}


function doNotClose(event) {
    event.stopPropagation();
}

// HTML Templates
function returnPokemonCardHTML(i, FinalName, Image, FinalTypes) {   // HTML PokeCard
    return /*html*/`
    <div class="PokeCard">
          <h3>#${i}</h3>      
          <h2>${FinalName}</h2>     
          <div onclick="showSinglePokemon(${i - 1})" class="PokeImage"><img src="${Image}" alt=""> </div>
          <p class="TypeChips ${FinalTypes} "> ${FinalTypes} </p>
    </div>
    `;
}


function returnPokemonDetailContainerHTML(i, FinalName, FinalTypes, Image, Weight, Height) { // HTML Detailansicht
    return /*html*/`

    <div onclick="doNotClose(event)" class="PokemonDetailContainer  ${FinalTypes} ">
                <div class="headerDetailContainer"> 
                         <img onclick="showPreviousPokemon(${i})"  class="arrows" id="arrowLeft" src="img/arrow-Left.png" alt="">
                           <h2>${FinalName}</h2> 
                         <img onclick="showNextPokemon(${i})" class="arrows" id="arrowRight" src="img/arrow-right.png" alt="">
                </div>

         <div class="topSection"> <img src="${Image}" alt="">  </div>

         <div class="allTypesContainer" id ="allTypesContainer" ></div>

        <div class="bottomSection">
                <div class="weightAndHeight">
                    <div class="BasestatsOfPokemon"> <div>Weight: </div> <div> ${Weight} lb </div></div>
                    <div class="BasestatsOfPokemon"> <div>Height: </div> <div> ${Height} lb </div></div>
                 </div>
                 <div class="PokemonStats" id="PokemonStats"></div>
            <div id="attackContainer" class="attackContainer"><h4>Attacks:</h4> </div>    
         </div>
    </div>
    `;
}


function returnAllTypesContainerHTML(SpotlightPokemon, allTypes){
    for (let x = 0; x < allTypes.length; x++) {
        allType = SpotlightPokemon['types'][x]['type']['name'];
        FinalallType = allType.charAt(0).toUpperCase() + allType.slice(1);

        document.getElementById('allTypesContainer').innerHTML += /*html*/`<p class="TypeChips">${FinalallType}</p> `;
    }
}


function returnPokemonStatsHTML(stats){
    
    for (let j = 0; j < stats.length; j++) {
        let stat = stats[j]
        StatName = stats[j]['stat']['name'];
        FinalStatName = StatName.charAt(0).toUpperCase() + StatName.slice(1);
        StatValue = stats[j]['base_stat']

        document.getElementById('PokemonStats').innerHTML += /*html*/`

        <div class="StatDivs">
            <div class= "statName">${FinalStatName}</div>   
                <div class="progress-bar ${FinalTypes}" role="progressbar" style="width: ${StatValue}%">${StatValue}</div>
             </div>
         </div>
        `;
    }
}


function returnAttackContainerHTML(abilities){
    for (let y = 0; y < abilities.length; y++) {
        let ability = abilities[y]
        ability = abilities[y]['ability']['name'];

        FinalAbility = ability.charAt(0).toUpperCase() + ability.slice(1);

        document.getElementById('attackContainer').innerHTML += /*html*/`<p>${FinalAbility}</p> `;
    }
}