import { populateImageCard } from "../Common/ImageCard/GenerateImageCard.js";
document.addEventListener("DOMContentLoaded", () => {
  fetch("./src/Component/PopulateCarOptions/PopulateCarOptionsData.json")
    .then((response) => response.text())
    .then((rawData) => {
      const inputField = document.getElementById("input-datalist");

      const data = JSON.parse(rawData);

      let carBrands = [];
      data.forEach((car) => {
        carBrands.push(`${car.Brand}/${car.Car}`);
      });
      carBrands = [...new Set(carBrands)];
      const dropdownMenu = document.querySelector(
        "#dropdownCarBrand .dropdown-menu"
      );
      const dropdownButton = document.querySelector("#dropdownMenuButton");

      // Reference to the datalist element
      const datalist = document.getElementById("list-car-brands");
      // Loop through the car brands and create an <option> for each one
      var uniqueCarBrand = [];
      carBrands.forEach((brand) => {
        const option = document.createElement("option");
        var carModel = brand.split("/");
        option.label = carModel[0];
        option.value = carModel[1];
        uniqueCarBrand.push(carModel[0]);
        datalist.appendChild(option);
      });
      uniqueCarBrand = [...new Set(uniqueCarBrand)];
      uniqueCarBrand.unshift("All");
      uniqueCarBrand.forEach((brand) => {
        const item = document.createElement("a");
        item.classList.add("dropdown-item");
        item.href = `#${brand}`;
        item.textContent = brand;
        item.addEventListener("click", function () {
          dropdownButton.textContent = brand; // Update button text to selected brand
          // Filter data based on selected brand and search query
          document.getElementById("input-datalist").value = "";
          filterData(brand, document.getElementById("input-datalist").value);
        });

        dropdownMenu.appendChild(item);
      });
      function filterData(selectedBrand, searchQuery) {
        let filteredData = [];

        // Filter by selected brand
        if (selectedBrand === "All") {
          filteredData = data; // Show all cars when "All" is selected
        } else {
          filteredData = data.filter(
            (item) => item.Brand.toLowerCase() === selectedBrand.toLowerCase()
          );
        }

        // Further filter by search query (case-insensitive)
        if (searchQuery) {
          filteredData = filteredData.filter(
            (item) =>
              item.Brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.Car.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Clear and repopulate the image cards with filtered data
        const container = document.getElementById("CarOption-Container");
        container.innerHTML = ""; // Clear the container
        // Call the function to populate image cards with filtered data
        populateImageCard("CarOption-Container", filteredData);
      }
      populateImageCard("CarOption-Container", data);

      inputField.addEventListener("input", function (event) {
        dropdownButton.textContent = "Select Car Brand";
        // Filter the data based on input (case-insensitive)
        let filteredData = data;

        filteredData = data.filter(
          (item) =>
            item.Brand.toLowerCase().includes(
              event.target.value.toLowerCase()
            ) ||
            item.Car.toLowerCase().includes(event.target.value.toLowerCase())
        );
        // Call the function to populate image cards with filtered data
        const container = document.getElementById("CarOption-Container");
        container.innerHTML = "";
        populateImageCard("CarOption-Container", filteredData);
      });
    });
});
