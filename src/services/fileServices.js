import fs from "fs";
import path from "path";

const appointmentsFile = path.resolve("src/data/appointments.txt");

export const saveAppointmentsToFile = (appointments) => {
  const dirPath = path.dirname(appointmentsFile);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(
    appointmentsFile,
    JSON.stringify(appointments, null, 2),
    "utf-8"
  );
};

export const loadAppointmentsFromFile = () => {
  if (fs.existsSync(appointmentsFile)) {
    const data = fs.readFileSync(appointmentsFile, "utf-8");
    return JSON.parse(data || "[]");
  }
  return [];
};
