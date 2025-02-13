document.addEventListener("DOMContentLoaded", () => {
  var inspectionBlock = document.getElementById("editInspectionBlock");
  const localEmail = localStorage.getItem("carRentalEmailLogin");
  document.getElementById("backButton").addEventListener("click", (e) => {
    localStorage.removeItem("selectedCar");
    window.location.href = "./Selected.html";
  });

  fetch(
    "./netlify/functions/updateCarData/mockData/PopulateCarOptionsData.json"
  )
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
      if (
        !!localEmail &&
        localEmail.toLowerCase() == "admin@azoomcarrental.com"
      ) {
        document.getElementById("paymentBtn").classList.toggle("d-none");
        document.getElementById("RentalBlock").classList.toggle("d-none");
        inspectionBlock.classList.toggle("d-none");
      }
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
        availability.innerHTML = `<strong>Status: </strong>${carData.rentalStatus.availability}`;
        if (carData.rentalStatus.availability == "Available") {
          availability.classList.add(
            "status-badge",
            "bg-success",
            "text-white"
          );
        } else {
          if (
            localStorage.getItem("carRentalEmailLogin").toLowerCase() !=
            "admin@azoomcarrental.com"
          ) {
            document
              .getElementById("reservation-form")
              .classList.toggle("d-none");
          }
          availability.classList.add(
            "status-badge",
            "bg-warning",
            "text-danger"
          );
        }
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
            insurancePrice: parseFloat(
              carData.insurancePrice.split("$")[1]
            ).toFixed(2),
            total: caltotalPrice,
            duration: calculateTotalDuration(),
          })
        );

        vehicleCondition.innerHTML = `${carData.inspectionReport.vehicleCondition}`;
        if (
          ["Good", "New"].includes(carData.inspectionReport.vehicleCondition)
        ) {
          vehicleCondition.classList.add("alert", "alert-success");
        } else {
          vehicleCondition.classList.add("alert", "alert-warning");
        }
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

  inspectionBlock.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission
    const vehicleAvailability = document
      .getElementById("vehicleAvailability")
      .value.trim();
    const vehicleCondition = document
      .getElementById("vehicleCondition")
      .value.trim();
    const vehicleConditionDetail = document
      .getElementById("vehicleConditionDetail")
      .value.trim();
    const mileage = document.getElementById("mileage").value.trim();
    const batteryHealth = document.getElementById("batteryHealth").value.trim();
    const previousRenter = document
      .getElementById("previousRenter")
      .value.trim();
    const previousDuration = document
      .getElementById("previousDuration")
      .value.trim();
    const previousReturnDate = document
      .getElementById("previousReturnDate")
      .value.trim();

    // Prepare the data to send to the backend function
    const postData = {
      carModel: localStorage.getItem("carModel").replace(/-/g, " "),
      vehicleAvailability,
      vehicleCondition,
      vehicleConditionDetail,
      mileage,
      batteryHealth,
      previousRenter,
      previousDuration,
      previousReturnDate,
    };
    try {
      const CarDataDirectoryUrl = "../../netlify/functions/updateCarData";
      const CarDataFallbackRepoUrl = "../../.netlify/functions/updateCarData"; // Local fallback
    
      // Check if main directory is accessible
      const isAccessible = await tryAccessDirectory(CarDataDirectoryUrl);
    
      // Determine which URL to use
      const apiUrl = isAccessible ? CarDataDirectoryUrl : CarDataFallbackRepoUrl;
      console.log(`Using API URL: ${apiUrl}`);
    
      // Send POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
    
      const result = await response.json(); // Fix: Properly await JSON parsing
      console.log("Server Response:", result);
    
      if (response.ok) {
        alert("Inspection report updated successfully!");
    
        const storedBrand = localStorage.getItem("carBrand");
        const storedModel = localStorage.getItem("carModel");
        window.location.href = `Selected.html?Brand=${storedBrand}&CarModel=${storedModel}`;
      } else {
        alert(`Failed to update data: netlify cannot overwrite files using functions, but locally is successful`);
        window.location.href = `Selected.html?Brand=${storedBrand}&CarModel=${storedModel}`;
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Error updating data: " + error.message);
    }
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
// Function to try accessing a directory/file via HTTP request
function tryAccessDirectory(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        // If the response is successful (status 200), the resource is accessible
        return true;
      } else {
        // If the resource is not found or another error occurs
        return false;
      }
    })
    .catch(() => {
      // If there is an error making the request (e.g., network error), consider it inaccessible
      return false;
    });
}
