export function populateWhyChooseUs(PopulatingId, data) {
  // Fetch the template HTML file
  fetch("./src/component/Common/CardTemplate/CardTemplate.html")
    .then((response) => response.text()) // Ensure you get the HTML as text
    .then((htmlData) => {
      // Create a temporary container to hold the fetched HTML
      const templateContainer = new DOMParser().parseFromString(
        htmlData,
        "text/html"
      );

      // Get the template element (make sure it's in the fetched content)
      const template = templateContainer.querySelector(
        "#why-choose-us-template"
      );

      const container = document.getElementById(PopulatingId);

      if (template && container) {
        // Ensure the features array is defined and contains data
        const features = data;

        // Loop through the features and populate them
        features.forEach((feature) => {
          if (feature) {
            // Clone the template content
            const templateClone = template.content.cloneNode(true);
            // Populate the template's elements
            const titleElement = templateClone.querySelector(".feature");
            const descriptionElement = templateClone.querySelector(".title");

            titleElement.textContent = feature.title;
            descriptionElement.textContent = feature.description;

            // Append the cloned and populated template to the container
            container.appendChild(templateClone);
          }
        });
      }
    })
    .catch((error) => console.error("Error loading template:", error));
}

// Call the function to populate the template when the page is ready
populateWhyChooseUs();
