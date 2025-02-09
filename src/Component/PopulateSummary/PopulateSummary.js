document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("backButton").addEventListener("click", (e) => {
    localStorage.removeItem("selectedCar");
    window.location.href = "./Selected.html";
  });

  fetch("../mockData/PopulateCarOptionsData.json")
    .then((response) => response.text())
    .then((data) => {
      var brandParams = localStorage.getItem("carBrand");
      var carModelParams = localStorage.getItem("carModel");
      if (!brandParams && !carModelParams)
        alert("Please select valid car. Redirect to car fleet...");

      var filteredData = JSON.parse(data).filter(
        (x) =>
          x.brand.toLowerCase() == brandParams &&
          x.car.replace(/ /g, "-").toLowerCase() == carModelParams
      );

      filteredData.forEach((carData) => {
        localStorage.setItem("selectedCar", JSON.stringify(carData));

        const imgUrl = document.getElementById("summaryImgUrl");
        const carModel = document.getElementById("summaryCarModel");
        const carBrand = document.getElementById("summaryCarBrand");
        const shortDescription = document.getElementById(
          "summaryShortDescription"
        );
        const range = document.getElementById("summaryRange");
        const horsepower = document.getElementById("summaryHorsepower");
        const mph = document.getElementById("summaryZeroToSixty");
        const chargingTime = document.getElementById("summaryChargingTime");
        const capacity = document.getElementById("summarySeatingCapacity");
        const driveType = document.getElementById("summaryDriveType");

        const availability = document.getElementById("summaryAvailability");
        const lastUpdated = document.getElementById("summaryLastUpdated");
        const currentLocation = document.getElementById(
          "summaryCurrentLocation"
        );
        const returnLocation = document.getElementById("summaryReturnLocation");
        const vehicleCondition = document.getElementById(
          "summaryVehicleCondition"
        );
        const pricePerDay = document.getElementById("summaryPricePerDay");
        const pickUpDate = document.getElementById("summaryPickUpDate");
        const returnDate = document.getElementById("summaryReturnDate");
        const totalPrice = document.getElementById("summaryTotalPrice");
        const mileage = document.getElementById("summaryMileage");
        const batteryHealth = document.getElementById("summaryBatteryHealth");
        const previousReturnDate = document.getElementById(
          "summaryPreviousReturnDate"
        );
        const previousDuration = document.getElementById(
          "summaryPreviousDuration"
        );
        const totalDuration = document.getElementById("summaryTotalDuration");
        const caltotalPrice = calculateTotalPrice(carData.pricePerDay);

        imgUrl.src = carData.imgUrl;
        lastUpdated.innerHTML = `<strong>Last updated: </strong>${carData.rentalStatus.lastUpdated}`;
        carModel.innerHTML = carData.car;
        carBrand.innerHTML = carData.brand;
        shortDescription.innerHTML = carData.shortDescription;
        range.innerHTML = `${carData.specifications.range}`;
        horsepower.innerHTML = `${carData.specifications.horsepower}`;
        mph.innerHTML = `${carData.specifications.zeroToSixty}`;
        chargingTime.innerHTML = `${carData.specifications.chargingTime}`;
        capacity.innerHTML = `${carData.specifications.seatingCapacity}`;
        driveType.innerHTML = `${carData.specifications.driveType}`;
        availability.innerHTML = `${carData.rentalStatus.availability}`;
        pricePerDay.innerHTML = `<strong>Rental Per Day:</strong> <br>${carData.pricePerDay}`;
        currentLocation.innerHTML = `${carData.rentalStatus.currentLocation.title}, ${carData.rentalStatus.currentLocation.description}`;
        returnLocation.innerHTML = `${localStorage.getItem("returnLocation")}`;
        pickUpDate.innerHTML = `${localStorage.getItem("pickupDate")}`;
        returnDate.innerHTML = `${localStorage.getItem("returnDate")}`;
        totalDuration.innerHTML = `${calculateTotalDuration()} Day(s)`;
        totalPrice.innerHTML = `$${caltotalPrice}`;
        localStorage.setItem(
          "paymentDetails",
          JSON.stringify({
            "insurancePrice": parseFloat(carData.insurancePrice.split("$")[1]).toFixed(
              2
            ),
            "total": caltotalPrice,
            "duration": calculateTotalDuration(),
          })
        );

        vehicleCondition.innerHTML = `${carData.inspectionReport.vehicleCondition}`;
        mileage.innerHTML = `${carData.inspectionReport.mileage}`;
        batteryHealth.innerHTML = `${carData.inspectionReport.batteryHealth}`;
        previousDuration.innerHTML = `${
          !!carData.previousRental ? carData.previousRental.duration : "N/A"
        }`;
        previousReturnDate.innerHTML = `${
          !!carData.previousRental ? carData.previousRental.returnDate : "N/A"
        }`;
      });
    });
});
function calculateTotalPrice(rentalPrice = 0) {
  var price = rentalPrice.split("$")[1];

  // Calculate the difference in millisecnds
  var diffInMs = calculateTotalDuration();
  return `${(price * (diffInMs + 1)).toFixed(2)}`;
}

function calculateTotalDuration() {
  const start = new Date(localStorage.getItem("pickupDate"));
  const end = new Date(localStorage.getItem("returnDate"));
  // Calculate the difference in millisecnds
  var diffInMs = (end - start) / (1000 * 60 * 60 * 24);
  return diffInMs <= 0 ? 1 : diffInMs;
}
