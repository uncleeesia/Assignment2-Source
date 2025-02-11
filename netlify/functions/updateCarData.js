const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    // Parse the incoming data from the frontend
    const data = JSON.parse(event.body);
    // The path to your JSON file (ensure this file is committed to your repository)
    const filePath = path.resolve(
      __dirname,
      "../../mockData/PopulateCarOptionsData.json"
    );

    try {
      // Read the current data
      const fileContent = fs.readFileSync(filePath, "utf-8");
      let jsonData = JSON.parse(fileContent);

      // Find and update the relevant car data
      let carData = jsonData.find(
        (car) => car.car.toLowerCase() === data.carModel.toLowerCase()
      );

      if (!carData) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Car data not found" }),
        };
      }
      jsonData.forEach((car) => {
        if (car.car.toLowerCase() === data.carModel.toLowerCase()) {
          if (!!data.vehicleAvailability)
            car.rentalStatus.availability = data.vehicleAvailability;
          if (!!data.vehicleCondition)
            car.inspectionReport.vehicleCondition = data.vehicleCondition;
          if (!!data.vehicleConditionDetail)
            car.inspectionReport.vehicleConditionDetail =
              data.vehicleConditionDetail;
          if (!!data.mileage)
            car.inspectionReport.mileage = `${data.mileage} km`;
          if (!!data.batteryHealth)
            car.inspectionReport.batteryHealth = `${data.batteryHealth}%`;
          if (!!data.previousRenter)
            car.rentalStatus.previousRenter = data.previousRenter;
        }
      });

      // Update the data based on the incoming request (similar to the logic in your frontend)

      // Save the updated data back to the file (overwrite)
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Data updated successfully" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal server error" }),
      };
    }
  }
  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
  };
};
