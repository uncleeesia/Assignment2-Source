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
      var urlParams = new URLSearchParams(window.location.search);
      var brandParams = urlParams.get("Brand");
      var carModelParams = urlParams.get("CarModel");

      if (!brandParams && !!localStorage.getItem("carBrand")) {
        urlParams.set("Brand", localStorage.getItem("carBrand"));
        urlParams.set("CarModel", localStorage.getItem("carModel"));
        brandParams = urlParams.get("Brand").toLowerCase();
        carModelParams = urlParams.get("CarModel").toLowerCase();
      } else if (!!brandParams) {
        brandParams = urlParams.get("Brand").toLowerCase();
        carModelParams = urlParams.get("CarModel").toLowerCase();
      } else {
        brandParams = localStorage.getItem("carBrand");
        carModelParams = localStorage.getItem("carModel");
      }
      if (!!brandParams) {
        localStorage.setItem("carBrand", brandParams);
        localStorage.setItem("carModel", carModelParams);
      }

      var filteredData = JSON.parse(data).filter(
        (x) =>
          x.brand.toLowerCase() == brandParams &&
          x.car.replace(/ /g, "-").toLowerCase() == carModelParams
      );

      filteredData.forEach((carData) => {
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
