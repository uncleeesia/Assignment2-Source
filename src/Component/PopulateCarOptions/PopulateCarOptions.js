import { populateImageCard } from "../Common/ImageCard/GenerateImageCard.js";

document.addEventListener("DOMContentLoaded", () => {
  fetch("../mockData/PopulateCarOptionsData.json")
    .then((response) => response.json())
    .then((data) => {
      const inputField = document.getElementById("input-datalist");
      const dropdownMenu = document.querySelector("#dropdownCarBrand .dropdown-menu");
      const dropdownButton = document.querySelector("#dropdownMenuButton");
      const datalist = document.getElementById("list-car-brands");
      const container = document.getElementById("CarOption-Container");

      // Preprocess data for faster lookups
      const carBrandsSet = new Set();
      const brandModelsMap = new Map();

      data.forEach((car) => {
        carBrandsSet.add(car.brand);
        if (!brandModelsMap.has(car.brand)) {
          brandModelsMap.set(car.brand, []);
        }
        brandModelsMap.get(car.brand).push(car.car);
      });

      const carBrands = Array.from(carBrandsSet).sort();
      carBrands.unshift("All");

      // Populate dropdown menu
      carBrands.forEach((brand) => {
        const item = document.createElement("a");
        item.classList.add("dropdown-item");
        item.href = `#${brand}`;
        item.textContent = brand;
        item.addEventListener("click", () => {
          dropdownButton.textContent = brand;
          inputField.value = "";
          filterData(brand, "");
        });
        dropdownMenu.appendChild(item);
      });

      // Populate datalist
      data.forEach((car) => {
        const option = document.createElement("option");
        option.label = car.brand;
        option.value = car.car;
        datalist.appendChild(option);
      });

      // Filter data function
      function filterData(selectedBrand, searchQuery) {
        let filteredData = data;

        // Filter by brand if not "All"
        if (selectedBrand !== "All") {
          filteredData = brandModelsMap.has(selectedBrand)
            ? filteredData.filter((car) => car.brand === selectedBrand)
            : [];
        }

        // Further filter by search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredData = filteredData.filter(
            (car) =>
              car.brand.toLowerCase().includes(query) ||
              car.car.toLowerCase().includes(query)
          );
        }

        // Populate image cards with filtered data
        container.innerHTML = "";
        populateImageCard("CarOption-Container", filteredData);
      }

      // Initial population of image cards
      populateImageCard("CarOption-Container", data);

      // Search input event listener
      inputField.addEventListener("input", (event) => {
        dropdownButton.textContent = "Select Car Brand";
        const searchQuery = event.target.value;
        filterData("All", searchQuery);
      });
    });
});
