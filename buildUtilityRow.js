import { personsStandoff } from "./index.js";
import buildStandoff from "./buildStandoff.js";

export default function buildUtilityRow(section, utilityRow) {
  const html = `<td colspan="3" class="utility-row-cell">
  <div class="segment-form-area">
   <form id="word-form-${section}"><label>name<input id="input-${section}"></input></label>
     <input type="submit" id="add-word-${section}" value="Add">
   <form>
   </div>
   <ul id="word-display-${section}"></ul>
   </td>`;
  utilityRow.innerHTML = html;
  const wordDisplay = document.getElementById(`word-display-${section}`);
  const wordInput = document.getElementById(`input-${section}`);
  const wordInputAdd = document.getElementById(`word-form-${section}`);

  // This processes the words being added and creates a list of the words for the segment.
  wordInputAdd.addEventListener("submit", e => {
    e.preventDefault();

    // before adding an item, it is necessary to check and see if it already exists in the list. that still needs to be coded

    const newItem = document.createElement("li");
    newItem.setAttribute("id", `id-${section}${wordInput.value}`);
    newItem.append(wordInput.value);
    const newDeleteButton = document.createElement("button");
    newDeleteButton.setAttribute("id", `delete-${section}-${wordInput.value}`);
    newDeleteButton.setAttribute("word", `${wordInput.value}`);
    newDeleteButton.setAttribute("section", `${section}`);
    newDeleteButton.append("Delete");
    newItem.append(newDeleteButton);
    wordDisplay.append(newItem);
    Object.keys(personsStandoff).forEach(item => {
      if (item === section) {
        if (personsStandoff[section] === "") {
          personsStandoff[section] = wordInput.value;
        } else {
          personsStandoff[section] += `, ${wordInput.value}`;
        }
      }
    });

    const wordDeleteButton = document.getElementById(`delete-${section}-${wordInput.value}`);
    wordDeleteButton.addEventListener("click", e => {
      const wordToDelete = e.target.attributes.word.value;
      const sectionOfWordToDelete = e.target.attributes.section.value;
      // now we need to find that word in that section and then remove it from the standoff and from the screen
    });

    buildStandoff(personsStandoff);
    console.log(personsStandoff);
    // console.log(personsStandoff);
  });
}
