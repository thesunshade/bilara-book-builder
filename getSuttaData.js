// bookLength is the number of suttas + number of headings

/*
 * This function collects the data for each sutta, either from local or API
 * and then calls the makeSuttaHtml() function
 */

import makeSuttaHtml from "./makeSuttaHtml.js";

export default function getSuttaData(bookAbbreviation, article, translator, bookLength) {
  // const counter = document.querySelector("#counter");

  if (JSON.parse(localStorage.local) === true) {
    const slug = `${bookAbbreviation}/${article}`.toLowerCase();

    // fetch the information to build the sutta from LOCAL
    const rootResponse = fetch(`./root/${slug}_root-pli-ms.json`).then(response => response.json());
    const translationResponse = fetch(`./translation/${slug}_translation-en-${translator}.json`).then(response =>
      response.json()
    );
    const htmlResponse = fetch(`./html/${slug}_html.json`).then(response => response.json());

    // work with all the local data once it is fetched
    Promise.all([rootResponse, translationResponse, htmlResponse]).then(responses => {
      let [paliData, transData, htmlData] = responses;
      makeSuttaHtml(bookAbbreviation, paliData, transData, htmlData, article, bookLength);
    });
  } else {
    // fetch the information to build the sutta from API
    const language = "en";
    const book = article.replace(/vagga\d+\//, "");
    fetch(`https://suttacentral.net/api/bilarasuttas/${book}/${translator}?lang=${language}`)
      .then(response => response.json())
      .then(data => {
        const { html_text, translation_text, root_text, reference_text } = data;
        makeSuttaHtml(bookAbbreviation, root_text, translation_text, html_text, reference_text, article, bookLength);
      });
  }
}
