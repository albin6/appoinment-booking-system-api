const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "../../data/appointments.txt");

exports.readFromFile = async () => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

exports.saveToFile = async (appointments) => {
  try {
    await fs.writeFile(
      filePath,
      JSON.stringify(appointments, null, 2),
      "utf-8"
    );
  } catch (err) {
    throw new Error("Failed to save appointments");
  }
};
