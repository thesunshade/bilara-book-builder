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
