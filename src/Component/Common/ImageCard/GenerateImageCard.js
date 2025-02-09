export function populateImageCard(PopulatingId, data) {
  fetch("./src/component/Common/ImageCard/ImageCard.html")
    .then((response) => response.text())
    .then((htmlData) => {
      const templateContainer = new DOMParser().parseFromString(
        htmlData,
        "text/html"
      );
      const template = templateContainer.querySelector("#card-template");
      const container = document.getElementById(PopulatingId);
      const windowWidth = window.innerWidth;
      const cardsToShow = windowWidth >= 1200 ? 6 : windowWidth >= 1000 ? 4 : 2;
      if (template && container) {
        const features = data;
        const hiddenElements = []; // Store elements to toggle on scroll

        features.forEach((feature, index) => {
          if (feature) {
            const templateClone = template.content.cloneNode(true);
            const ImgElement = templateClone.querySelector("img");
            const hrefElement = templateClone.querySelector("a");
            const brandElement = templateClone.querySelector("small");
            const titleElement = templateClone.querySelector(".card-title");
            const descriptionElement =
              templateClone.querySelector(".card-text");

            hrefElement.href = `./Selected.html?Brand=${
              feature.brand
            }&CarModel=${feature.car.replace(/ /g, "-")}`;

            // Show first 3 elements, hide the rest
            if (index >= cardsToShow) {
              hrefElement.classList.add("d-none");
              hiddenElements.push(hrefElement); // Store hidden elements
            }

            titleElement.textContent = feature.car;
            descriptionElement.textContent = feature.shortDescription;
            if (feature.imgUrl) ImgElement.src = feature.imgUrl;
            brandElement.textContent = `- ${feature.brand}`;

            container.appendChild(templateClone);
          }
        });

        // Single global scroll event listener
        let hasToggled = false;
        window.addEventListener("scroll", () => {
          if (hasToggled) return; // Prevent multiple triggers

          let scrollPosition = window.scrollY;
          let togglePosition = 30; // Adjust as needed

          if (scrollPosition > togglePosition) {
            hiddenElements.forEach((el) => {
              el.classList.remove("d-none");
              el.classList.add("ImageSlide"); // Add animation class
            });
            hasToggled = true; // Prevent re-executing
          }
        });
      }
    })
    .catch((error) => console.error("Error loading template:", error));
}

// Call function to populate cards
populateImageCard();
