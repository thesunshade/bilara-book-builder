import buildTable from "./buildTable.js";
import buildGeya from "./buildGeya.js";
// import { dppn } from "./DPPN.js";
import { kn } from "./kn.js";

export const suttaTable = document.querySelector("#sutta-html");

suttaTable.innerHTML = "";

// kn.Dhp.forEach(chapter => {
//   suttaTable.innerHTML += `<article id="${chapter}"></article>`;
//   buildTable(`kn/dhp/dhp${chapter}`, chapter);
// });

kn.Iti.forEach(chapter => {
  suttaTable.innerHTML += `<article id="${chapter}"></article>`;
  buildGeya(`kn/iti/${chapter}`, chapter, "4");
});

// for (let i = 1; i <= 9; i++) {
//   suttaTable.innerHTML += `<article id="${i}"></article>`;
//   buildGeya(`kn/kp/kp${i}`, i, 2);
// }

// function fetchAll(slug) {
//   const root = fetch(`./root/${slug}_root-pli-ms.json`).then(response => response.json());
//   const translation = fetch(`./translation/${slug}_translation-en-sujato.json`).then(response => response.json());
//   const html = fetch(`./html/${slug}_html.json`).then(response => response.json());
//   Promise.all([root, translation, html]).then(responses => {
//     console.log(responses);
//   });
// }
// fetchAll("kn/kp/kp1");
