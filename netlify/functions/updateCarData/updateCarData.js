const fs = require("fs");
const path = require("path");

const getFilePath = (fileName) => {
  const tmpDir = "/tmp"; // Temporary directory
  const tmpFilePath = path.join(tmpDir, fileName);
  const localFilePath = path.join(__dirname, "mockData", fileName);

  // Check if /tmp/ exists and is writable
  if (fs.existsSync(tmpDir)) {
    try {
      if (!fs.existsSync(tmpFilePath)) {
        console.log(`Copying ${fileName} to /tmp/...`);
        fs.copyFileSync(localFilePath, tmpFilePath);
      }
      console.log(`Using /tmp/ version of ${fileName}`);
      return tmpFilePath;
    } catch (error) {
      console.error(`Failed to copy ${fileName} to /tmp/:`, error);
    }
  }

  // Fallback to local mockData directory
  console.warn(`Using local mockData version of ${fileName}`);
  return localFilePath;
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  const data = JSON.parse(event.body);
  const fileName = "PopulateCarOptionsData.json";
  const filePath = getFilePath(fileName);

  try {
    console.log("__dirname:", __dirname);
    console.log("File Path:", filePath);

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

    console.log("Updating data...");
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

    console.log("Writing to file...");
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data updated successfully" }),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error }),
    };
  }
};
