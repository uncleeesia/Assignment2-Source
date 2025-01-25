import { populateFeedback } from "../Common/FeedBackCard/GenerateFeedBackCard.js";
document.addEventListener("DOMContentLoaded", () => {
  fetch("../mockData/PopulateCustomerFeedBackData.json")
    .then((response) => response.text())
    .then((data) => {
      populateFeedback("feedback-container", JSON.parse(data));
    });
});
