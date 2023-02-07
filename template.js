/**
 * returns the html template for the pokemon cards 
 * 
 * @param {*} i - index for the pokemon
 * @param {*} FinalName - name of the individual Pokemon with the first letter in capital
 * @param {*} Image - image of the individual pokemon
 * @param {*} FinalTypes -type of the pokemon with the first letter in capital
 * @returns the html template for the pokemon cards 
 */
function returnPokemonCardHTML(i, FinalName, Image, FinalTypes) {
    return /*html*/`
    <div class="PokeCard">
          <h3>#${i}</h3>      
          <h2>${FinalName}</h2>     
          <div onclick="showSinglePokemon(${i - 1})" class="PokeImage"><img src="${Image}" alt=""> </div>
          <p class="TypeChips ${FinalTypes} "> ${FinalTypes} </p>
    </div>
    `;
}

/**
 * returns the html template for the pokemon detail card
 * 
 * @param {*} i - index for the detail pokemon
 * @param {*} FinalName - name of the individual Pokemon with the first letter in capital
 * @param {*} FinalTypes -type of the pokemon with the first letter in capital
 * @param {*} Image - image of the detail pokemon
 * @param {*} Weight - weight of the detail pokemon
 * @param {*} Height - heigth of the detail pokemon
 * @returns the html template for the pokemon detail card
 */
function returnPokemonDetailContainerHTML(i, FinalName, FinalTypes, Image, Weight, Height) { // HTML Detailansicht
    return /*html*/`
    <div onclick="doNotClose(event)" class="PokemonDetailContainer  ${FinalTypes} ">
                <div class="headerDetailContainer"> 
                         <img onclick="showPreviousPokemon(${i})" onkeypress ="pressRightForPreviousPokemon(event)"  class="arrows" id="arrowLeft" src="img/arrow-left.png" alt="">
                           <h2>${FinalName}</h2> 
                         <img onclick="showNextPokemon(${i})" onkeypress ="pressLeftForPreviousPokemon(event)" class="arrows" id="arrowRight" src="img/arrow-right.png" alt="">
                </div>
         <div class="topSection"> <img src="${Image}" alt="">  </div>
         <div class="allTypesContainer" id ="allTypesContainer" ></div>
        <div class="bottomSection" id="bottomSection">
                <div class="weightAndHeight">
                    <div class="BasestatsOfPokemon"> <div>Weight: </div> <div> ${Weight} lb </div></div>
                    <div class="BasestatsOfPokemon"> <div>Height: </div> <div> ${Height} lb </div></div>
                 </div>
                 <div class="PokemonStats" id="PokemonStats"></div>
            <img class="PokeInfoIcon" onclick="showMoreDetails()" src="img/info-icon.ico" alt=""> 
         </div>
         <div class="bottomSectionTwo d-none" id="bottomSectionTwo">
         <img class="goBackIcon" onclick="backToBaseStats()" src="img/return-icon.ico" alt="">
          </div>
    </div>
    `;
}


/**
 * returns the attack moves of the detail pokemon
 * 
 * @param {*} y index of the differnet moves 
 * @param {*} FinalMoveName - name of the Attack with the first letter in capital
 * @param {*} learnedAtLevel - level at which the attack is learned
 * @returns the attack moves of the detail pokemon
 */
function returnAttackContainer(y, FinalMoveName, learnedAtLevel){
    return /*html*/`
    <div class="attack-container">
      <p class="attack-label">Attack ${y+1}:</p> <p class="MoveName-container"> ${FinalMoveName}</p>
      <p class="level-container">Learned at Level ${learnedAtLevel}</p>
    </div>
    `;     
}


/**
 * returns the PokemonStats
 * 
 * @param {*} FinalStatName - Statname with the first letter in capital
 * @param {*} FinalTypes - types with the first letter in capital
 * @param {*} StatValue - value of the stat
 * @returns the PokemonStats
 */
function returnPokemonStatsHTML(FinalStatName, FinalTypes, StatValue ){
    return /*html*/`
    <div class="StatDivs">
        <div class= "statName">${FinalStatName}</div>   
            <div class="progress-bar ${FinalTypes}" role="progressbar" style="width: ${StatValue}%">${StatValue}</div>
         </div>
     </div>
    `;
}

