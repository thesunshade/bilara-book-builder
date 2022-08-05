export default function buildGeya(slug, article, translator) {
  slug = slug.toLowerCase();
  let html = "";
  let suttaNumber = article.match(/(\d*\.*\d+)$/g)[0];

  // fetch the information to build the sutta
  const rootResponse = fetch(`./root/${slug}_root-pli-ms.json`).then(response => response.json());
  const translationResponse = fetch(`./translation/${slug}_translation-en-${translator}.json`).then(response =>
    response.json()
  );
  const htmlResponse = fetch(`./html/${slug}_html.json`).then(response => response.json());

  // work with all the data once it is fetched
  Promise.all([rootResponse, translationResponse, htmlResponse]).then(responses => {
    let [paliData, transData, htmlData] = responses;
    let paliVerse = "<p class='pli-verse'>";
    let englishVerse = "<p class='eng-verse'>";
    let inAVerse = false;

    Object.keys(paliData).forEach(section => {
      let htmlWrapper = htmlData[section];

      if (/<h1 class='sutta-title'>/.test(htmlWrapper)) {
        if (/an/.test(slug) || /thag/.test(slug)) {
          paliData[section] = paliData[section].replace(/^\d+?\.*\d*?\.* ([A-Za-zĀāīūñÑ])/, "$1");
        }
        paliData[section] = `<span class="sutta-number">${suttaNumber}</span> ${paliData[section]}`;
      }

      // if Pali title and English title are identical, delete pali
      if (/<h/.test(htmlWrapper) && paliData[section] === transData[section]) {
        paliData[section] = "";
      }

      if (!/mn/.test(slug)) {
        htmlWrapper = htmlWrapper.replace("<h1", "<h2").replace("</h1", "</h2");
      }

      const [openHtml, closeHtml] = htmlWrapper.split(/{}/);
      if (/<p><span class='verse-line'>/.test(openHtml)) {
        inAVerse = true;
      }
      if (inAVerse) {
        paliVerse += `<span class="pli-lang" id="${section}">${paliData[section]}</span>\n`;
        englishVerse += `${transData[section] ? `<span class="eng-lang">${transData[section]}</span>\n` : ""}`;
        if (/<span class='verse-line'>{}<\/span><\/p>/.test(htmlData[section])) {
          inAVerse = false;
          html += paliVerse + "</p>\n" + englishVerse + "</p>\n";
          paliVerse = "<p class='pli-verse'>\n";
          englishVerse = "<p class='eng-verse'>\n";
        }
      } else {
        if (openHtml)
          html += `${openHtml}<span class="pli-lang">${paliData[section]}</span>${
            transData[section] ? `<span class="eng-lang">${transData[section]}</span>` : ""
          }${closeHtml}\n`;
      }
    });
    const articleElement = document.getElementById(article);
    html = html.replace("</article>", "").replace(/<article id=".+?">/, "");
    articleElement.outerHTML = html;
    // console.log(articleElement);
  });

  function parseSectionId(sectionId) {
    // below works with thig
    const numbers = sectionId.match(/[a-z]+\d+\.(\d+):(\d)\.*(\d*)/);
    // below works with iti
    // const numbers = sectionId.match(/[a-z]+(\d+):(\d)\.*(\d*)/);
    // verse(sutta), line, subLine
    return [numbers[1], numbers[2], numbers[3]];
  }
}
