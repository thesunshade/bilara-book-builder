export default function buildTitlePage(slug, translator) {
  const suttaTable = document.querySelector("#sutta-html");
  const titlePageArticle = document.createElement("article");
  titlePageArticle.setAttribute("id", "title-page");
  const descriptionPageArticle = document.createElement("article");
  descriptionPageArticle.setAttribute("id", "description-page");

  let book = slug.replace(/kn\//, "");
  fetch(`https://suttacentral.net/api/publication_info/${book}/en/${translator}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data[0]);
      let { author_name, translation_title, translation_subtitle, translation_process, translation_description } =
        data[0];
      const { license_type, license_abbreviation, license_url, license_statement } = data[0].license;
      const { publication_date, edition_url, publisher } = data[0].edition[0];

      if (!author_name) {
        const collaborators = data[0].collaborator;
        let names = "";
        collaborators.forEach((element, index) => {
          console.log(element.author_name);
          names = `${names} ${index === collaborators.length - 1 ? " & " : ""} ${element.author_name}`;
        });
        author_name = names;
      }

      titlePageArticle.innerHTML = `<h1 class="center">${translation_title}</h1>
      <div class="center italic">${translation_subtitle}</div>
      <div class="center italic top-margin">by</div>
      <div class="center large top-margin">${author_name}</div>
      <div class="center top-margin">${publication_date} ${publisher}</div>
      <div class="center">Read online at <a href=${edition_url}>SuttaCentral.com</a></div>
      <div class="center">${license_type}</div>
      `;

      descriptionPageArticle.innerHTML = `
<h2>Translation Description</h2>
<div>${translation_description}</div>
<h2>Translation Process</h2>
<div>${translation_process}</div>
<h2>License</h2>
<div>${license_type} (<a href="${license_url}">${license_abbreviation}</a>). ${license_statement}</div>
`;
      suttaTable.insertBefore(descriptionPageArticle, suttaTable.firstChild);
      suttaTable.insertBefore(titlePageArticle, suttaTable.firstChild);
    });
}
