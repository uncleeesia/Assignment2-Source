import { populateWhyChooseUs } from "../Common/CardTemplate/PopulateContent.js";
document.addEventListener("DOMContentLoaded", () => {
  fetch("./src/Component/PopulateSteps/PopulateStepsData.json")
    .then((response) => response.text())
    .then((data) => {
      populateWhyChooseUs("rent-steps-container", JSON.parse(data));
    });
});
