// import { suttaTable, book } from "./index.js";

export default function buildGeya(slug, chapter, titleLineNumber) {
  slug = slug.toLowerCase();
  let html = "";
  let suttaNumber = "";
  // suttaTable.innerHTML = "";
  let verseRange = "";

  const rootResponse = fetch(`./root/${slug}_root-pli-ms.json`).then(response => response.json());
  const translationResponse = fetch(`./translation/${slug}_translation-en-sujato.json`).then(response =>
    response.json()
  );
  const htmlResponse = fetch(`./html/${slug}_html.json`).then(response => response.json());

  Promise.all([rootResponse, translationResponse, htmlResponse]).then(responses => {
    // console.log(responses);
    const [paliData, transData, htmlData] = responses;

    let paliVerse = "<p class='pli-verse'>";
    let englishVerse = "<p class='eng-verse'>";
    let inAVerse = false;
    Object.keys(paliData).forEach(section => {
      const [openHtml, closeHtml] = htmlData[section].split(/{}/);
      if (/<p><span class='verse-line'>/.test(openHtml)) {
        inAVerse = true;
      }
      if (inAVerse) {
        paliVerse += `<span class="pli-lang" id="${section}">${paliData[section]}</span>`;
        englishVerse += `<span class="eng-lang">${transData[section]}</span>`;
        if (/<span class='verse-line'>{}<\/span><\/p>/.test(htmlData[section])) {
          inAVerse = false;
          html += paliVerse + "</p>" + englishVerse + "</p>";
          paliVerse = "<p class='pli-verse'>";
          englishVerse = "<p class='eng-verse'>";
        }
      } else {
        const [verse, line, subLine] = parseSectionId(section);

        if ((line === "0") & (subLine <= titleLineNumber - 1)) {
          return;
        } else {
          html += `${openHtml}<span class="pli-lang">${
            (line === "0") & (subLine === titleLineNumber) ? `<span class="sutta-number">${verse}.&nbsp;</span>` : ""
          }${paliData[section]}</span><span class="eng-lang">${transData[section]}</span>${closeHtml}`;
        }
      }
    });
    const article = document.getElementById(chapter);
    article.innerHTML = html;
  });

  function parseSectionId(sectionId) {
    // console.log(sectionId, book);
    const numbers = sectionId.match(/[a-z]+(\d+):(\d)\.*(\d*)/);
    // console.log(numbers);
    return [numbers[1], numbers[2], numbers[3]];
  }
}
