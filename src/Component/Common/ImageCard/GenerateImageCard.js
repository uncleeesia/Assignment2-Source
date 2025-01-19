export function populateImageCard(PopulatingId, data) {
  // Fetch the template HTML file
  fetch("./src/component/Common/ImageCard/ImageCard.html")
    .then((response) => response.text()) // Ensure you get the HTML as text
    .then((htmlData) => {
      // Create a temporary container to hold the fetched HTML
      const templateContainer = new DOMParser().parseFromString(
        htmlData,
        "text/html"
      );

      // Get the template element (make sure it's in the fetched content)
      const template = templateContainer.querySelector("#card-template");

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
            const ImgElement = templateClone.querySelector("img");
            const hrefElement = templateClone.querySelector("a");
            const brandElement = templateClone.querySelector("small");
            const titleElement = templateClone.querySelector(".card-title");
            const descriptionElement =
              templateClone.querySelector(".card-text");

            hrefElement.href = `./Selected.html?Brand=${feature.Brand}&CarModel=${feature.Car.replace(
              / /g,
              "-"
            )}`;
            titleElement.textContent = feature.Car;
            descriptionElement.textContent = feature.ShortDescription;
            if (feature.ImgUrl) ImgElement.src = feature.ImgUrl;
            brandElement.textContent = `- ${feature.Brand}`;

            // Append the cloned and populated template to the container
            container.appendChild(templateClone);
          }
        });
      }
    })
    .catch((error) => console.error("Error loading template:", error));
}

// Call the function to populate the template when the page is ready
populateImageCard();
