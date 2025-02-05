export function populateWhyChooseUs(PopulatingId, data) {
  // Fetch the template HTML file
  fetch("./src/component/Common/InformationCard/InformationCard.html")
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
            const div = templateClone.querySelector(".informationCard");
            const titleElement = templateClone.querySelector(".feature");
            const descriptionElement = templateClone.querySelector(".title");

            switch (feature.type) {
              case "1":
                div.classList.add("pt-3", "col-lg-3", "col-md-12", "col-sm-12");
                break;
              case "2":
                div.classList.add("pt-3", "col-lg-5", "col-md-12", "col-sm-12");
                break;
              case "3":
                div.classList.add("pt-3", "col-lg-3", "col-md-12", "col-sm-12");
                break;
              case "4":
                div.classList.add("pt-3", "col-lg-3", "col-md-12", "col-sm-12");
                break;
              default:
                div.classList.add("pt-3", "col-lg-3", "col-md-12", "col-sm-12");
            }
            if (["4", "3"].includes(feature.type)) {
              div.classList.add("pt-3", "col-lg-3", "col-md-12", "col-sm-12");
            }

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
