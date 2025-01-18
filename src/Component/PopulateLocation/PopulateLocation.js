import { populateWhyChooseUs } from "../Common/CardTemplate/PopulateContent.js";
document.addEventListener("DOMContentLoaded", () => {
  fetch("./src/Component/PopulateLocation/PopulateLocationData.json")
    .then((response) => response.text())
    .then((data) => {
      populateWhyChooseUs("locations-container", JSON.parse(data));
    });
});
