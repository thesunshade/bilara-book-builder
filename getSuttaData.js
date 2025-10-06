import makeSuttaHtml from "./makeSuttaHtml.js";

export default function getSuttaData(bookAbbreviation, article, translator, bookLength, language) {
  // const language = "en";
  const book = article.replace(/vagga\d+\//, "");

  // console.log(`https://suttacentral.net/api/bilarasuttas/${book}/${translator}?lang=${language}`);

  fetch(`https://suttacentral.net/api/bilarasuttas/${book}/${translator}?lang=${language}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      const { html_text, translation_text, root_text, reference_text } = data;
      // console.log(`hello ${article}`);
      makeSuttaHtml(bookAbbreviation, root_text, translation_text, html_text, reference_text, article, bookLength);
    })
    .catch(error => console.log("Error:", error));
}
