// Example data to populate the template
const features = [
  {
    title: "Wide Range of Cars",
    description: "Choose from a variety of cars to suit your needs.",
  },
  {
    title: "Affordable Prices",
    description: "Get the best deals and discounts on rentals.",
  },
  {
    title: "24/7 Support",
    description: "We're here to help you anytime, anywhere.",
  },
];

// Function to populate the "Why Choose Us" template
function populateWhyChooseUs() {
  const template = document.getElementById("why-choose-us-template");
  const container = document.getElementById("why-choose-us-container");

  // Clone the template content
  const clone = document.importNode(template.content, true);

  // Select the container inside the cloned template
  const featureContainer = clone.querySelector(".why-choose-us");

  // Loop through the features and populate them
  features.forEach((feature) => {
    if (!!feature) {
        console.log(feature.title)
      const featureClone = document.createElement("div");
      featureClone.classList.add("feature");

      const titleElement = document.createElement("h3");
      titleElement.classList.add("title");
      titleElement.textContent = feature.title;

      const descriptionElement = document.createElement("p");
      descriptionElement.classList.add("description");
      descriptionElement.textContent = feature.description;

      // Append the elements to the feature div
      featureClone.appendChild(titleElement);
      featureClone.appendChild(descriptionElement);

      // Append the feature to the container
      featureContainer.appendChild(featureClone);
    }
  });

  // Append the populated clone to the main container
  container.appendChild(clone);
}

// Call the function to populate the template when the page is ready
populateWhyChooseUs();
