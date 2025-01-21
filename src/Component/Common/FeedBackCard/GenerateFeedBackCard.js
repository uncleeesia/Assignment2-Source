export function populateFeedback(PopulatingId, data) {
  // Fetch the template HTML file
  fetch("./src/component/Common/FeedBackCard/FeedBackCard.html")
    .then((response) => response.text())
    .then((htmlData) => {
      const templateContainer = new DOMParser().parseFromString(
        htmlData,
        "text/html"
      );

      const template = templateContainer.querySelector("#feedback-template");

      const container = document.getElementById(PopulatingId);

      if (template && container) {
        // Array of feedback data
        const feedbacks = data;

        // Add each feedback to the section
        feedbacks.forEach((feedback) => {
          if (feedback) {
            const templateClone = template.content.cloneNode(true);

            const pText = templateClone.querySelectorAll("p")[0];
            const pAuthor = templateClone.querySelectorAll("p")[1];

            pText.textContent = feedback.text;
            pAuthor.textContent = `- ${feedback.author}`;

            container.appendChild(templateClone);
          }
        });
      }
    })
    .catch((error) => console.error("Error loading template:", error));
}

// Call the function to populate the template when the page is ready
populateFeedback();
