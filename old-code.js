// --------- this code is concerned with not outputting all of the stuff above the title of the sutta
// // not inside a verse
// const [verse, line, subLine] = parseSectionId(section);

// if ((line === "0") & (subLine <= titleLineNumber - 1)) {
//   return;
// } else {
//   html += `${openHtml}<span class="pli-lang">${
//     (line === "0") & (subLine === titleLineNumber) ? `<span class="sutta-number">${verse}.&nbsp;</span>` : ""
//   }${paliData[section]}</span><span class="eng-lang">${transData[section]}</span>${closeHtml}`;
// }
