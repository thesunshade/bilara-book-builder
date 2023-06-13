export default function optionSettings() {
  // OPTIONS SETTINGS

  // STEPDOWN
  const stepDownCheck = document.getElementById("step-down");
  if (localStorage.stepDown === undefined) {
    localStorage.stepDown = false;
  } else {
    stepDownCheck.checked = JSON.parse(localStorage.stepDown);
  }
  stepDownCheck.addEventListener("click", () => {
    localStorage.stepDown = stepDownCheck.checked;
  });

  // FLATTEN
  const flattenCheck = document.getElementById("flatten");
  if (localStorage.flatten === undefined) {
    localStorage.flatten = false;
  } else {
    flattenCheck.checked = JSON.parse(localStorage.flatten);
  }
  flattenCheck.addEventListener("click", () => {
    localStorage.flatten = flattenCheck.checked;
  });

  // PALI
  const paliCheck = document.getElementById("pali");
  if (localStorage.pali === undefined) {
    localStorage.pali = true;
    paliCheck.checked = true;
  } else {
    paliCheck.checked = JSON.parse(localStorage.pali);
  }
  paliCheck.addEventListener("click", () => {
    localStorage.pali = paliCheck.checked;
  });

  // enjambment
  const enjambmentCheck = document.getElementById("enjambment");
  if (localStorage.enjambment === undefined) {
    localStorage.enjambment = false;
  } else {
    enjambmentCheck.checked = JSON.parse(localStorage.enjambment);
  }
  enjambmentCheck.addEventListener("click", () => {
    localStorage.enjambment = enjambmentCheck.checked;
  });

  // English first
  const englishFirstCheck = document.getElementById("english-first");
  if (localStorage.englishFirst === undefined) {
    localStorage.englishFirst = false;
  } else {
    englishFirstCheck.checked = JSON.parse(localStorage.englishFirst);
  }
  englishFirstCheck.addEventListener("click", () => {
    localStorage.englishFirst = englishFirstCheck.checked;
  });

  // HTML page wrapper
  const htmlPageWrapperCheck = document.getElementById("html-page-wrapper");
  if (localStorage.htmlPageWrapper === undefined) {
    localStorage.htmlPageWrapper = false;
  } else {
    htmlPageWrapperCheck.checked = JSON.parse(localStorage.htmlPageWrapper);
  }
  htmlPageWrapperCheck.addEventListener("click", () => {
    localStorage.htmlPageWrapper = htmlPageWrapperCheck.checked;
  });

  // include refrence numbers
  const includeRefrenceCheck = document.getElementById("include-refrence");
  if (localStorage.includeRefrence === undefined) {
    localStorage.includeRefrence = false;
  } else {
    includeRefrenceCheck.checked = JSON.parse(localStorage.includeRefrence);
  }
  includeRefrenceCheck.addEventListener("click", () => {
    localStorage.includeRefrence = includeRefrenceCheck.checked;
  });

  // LOCAL
  const localCheck = document.getElementById("local");
  if (localStorage.local === undefined) {
    localStorage.local = true;
    localCheck.checked = true;
  } else {
    localCheck.checked = JSON.parse(localStorage.local);
  }
  localCheck.addEventListener("click", () => {
    localStorage.local = localCheck.checked;
  });
  if (!/index.html/.test(location)) {
    localStorage.local = false;
    const localOption = document.getElementById("local-option");
    localOption.remove();
  }
}
