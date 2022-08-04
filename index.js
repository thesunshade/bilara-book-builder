import buildGeya from "./buildGeya.js";
import { books } from "./books.js";

export const suttaTable = document.querySelector("#sutta-html");

suttaTable.innerHTML = "";

// MAKE BOOK BUTTON
const makeBookButton = document.getElementById("make-the-book");
makeBookButton.addEventListener("click", () => {
  suttaTable.innerHTML = "";
  makeTheBook();
});

// COPY BUTTON
const copyButton = document.getElementById("copy");
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(suttaTable.innerHTML);
});

function makeTheBook() {
  const translator = document.getElementById("translator").value;
  const book = document.getElementById("book").value;
  const bookContents = books[book];

  bookContents.forEach(article => {
    if (/chapter/.test(article) || /section/.test(article)) {
      // this detects when there is a chapter title page that must be created
      let [id, paliTitle, englishTitle] = article.split("|");
      suttaTable.innerHTML += `<article id="${id}">
    <div class="title">
      <h1 title="${englishTitle}" class="${id.replace(
        /\d+/,
        ""
      )}"><span class="pli-lang">${paliTitle}</span> <span class="eng-lang">${englishTitle}</span></h1>
  </div>
    </article>\n`;
    } else {
      // this adds the article tag into the dom for each sutta.
      suttaTable.innerHTML += `<article id="${article}"></article>\n`;
      // This starts the process of building the sutta that will be put into that above dom item when the process is finished.
      buildGeya(`${book}/${article}`, article, translator);
    }
  });
}
