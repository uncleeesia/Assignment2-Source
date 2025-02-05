import { populateWhyChooseUs } from "../Common/InformationCard/GenerateInformationCard.js";
document.addEventListener("DOMContentLoaded", () => {
  fetch("../mockData/PopulateInformationsData.json")
    .then((response) => response.text())
    .then((data) => {
      var filteredData = JSON.parse(data).filter((x) => x.type == "1");
      populateWhyChooseUs("rental-process-container", filteredData);
    });
  fetch("../mockData/PopulateInformationsData.json")
    .then((response) => response.text())
    .then((data) => {
      var filteredData = JSON.parse(data).filter((x) => x.type == "2");
      populateWhyChooseUs("final-process-container", filteredData);
    });
  fetch("../mockData/PopulateCarOptionsData.json")
    .then((response) => response.text())
    .then((data) => {
      // Get the URL parameters
      const urlParams = new URLSearchParams(window.location.search);

      // Retrieve values
      const brandParams = urlParams.get("Brand").toLowerCase();
      const carModelParams = urlParams.get("CarModel").toLowerCase();
      var filteredData = JSON.parse(data).filter(
        (x) =>
          x.brand.toLowerCase() == brandParams &&
          x.car.replace(/ /g, "-").toLowerCase() == carModelParams
      );

      filteredData.forEach((carData) => {
        // Get elements by ID
        const imgUrl = document.getElementById("imgUrl");
        const carModel = document.getElementById("carModel");
        const carBrand = document.getElementById("carBrand");
        const shortDescription = document.getElementById("shortDescription");

        const range = document.getElementById("Range");
        const horsepower = document.getElementById("Horsepower");
        const mph = document.getElementById("mph");
        const chargingTime = document.getElementById("ChargingTime");
        const capacity = document.getElementById("Capacity");
        const driveType = document.getElementById("DriveType");

        imgUrl.src = carData.imgUrl;
        carModel.innerHTML = carData.car;
        carBrand.innerHTML = carData.brand;
        shortDescription.innerHTML = carData.shortDescription;

        range.innerHTML = `<strong>Range: </strong>${carData.specifications.range}`;
        horsepower.innerHTML = `<strong>Horsepower: </strong>${carData.specifications.horsepower}`;
        mph.innerHTML = `<strong>0-60 mph: </strong>${carData.specifications.zeroToSixty}`;
        chargingTime.innerHTML = `<strong>Charging Time: </strong>${carData.specifications.chargingTime}`;
        capacity.innerHTML = `<strong>Seating Capacity: </strong>${carData.specifications.seatingCapacity}`;
        driveType.innerHTML = `<strong>Drive Type: </strong>${carData.specifications.driveType}`;
      });
    });
});
