export default function buildSuttaHtml(paliData, transData, htmlData, article, bookLength, start) {
  let paliVerse = "<p class='pli-verse'>";
  let englishVerse = "<p class='eng-verse'>";
  let inAVerse = false;
  let html = "";
  let suttaNumber = article.match(/(\d*\.*\d*-*\d+)$/g)[0].replace("-", "–");

  Object.keys(htmlData).forEach(section => {
    let htmlWrapper = htmlData[section];

    // if Pali title and English title are identical, delete one of them
    if (/<h/.test(htmlWrapper) && paliData[section] === transData[section]) {
      if (JSON.parse(localStorage.pali) === true) {
        transData[section] = "";
      }
    }

    // remove sutta number in heading within the Pali segment
    if (
      /<h1 class='sutta-title'>/.test(htmlWrapper) ||
      /<h1 class='range-title sutta-title'>/.test(htmlWrapper) ||
      /<h1 class='range-title'>/.test(htmlWrapper)
    ) {
      if (JSON.parse(localStorage.pali) === true) {
        // Pali is being included

        //remove the number from inside paliData
        paliData[section] = paliData[section].replace(/^\d*\.*\d*–*\d+\.* ([A-Za-zĀāīūñÑ])/, "$1");

        // put the correct complete number on the front of the paliData
        paliData[section] = `<span class="sutta-number">${suttaNumber}</span> ${paliData[section]}`;
      } else {
        // Pali is not being included so the sutta number must be added to English title
        transData[section] = `<span class="sutta-number">${suttaNumber}</span> ${transData[section]}`;
      }
    }

    // if no pali should be included
    if (JSON.parse(localStorage.pali) === false) {
      paliData[section] = "";
    }

    // step down h1 to h2 etc
    if (JSON.parse(localStorage.stepDown) === true) {
      htmlWrapper = htmlWrapper
        .replace("<h5", "<h6")
        .replace("</h5", "</h6")
        .replace("<h4", "<h5")
        .replace("</h4", "</h5")
        .replace("<h3", "<h4")
        .replace("</h3", "</h4")
        .replace("<h2", "<h3")
        .replace("</h2", "</h3")
        .replace("<h1", "<h2")
        .replace("</h1", "</h2");
    }

    // flatten headings to classes
    if (JSON.parse(localStorage.flatten) === true) {
      htmlWrapper = htmlWrapper
        .replace("<h6", "<p class='heading-6'")
        .replace("</h6", "</p")
        .replace("<h5", "<p class='heading-5'")
        .replace("</h5", "</p")
        .replace("<h4", "<p class='heading-4'")
        .replace("</h4", "</p")
        .replace("<h3", "<p class='heading-3'")
        .replace("</h3", "</p");
      if (JSON.parse(localStorage.stepDown) === false) {
        htmlWrapper = htmlWrapper.replace("<h2", "<p class='heading-2'").replace("</h2", "</p");
      }
    }

    const [openHtml, closeHtml] = htmlWrapper.split(/{}/);
    if (/<p><span class='verse-line'>/.test(openHtml)) {
      inAVerse = true;
    }
    if (inAVerse) {
      paliVerse += `<span class="pli-lang" id="${section}">${paliData[section]}</span>`;
      englishVerse += `${transData[section] ? `<span class="eng-lang">${transData[section]}</span>` : ""}`;
      if (/<span class='verse-line'>{}<\/span><\/p>/.test(htmlData[section])) {
        inAVerse = false;
        html += paliVerse + "</p>" + englishVerse + "</p>";
        paliVerse = "<p class='pli-verse'>";
        englishVerse = "<p class='eng-verse'>";
      }
    } else {
      // not in a verse
      let translationPart = "";
      // test for including Pali
      if (JSON.parse(localStorage.pali)) {
        translationPart = `<span class="eng-lang">${transData[section]}</span>`;
      } else {
        translationPart = `${transData[section]}`;
      }

      html += `${openHtml}
        ${paliData[section] ? `<span class="pli-lang">${paliData[section]}</span>` : ""}${
        !transData[section] ? "" : translationPart
      }${closeHtml}`;
    }
  });
  const articleElement = document.getElementById(article);
  html = html.replace("</article>", "").replace(/<article id=".+?">/, "");
  articleElement.outerHTML = html;
  localStorage.completionCounter++;
  const progressBar = document.getElementById("progress-bar");
  const width = (localStorage.completionCounter / bookLength) * 100;
  progressBar.style.width = width + "%";

  if (localStorage.completionCounter == bookLength) {
    var finish = new Date();
    // console.log("seconds " + (finish - start) / 1000);
    // alert("Book is complete");

    const progressLable = document.getElementById("progress-label");
    progressLable.innerHTML = "Finished";
  }
}
