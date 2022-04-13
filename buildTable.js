import buildUtilityRow from "./buildUtilityRow.js";
import { suttaTable } from "./index.js";

export default function buildTable(slug) {
  slug = slug.toLowerCase();
  let paliData = {};
  let html = "";
  suttaTable.innerHTML = "";
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
            const [verse, line] = parseSectionId(section);

            if (parseInt(verse, 10) > parseInt(previousVerseNumber, 10)) {
              console.log("Previous " + previousVerseNumber);
              console.log(verse);
              previousVerseNumber = verse;
              html += paliVerse + "\n</div>\n" + englishVerse + "\n</div>\n";
              paliVerse = `<div class="pali-verse">\n<span class="pali-line" id="pali-${section}"><span class="verse-number-pali">${verse}.&#160;</span>${paliData[section]}</span>\n`;
              englishVerse = `<div class="english-verse">\n<span class="english-line" id="english-${section}"><span class="verse-number-english">${verse}.&#160;</span>${transData[section]}</span>\n`;
            } else {
              paliVerse += `<span class="pali-line" id="pali-${section}">${paliData[section]}</span>\n`;
              englishVerse += `<span class="english-line" id="english-${section}">${transData[section]}</span>\n`;
            }
          });
          console.log(html);
        });
    });
}

function parseSectionId(sectionId) {
  const numbers = sectionId.match(/dhp(\d+):(\d)/);
  return [numbers[1], numbers[2]];
}
