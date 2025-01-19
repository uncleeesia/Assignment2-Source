import { populateWhyChooseUs } from "../Common/InformationCard/GenerateInformationCard.js";
document.addEventListener("DOMContentLoaded", () => {
  fetch("./src/Component/PopulateChooseUs/PopulateChooseUsData.json")
    .then((response) => response.text())
    .then((data) => {
      populateWhyChooseUs("why-choose-us-container", JSON.parse(data));
    });
});
