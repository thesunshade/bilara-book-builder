export default function makeSuttaHtml(bookAbbreviation, paliData, transData, htmlData, referenceData, article, bookLength) {
  let paliVerse = "<span class='pli-verse segment'>";
  let englishVerse = "<span class='eng-verse segment'>";
  let inAVerse = false;
  let html = "";
  let suttaNumber = article.match(/(\d*\.*\d*-*\d+)$/g)[0].replace("-", "–");
  const includePali = JSON.parse(localStorage.pali);

  function isHeading(htmlWrapper) {
    if (/<h1 class='sutta-title'>/.test(htmlWrapper) || /<h1 class='range-title sutta-title'>/.test(htmlWrapper) || /<h1 class='range-title'>/.test(htmlWrapper)) {
      return true;
    } else {
      return false;
    }
  }

  function orderThePairs(englishFirst, englishSegment, paliSegment) {
    let html = "";
    if (englishFirst === "true") {
      html += englishSegment + paliSegment;
    } else {
      html += paliSegment + englishSegment;
    }
    return html;
  }

  Object.keys(htmlData).forEach(section => {
    let htmlWrapper = htmlData[section];
    let reference = "";
    if (true) {
      if (referenceData[section]) {
        const referenceArray = referenceData[section].split(", ");
        for (let i = 0; i < referenceArray.length; i++) {
          if (/ms\d/.test(referenceArray[i])) {
            reference = referenceArray[i];
          }
        }
      }
    }

    // if Pali title and English title are identical, delete English
    if (/<h/.test(htmlWrapper) && paliData[section] === transData[section]) {
      if (includePali) {
        transData[section] = "";
      }
    }

    // If <j> is being converted to a class
    if (localStorage.enjambment && /\<j\>/.test(transData[section])) {
      console.log("found enjambment");
      transData[section] = transData[section].replace(/\<j\>/, '<span class="enjambment">');
    }

    // OK, so the bit below is hard coded to always include the Pali in the headings and always remove the number from the English segment. The code was originally written with the assumption that when pali was not included in the text, then it should not be included in the headings.
    //
    // remove sutta number in heading within the Pali segment
    if (isHeading(htmlWrapper)) {
      if (includePali || isHeading(htmlWrapper)) {
        // Pali is being included
        //remove the number from inside paliData
        paliData[section] = paliData[section].replace(/^\d*\.*\d*–*\d+\.* ([A-Za-zĀāīūñÑ])/, "$1");
        // put the correct complete number on the front of the paliData
        paliData[section] = `<span class="sutta-number">${suttaNumber}</span> ${paliData[section].trim()}: `;
      } else {
        // Pali is not being included so the sutta number must be added to English title
        transData[section] = `<span class="sutta-number">${suttaNumber}</span> ${transData[section]}`;
      }
    }

    // step down h1 to h2 etc
    if (JSON.parse(localStorage.stepDown) === true) {
      htmlWrapper = htmlWrapper.replace("<h5", "<h6").replace("</h5", "</h6").replace("<h4", "<h5").replace("</h4", "</h5").replace("<h3", "<h4").replace("</h3", "</h4").replace("<h2", "<h3").replace("</h2", "</h3").replace("<h1", "<h2").replace("</h1", "</h2");
    }

    // flatten headings to classes
    if (JSON.parse(localStorage.flatten) === true) {
      htmlWrapper = htmlWrapper.replace("<h6", "<p class='heading-6'").replace("</h6", "</p").replace("<h5", "<p class='heading-5'").replace("</h5", "</p").replace("<h4", "<p class='heading-4'").replace("</h4", "</p").replace("<h3", "<p class='heading-3'").replace("</h3", "</p");
      if (JSON.parse(localStorage.stepDown) === false) {
        htmlWrapper = htmlWrapper.replace("<h2", "<p class='heading-2'").replace("</h2", "</p");
      }
    }

    let [openHtml, closeHtml] = htmlWrapper.split(/{}/);

    if ("kn/dhp" == bookAbbreviation) {
      // this is needed because Dhp chapters have multiple articles within them
      openHtml = openHtml.replace(/<article .+?>/, "");
      closeHtml = closeHtml.replace(/<\/article>/, "");
    }

    if (/<p><span class='verse-line'>/.test(openHtml)) {
      inAVerse = true;
    }
    let verseNumberHtml = "";
    if (inAVerse) {
      if (includePali) {
        if (/dhp\d+?:1$/.test(section)) {
          const verseNumber = section.match(/dhp(\d+?):1$/)[1];
          verseNumberHtml = `<span class="verse-number">${verseNumber}.&nbsp;</span>`;
        }

        paliVerse += `<span class="pli-lang" id="${section}">${verseNumberHtml}${paliData[section]}</span>`;
      } else {
        paliVerse = "";
      }

      englishVerse += `${transData[section] ? `<span class="eng-lang">${reference ? `<span class="reference">${reference}</span>` : ""}${transData[section]}</span>` : ""}`;
      if (/<span class='verse-line'>{}<\/span><\/p>/.test(htmlData[section])) {
        // now we have finished the verse
        inAVerse = false; // reset the flag
        html += `<p class="verse"><span class="segment-pair">`;

        const paliSegment = includePali ? `${paliVerse}</span>` : "";

        const englishSegment = `${englishVerse}</span>`;

        html += orderThePairs(localStorage.englishFirst, englishSegment, paliSegment);
        html += `</span></p>`;

        // reset the verse containers
        paliVerse = "<span class='pli-verse segment'>";
        englishVerse = "<span class='eng-verse segment'>";
      }
    } else {
      // not in a verse
      let translationPart = "";

      if (includePali || isHeading(htmlWrapper)) {
        translationPart = `<span class="eng-lang segment">${reference ? `<span class="reference">${reference}</span>` : ""}${transData[section]}</span>`;
      } else {
        // there is no need to put the translation in language spans if there is no Pali
        translationPart = `${transData[section]}`;
      }

      const paliSegment = `${includePali || isHeading(htmlWrapper) ? `<span class="pli-lang segment">${reference ? `<span class="reference">${reference}</span>` : ""}${paliData[section]}</span>` : ""}`;
      const englishSegment = `${!transData[section] ? "" : translationPart}`;

      html += `${openHtml}<span class="segment-pair">`;
      html += orderThePairs(localStorage.englishFirst, englishSegment, paliSegment);
      html += `</span>${closeHtml}`;
    }
  });

  const articleElement = document.getElementById(article);

  // html = html.replace("</article>", "").replace(/<article id=".+?">/, "");
  articleElement.outerHTML = html;
  localStorage.completionCounter++;
  const progressBar = document.getElementById("progress-bar");
  const width = (localStorage.completionCounter / bookLength) * 100;
  progressBar.style.width = width + "%";

  if (localStorage.completionCounter == bookLength) {
    const progressLabel = document.getElementById("progress-label");
    progressLabel.innerHTML = "Finished";
  }
}
