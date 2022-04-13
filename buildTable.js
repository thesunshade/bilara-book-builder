import buildUtilityRow from "./buildUtilityRow.js";
import { suttaTable } from "./index.js";
import { personsStandoff } from "./index.js";

export default function buildTable(slug) {
  slug = slug.toLowerCase();

  suttaTable.innerHTML = "";
  fetch(
    `https://raw.githubusercontent.com/suttacentral/bilara-data/published/root/pli/ms/sutta/${slug}_root-pli-ms.json`
  )
    .then(response => response.json())
    .then(paliData => {
      Object.keys(paliData).forEach(section => {
        personsStandoff[section] = "";

        const segmentRow = document.createElement("tr");
        segmentRow.setAttribute("id", `tr-${section}`);
        // id cell
        const cellId = document.createElement("td");
        cellId.setAttribute("id", `id-${section}`);
        cellId.classList.add("id-class");
        cellId.append(section.replace(/^[a-z]*/, ""));
        cellId.addEventListener("click", () => {
          const targetUtilityRow = document.getElementById(`utility-${section}`);
          targetUtilityRow.classList.toggle("hidden");
        });
        // Pali cell
        const cellPali = document.createElement("td");
        cellPali.setAttribute("id", `pali-${section}`);
        cellPali.classList.add("pali");
        cellPali.append(paliData[section]);
        const cellTranslation = document.createElement("td");
        cellTranslation.setAttribute("id", `trans-${section}`);
        cellTranslation.classList.add("translation");

        // utility row
        const utilityRow = document.createElement("tr");
        utilityRow.setAttribute("id", `utility-${section}`);
        utilityRow.classList.add("utility-row", "hidden");

        // build
        segmentRow.append(cellId);
        segmentRow.append(cellPali);
        segmentRow.append(cellTranslation);
        suttaTable.append(segmentRow);
        suttaTable.append(utilityRow);

        buildUtilityRow(section, utilityRow);
      });

      localStorage.personsStandoff = JSON.stringify(personsStandoff);
    })
    .then(() => {
      fetch(
        `https://raw.githubusercontent.com/suttacentral/bilara-data/published/translation/en/sujato/sutta/${slug}_translation-en-sujato.json`
      )
        .then(response => response.json())
        .then(transData => {
          Object.keys(transData).forEach(section => {
            const cell = document.getElementById(`trans-${section}`);
            cell.append(transData[section]);
          });
        });
    });
}
