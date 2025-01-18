import { populateFeedback } from "../Common/FeedBackCard/FeedBackCard.js";
document.addEventListener("DOMContentLoaded", () => {
  fetch("./src/Component/PopulateCustomerFeedBack/PopulateCustomerFeedBackData.json")
    .then((response) => response.text())
    .then((data) => {
      populateFeedback("feedback-container", JSON.parse(data));
    });
});
