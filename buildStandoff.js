export default function buildStandoff(standoff) {
  const standoffDisplayArea = document.querySelector("#standoff-display-area");
  // let standoffString = "";
  // Object.keys(standoff).forEach(item => {
  //   console.log(standoff[item]);
  //   if (standoff[item] != "") {
  //     standoffString += standoff[item] + ", ";
  //   }
  // });

  let noEmptyStandoff = { ...standoff };

  Object.keys(noEmptyStandoff).forEach(item => {
    if (noEmptyStandoff[item] === "") {
      delete noEmptyStandoff[item];
    }
  });

  standoffDisplayArea.innerText = JSON.stringify(noEmptyStandoff);
}
