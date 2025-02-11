import { populateWhyChooseUs } from "../Common/InformationCard/GenerateInformationCard.js";
document.addEventListener("DOMContentLoaded", () => {
  fetch("../netlify/functions/mockData/PopulateLocationData.json")
    .then((response) => response.text())
    .then((data) => {
      populateWhyChooseUs("locations-container", JSON.parse(data));
    });
});
