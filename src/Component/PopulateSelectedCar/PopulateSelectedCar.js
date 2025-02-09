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
  fetch("../mockData/PopulateLocationData.json")
  .then((response)=>response.json())
  .then((data)=>{
    const returnLocationDropdown = document.getElementById("returnLocation");

    data.forEach(location => {
        const option = document.createElement("option");
        option.value = `${location.title}, ${location.description}`;
        option.textContent = `${location.title}, ${location.description}`;
        returnLocationDropdown.appendChild(option);
    });
  })
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

        const availability = document.getElementById("availability");
        const currentLocation = document.getElementById("currentLocation");
        const vehicleCondition = document.getElementById("vehicleCondition");
        const pricePerDay = document.getElementById("pricePerDay");

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
        availability.innerHTML = `<strong>Status: </strong>${carData.rentalStatus.availability}`;
        if (carData.rentalStatus.availability == "Available") {
          availability.classList.add(
            "status-badge",
            "bg-success",
            "text-white"
          );
        } else {
          document.getElementById("reserveBtn").classList.toggle("d-none");
          document.getElementById("reservation-form").classList.toggle("d-none");
          availability.classList.add(
            "status-badge",
            "bg-warning",
            "text-danger"
          );
        }

        currentLocation.innerHTML = `<strong>Current Location: </strong>${carData.rentalStatus.currentLocation.title}, ${carData.rentalStatus.currentLocation.description}`;
        if (
          ["Good", "New"].includes(carData.inspectionReport.vehicleCondition)
        ) {
          vehicleCondition.classList.add(
            "status-badge",
            "bg-success",
            "text-white"
          );
        } else {
          vehicleCondition.classList.add(
            "status-badge",
            "bg-warning",
            "text-danger"
          );
        }
        vehicleCondition.innerHTML = `<strong style="color=#333 !important;">Condition: </strong>${carData.inspectionReport.vehicleCondition}`;
        pricePerDay.innerHTML = `<strong>Price / Day: </strong>${carData.pricePerDay}`;
      });
    });
});
