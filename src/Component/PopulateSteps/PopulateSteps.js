import { populateWhyChooseUs } from "../Common/InformationCard/GenerateInformationCard.js";
document.addEventListener("DOMContentLoaded", () => {
  fetch("../mockData/PopulateStepsData.json")
    .then((response) => response.text())
    .then((data) => {
      populateWhyChooseUs("rent-steps-container", JSON.parse(data));
    });
});
