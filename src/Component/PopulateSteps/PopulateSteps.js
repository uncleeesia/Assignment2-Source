import { populateWhyChooseUs } from "../Common/InformationCard/GenerateInformationCard.js";
document.addEventListener("DOMContentLoaded", () => {
  fetch("../netlify/functions/mockData/PopulateInformationsData.json")
    .then((response) => response.text())
    .then((data) => {
      var filteredData = JSON.parse(data).filter((x) => x.type == "3");
      populateWhyChooseUs("rent-steps-container", filteredData);
    });
});
