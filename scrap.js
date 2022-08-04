<h1 title="(\d+?).+?  (.+?)".+?PaliHeading">(.+?)</span></h1>
"chapter\1|\3|\2",


<h1>(.+?)<br.+?PaliHeading">(.+?)</span></h1>
"section|\2|\1",








"chapter|Ekakanipata|The Chapter of the Ones",
  "chapter|Dukanipata|The Chapter of the Twos",
  "chapter|Tikanipata|The Chapter of the Threes",
  "chapter|Catukkanipata|The Chapter of the Fours",
  "chapter|Pancakanipata|The Chapter of the Fives",
  "chapter|Chakkanipata|The Chapter of the Sixes",
  "chapter|Sattakanipata|The Chapter of the Sevens",
  "chapter|Atthakanipata|The Chapter of the Eights",
  "chapter|Navakanipata|The Chapter of the Nines",
  "chapter|Ekadasanipata|The Chapter of the Elevens",
  "chapter|Dvadasakanipata|The Chapter of the Twelves",
  "chapter|Solasakanipata|The Chapter of the Sixteens",
  "chapter|Visatinipata|The Chapter of the Twenties",
  "chapter|Timsanipata|The Chapter of the Thirties",
  "chapter|Cattalisanipata|The Chapter of the Forties",
  "chapter|Mahanipata|The Great Chapter";

// kn.Dhp.forEach(chapter => {
//   suttaTable.innerHTML += `<article id="${chapter}"></article>`;
//   buildTable(`kn/dhp/dhp${chapter}`, chapter);
// });

// kn.Iti.forEach(chapter => {
//   suttaTable.innerHTML += `<article id="${chapter}"></article>`;
//   buildGeya(`kn/iti/${chapter}`, chapter, "4");
// });

//----------------------------------------------------

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
