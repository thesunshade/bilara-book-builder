import buildSutta from "./buildSutta.js";
import { books } from "./books.js";
import optionSettings from "./optionSettings.js";
import buildTitlePage from "./buildTitlePage.js";

const suttaTable = document.querySelector("#sutta-html");
// const counter = document.querySelector("#counter");
const body = document.querySelector("body");

optionSettings();

suttaTable.innerHTML = "";

// MAKE BOOK BUTTON
const makeBookButton = document.getElementById("make-the-book");
makeBookButton.addEventListener("click", () => {
  suttaTable.innerHTML = "";
  const progressLable = document.getElementById("progress-label");
  const progressBar = document.getElementById("progress");
  progressLable.innerHTML = "Working<span class='blink'>…</span>";
  progressBar.style.width = "0%";
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
  const [slug, translator] = selection.split("|");
  const bookContents = books[slug];
  localStorage.completionCounter = 0;
  // const progressLable = document.getElementById("progress-label");
  // progressLable.innerHTML = "Working…";
  var start = new Date();
  buildTitlePage(slug, translator);

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
      localStorage.completionCounter++;
      // counter.innerHTML = `${localStorage.completionCounter}/${bookContents.length}`;
      const progressBar = document.getElementById("progress");
      const width = (localStorage.completionCounter / bookContents.length) * 100;
      progressBar.style.width = width + "%";

      if (localStorage.completionCounter === bookContents.length) {
        // alert("Book is complete");
        const progressLable = document.getElementById("progress-label");
        progressLable.innerHTML = "Finished";
        var finish = new Date();
        console.log(finish - start);
      }
    } else {
      // this adds the article tag into the dom for each sutta.
      suttaTable.innerHTML += `<article id="${article}"></article>\n`;
      // This starts the process of building the sutta that will be put into that above dom item when the process is finished.
      buildSutta(`${slug}/${article}`, article, translator, bookContents.length, start);
    }
  });
}
