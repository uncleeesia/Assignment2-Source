const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    // Parse the incoming data from the frontend
    const data = JSON.parse(event.body);
    const filePath = path.resolve(
      __dirname,
      "../../mockData/PopulateCarOptionsData.json"
    );
    console.log("trying")
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      let jsonData = JSON.parse(fileContent);

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
      console.log("uploading")
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Data updated successfully" }),
      };
    } catch (error) {
      console.log("error",error)

      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Server Error"}),
      };
    }
  }
  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
  };
};
