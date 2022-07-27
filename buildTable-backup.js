// import { suttaTable, book } from "./index.js";

export default function buildTable(slug, chapter) {
  slug = slug.toLowerCase();
  let paliData = {};
  let html = "";
  // suttaTable.innerHTML = "";
  let verseRange = "";

  fetch(
    `https://raw.githubusercontent.com/suttacentral/bilara-data/published/root/pli/ms/sutta/${slug}_root-pli-ms.json`
  )
    .then(response => response.json())
    .then(data => (paliData = data))
    .then(() => {
      fetch(
        `https://raw.githubusercontent.com/suttacentral/bilara-data/published/translation/en/sujato/sutta/${slug}_translation-en-sujato.json`
      )
        .then(response => response.json())
        .then(transData => {
          let paliVerse = "";
          let englishVerse = "";
          let previousVerseNumber = 0;
          Object.keys(transData).forEach(section => {
            const [verse, line, subLine] = parseSectionId(section);

            if (parseInt(verse, 10) > parseInt(previousVerseNumber, 10)) {
              if (line === "0") {
                if (subLine === "2") {
                  verseRange = transData[section].match(/\d.+/);
                } else if (subLine === "3") {
                  const translation = transData[section].match(/(\d+)\. (.+)/);
                  html = `<h1 title="${translation[1]}. ${paliData[section]}: ${translation[2]} [${verseRange}]">
                  <span class="pali-line">${translation[1]}. ${paliData[section]}</span>
                  <span class="english-line">${translation[2]}</span>
                  </h1>`;
                }
              } else {
                previousVerseNumber = verse;
                html += paliVerse + "\n</div>\n" + englishVerse + "\n</div>\n";
                paliVerse = `<div class="pali-verse">\n<span class="pali-line" id="pali-${section}"><span class="verse-number-pali">${verse}.&#160;</span>${paliData[section]}</span>\n`;
                englishVerse = `<div class="english-verse">\n<span class="english-line" id="english-${section}"><span class="verse-number-english">${verse}.&#160;</span>${transData[section]}</span>\n`;
              }
            } else {
              paliVerse += `<span class="pali-line" id="pali-${section}">${paliData[section]}</span>\n`;
              englishVerse += `<span class="english-line" id="english-${section}">${transData[section]}</span>\n`;
            }
          });
          // suttaTable.innerHTML += html;
          const article = document.getElementById(chapter);
          article.innerHTML = html;
        });
    });
}

function parseSectionId(sectionId) {
  const numbers = sectionId.match(/dhp(\d+):(\d)\.*(\d*)/);
  return [numbers[1], numbers[2], numbers[3]];
}
