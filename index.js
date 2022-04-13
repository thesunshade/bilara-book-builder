import buildTable from "./buildTable.js";
// import { dppn } from "./DPPN.js";
import suttaSelector from "./suttaSelector.js";

export const suttaTable = document.querySelector("#sutta-table");
export let personsStandoff = {};
suttaSelector("sutta-selector");

// loadSuttaForm.addEventListener("submit", e => {
//   e.preventDefault();
//   personsStandoff.length = 0; // clears personsStandoff each time new sutta is loaded
//   personsStandoff = buildTable(requestedNikaya.value, requestedSutta.value);
//   console.log(personsStandoff);
// });

// builds words from dictionary
// let words = [];
// dppn.forEach(item => {
//   words.push(item.word);
// });
// console.log(words);

// // logs currtent standoff to console
// const showPersonsStandoffButton = document.querySelector("#show-personsStandoff");
// showPersonsStandoffButton.addEventListener("click", () => {
//   console.log(personsStandoff);
// });
