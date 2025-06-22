import makeSuttaHtml from "./makeSuttaHtml.js";

export default function getSuttaData(bookAbbreviation, article, translator, bookLength) {
  const language = "en";
  const book = article.replace(/vagga\d+\//, "");

  fetch(`https://suttacentral.net/api/bilarasuttas/${book}/${translator}?lang=${language}`)
    .then(response => response.json())
    .then(data => {
      const { html_text, translation_text, root_text, reference_text } = data;
      makeSuttaHtml(bookAbbreviation, root_text, translation_text, html_text, reference_text, article, bookLength);
    });
}
