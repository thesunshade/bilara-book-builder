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
  const selection = document.getElementById("selection").value;
  const HTML_OPEN = `<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>${selection}</title>
     <style>
      /* Not all of this CSS may be necessary based on the build options you picked*/

      .reference {
        background-color: rgb(96, 77, 0);
        color: white;
        font-family: sans-serif;
        font-size: 0.7rem;
        border: solid 0px;
        border-radius: 5px;
        padding: 2px 4px 2px 2px;
        display: inline;
        margin-right: .5rem;
      }

      header ul {
        display: none;
      }

      /* Book frontmatter */

      .center {
        text-align: center;
      }

      .italic {
        font-style: italic;
      }

      .large {
        font-size: 1.3rem;
      }

      .top-margin {
        margin-top: 1rem;
      }

      /*Sutta Content*/

      p.pli-verse {
        margin-bottom: 0.3rem;
        margin-left: 1rem;
      }

      span.pli-lang {
        display: block;
        font-weight: bold;
      }

      span.eng-lang {
        display: block;
      }

      /*Activate code below to display segments side by side*/
      /*Do not use for English only books*/
      /* 
      p.eng-verse {
        margin-bottom: 1rem;
        margin-top: 0rem;
        margin-left: 1rem;
      }

      .segment-pair {
        display: flex;
        flex-direction: row;
      }

      .segment {
        width: 50%;
      }

      span.pli-lang {
        display: block;
        font-weight: bold;
      }

 */
    </style>
 </head>
 <body>
 `;
  const HTML_CLOSE = `
</body>
</html>`;
  if (localStorage.htmlPageWrapper) {
    navigator.clipboard.writeText(HTML_OPEN + suttaTable.innerHTML + HTML_CLOSE);
  } else navigator.clipboard.writeText(suttaTable.innerHTML);
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
      <h1 title="${englishTitle}" class="${id.replace(/\d+/, "")}"><span class="pli-lang">${paliTitle}</span> <span class="eng-lang">${englishTitle}</span></h1>
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

      getSuttaData(bookAbbreviation, article, translator, lenghtOfBook);
    }
  });
}
