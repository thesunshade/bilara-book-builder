import getSuttaData from "./getSuttaData.js";
import { books } from "./books.js";
import optionSettings from "./optionSettings.js";
import buildTitlePage from "./buildTitlePage.js";

const suttaTable = document.querySelector("#sutta-html");
const body = document.querySelector("body");

optionSettings();

document.onkeyup = function (e) {
  if (e.key == "s") {
    console.log(e.target.id);
    const bodyElement = document.querySelector("body");
    bodyElement.classList.toggle("side-by-side");
  }
};

suttaTable.innerHTML = "";

// MAKE BOOK BUTTON
const makeBookButton = document.getElementById("make-the-book");
makeBookButton.addEventListener("click", () => {
  suttaTable.innerHTML = "";
  const progressLabel = document.getElementById("progress-label");
  const progressBar = document.getElementById("progress-bar");
  const progressOuter = document.getElementById("progress-outer");
  progressLabel.innerHTML = "Working<span class='blink'>…</span>";
  progressBar.style.width = "0%";
  progressOuter.style.border = "solid 1px rgb(67, 67, 67)";
  setTimeout(() => {
    makeTheBook();
  }, 50);
});

// COPY BUTTON
const copyButton = document.getElementById("copy");
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(suttaTable.innerHTML);
});

// Toggle ToC BUTTON
const tocButton = document.getElementById("toc");
tocButton.addEventListener("click", () => {
  body.classList.toggle("hide-content");
});

//
function makeTheBook() {
  const selection = document.getElementById("selection").value;
  const [bookAbbreviation, translator] = selection.split("|");
  const bookContents = books[bookAbbreviation]; // array of section titles and ids for the current book
  const lenghtOfBook = bookContents.length;
  localStorage.completionCounter = 0;
  buildTitlePage(bookAbbreviation, translator);
  console.log(bookAbbreviation);
  bookContents.forEach(article => {
    // article will be either a uid or the contents of the chapter/section title page
    if (/chapter/.test(article) || /section/.test(article)) {
      // This builds the section pages
      let [id, paliTitle, englishTitle] = article.split("|");
      suttaTable.innerHTML += `<article id="${id}" class="sectionpage">
    <div class="title">
      <h1 title="${englishTitle}" class="${id.replace(
        /\d+/,
        ""
      )}"><span class="pli-lang">${paliTitle}</span> <span class="eng-lang">${englishTitle}</span></h1>
  </div>
    </article>\n`;
      localStorage.completionCounter++;
      const progressBar = document.getElementById("progress-bar");
      const width = (localStorage.completionCounter / lenghtOfBook) * 100;
      progressBar.style.width = width + "%";

      if (localStorage.completionCounter === lenghtOfBook) {
        const progressLabel = document.getElementById("progress-label");
        progressLabel.innerHTML = "Finished";
      }
    } else {
      // this adds the article tag into the dom for each sutta.
      suttaTable.innerHTML += `<article id="${article}"></article>\n`;

      // This starts the process of building the sutta that will be put into that above dom item when the process is finished.
      console.log(article);
      getSuttaData(bookAbbreviation, article, translator, lenghtOfBook);
    }
  });
}
