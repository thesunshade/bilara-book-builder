import { sn } from "./sn.js";
import { an } from "./an.js";
import { kn } from "./kn.js";

import buildTable from "./buildTable.js";

export default function suttaSelector(elementId) {
  const formElement = document.getElementById(elementId);

  const nikayas = ["DN", "MN", "SN", "AN", "KN"];

  const suttaSelectorForm = document.createElement("form");
  suttaSelectorForm.setAttribute("class", "sutta-selector-form");

  const nikayaSelector = document.createElement("select");
  nikayaSelector.setAttribute("id", "nikaya-selector");
  nikayaSelector.setAttribute("class", "nikaya-selector");
  const selectOption = document.createElement("option");
  selectOption.append("select");
  nikayaSelector.append(selectOption);
  nikayas.forEach(nikaya => {
    const option = document.createElement("option");
    option.setAttribute("value", nikaya);
    option.append(nikaya);
    nikayaSelector.append(option);
  });
  const nikayaLabel = document.createElement("label");
  nikayaLabel.append("Nikaya");
  nikayaLabel.append(nikayaSelector);
  suttaSelectorForm.append(nikayaLabel);
  formElement.append(suttaSelectorForm);

  nikayaSelector.addEventListener("change", e => {
    const existingDropdowns = document.querySelectorAll(".nikaya-chapter-dropdown");
    existingDropdowns.forEach(item => {
      item.remove();
    });
    const existingSubmitButton = document.getElementById("sutta-submit-button");
    existingSubmitButton && existingSubmitButton.remove();
    switch (e.target.value) {
      case "DN":
        makeDnDropdown();
        break;
      case "MN":
        makeMnDropdown();
        break;
      case "SN":
        makeChapterDropdown("sn", sn);
        break;
      case "AN":
        makeChapterDropdown("an", an);
        break;
      case "KN":
        makeKhuddakaDropdown(kn);
        break;
    }
  });
  // --- DN ------------------------
  function makeDnDropdown() {
    const dnChapterDropdown = document.createElement("select");
    dnChapterDropdown.setAttribute("id", "nikaya-chapter-dropdown");

    for (let i = 1; i <= 34; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", i);
      option.append(i);
      dnChapterDropdown.append(option);
    }
    const dnChapterLabel = document.createElement("label");
    dnChapterLabel.setAttribute("class", "nikaya-chapter-dropdown");
    dnChapterLabel.append("DN Suttas");
    dnChapterLabel.append(dnChapterDropdown);
    suttaSelectorForm.append(dnChapterLabel);

    addSuttaSubmitButton();
  }

  // --- MN -----------------------
  function makeMnDropdown() {
    const mnChapterDropdown = document.createElement("select");
    mnChapterDropdown.setAttribute("id", "nikaya-chapter-dropdown");
    for (let i = 1; i <= 152; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", i);
      option.append(i);
      mnChapterDropdown.append(option);
    }
    const mnChapterLabel = document.createElement("label");
    mnChapterLabel.append("MN Suttas");
    mnChapterLabel.setAttribute("class", "nikaya-chapter-dropdown");
    mnChapterLabel.append(mnChapterDropdown);
    suttaSelectorForm.append(mnChapterLabel);

    addSuttaSubmitButton();
  }
  // --- SN and AN -------------------------------
  function makeChapterDropdown(book, bookData) {
    const chapterDropdown = document.createElement("select");
    chapterDropdown.setAttribute("id", `nikaya-chapter-dropdown`);
    const selectOption = document.createElement("option");
    selectOption.append("select");
    chapterDropdown.append(selectOption);
    Object.keys(bookData).forEach(chapter => {
      const option = document.createElement("option");
      option.setAttribute("value", chapter);
      option.append(chapter);
      chapterDropdown.append(option);
    });
    const bookChapterLabel = document.createElement("label");
    bookChapterLabel.setAttribute("class", "nikaya-chapter-dropdown");
    bookChapterLabel.append(`${book.toUpperCase()} Chapter`);
    bookChapterLabel.append(chapterDropdown);
    suttaSelectorForm.append(bookChapterLabel);

    chapterDropdown.addEventListener("change", e => {
      const existingSuttaDropdowns = document.querySelector(".chapter-sutta-dropdown");
      existingSuttaDropdowns && existingSuttaDropdowns.remove();
      const existingSubmitButton = document.getElementById("sutta-submit-button");
      existingSubmitButton && existingSubmitButton.remove();
      makeSuttaInChapterDropdown(bookData, e.target.value);
    });
  }

  // --- suttas in chapter dropdown
  function makeSuttaInChapterDropdown(bookData, chapter) {
    const suttaInChapterDropdown = document.createElement("select");
    suttaInChapterDropdown.setAttribute("id", `chapter-sutta-dropdown`);
    const suttas = bookData[chapter];
    suttas.forEach(sutta => {
      const option = document.createElement("option");
      option.setAttribute("value", sutta);
      const strippedSutta = sutta.toString(10).replace(/^.*\/[a-z]*/, ""); //cleans ud, itv, snp
      option.append(strippedSutta);
      suttaInChapterDropdown.append(option);
    });
    const suttaInChapterLabel = document.createElement("label");
    suttaInChapterLabel.setAttribute("class", "nikaya-chapter-dropdown chapter-sutta-dropdown");
    suttaInChapterLabel.append("Sutta");
    suttaInChapterLabel.append(suttaInChapterDropdown);
    suttaSelectorForm.append(suttaInChapterLabel);

    addSuttaSubmitButton();
  }
  // --- KN ------------------------
  function makeKhuddakaDropdown(bookData) {
    const knBookDropdown = document.createElement("select");
    knBookDropdown.setAttribute("id", "nikaya-chapter-dropdown");
    const selectOption = document.createElement("option");
    selectOption.append("select");
    knBookDropdown.append(selectOption);
    Object.keys(bookData).forEach(chapter => {
      const option = document.createElement("option");
      option.setAttribute("value", chapter);
      option.append(chapter);
      knBookDropdown.append(option);
    });

    const knBooksLabel = document.createElement("label");
    knBooksLabel.append("KN Books");
    knBooksLabel.setAttribute("class", "nikaya-chapter-dropdown");
    knBooksLabel.append(knBookDropdown);
    suttaSelectorForm.append(knBooksLabel);

    knBookDropdown.addEventListener("change", e => {
      const existingSuttaDropdowns = document.querySelector(".chapter-sutta-dropdown");
      existingSuttaDropdowns && existingSuttaDropdowns.remove();
      const existingSubmitButton = document.getElementById("sutta-submit-button");
      existingSubmitButton && existingSubmitButton.remove();
      makeSuttaInChapterDropdown(bookData, e.target.value);
    });
  }

  function addSuttaSubmitButton() {
    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "sutta-submit-button");
    submitButton.setAttribute("class", "sutta-submit-button");
    submitButton.setAttribute("value", "get");
    suttaSelectorForm.append(submitButton);

    submitButton.addEventListener("click", e => {
      e.preventDefault();
      //   personsStandoff.length = 0; // clears personsStandoff each time new sutta is loaded
      const nikayaSubmission = document.getElementById("nikaya-selector");
      const chapterSubmission = document.getElementById("nikaya-chapter-dropdown");

      switch (nikayaSubmission.value) {
        case "DN":
        case "MN":
          buildTable(`${nikayaSubmission.value}/${nikayaSubmission.value}${chapterSubmission.value}`);
          break;
        case "SN":
        case "AN":
          const chapterSuttaSubmission = document.getElementById("chapter-sutta-dropdown");
          buildTable(
            `${nikayaSubmission.value}/${nikayaSubmission.value}${chapterSubmission.value}/${nikayaSubmission.value}${chapterSubmission.value}.${chapterSuttaSubmission.value}`
          );
          break;
        case "KN":
          const knChapterSuttaSubmission = document.getElementById("chapter-sutta-dropdown");
          switch (chapterSubmission.value) {
            case "Kp":
            case "Dhp":
              buildTable(`kn/${chapterSubmission.value}/${chapterSubmission.value}${knChapterSuttaSubmission.value}`);
              break;
            case "Ud":
            case "Iti":
            case "Snp":
              buildTable(`kn/${chapterSubmission.value}/${knChapterSuttaSubmission.value}`);
              break;
          }
          break;
      }

      // personsStandoff = buildTable(requestedNikaya.value, requestedSutta.value);
      // console.log(personsStandoff);
    });
  }
}
