import {
  loadAppointmentsFromFile,
  saveAppointmentsToFile,
} from "../services/fileServices.js";
import { v4 as uuidv4 } from "uuid";

export const addAnAppointment = (req, res) => {
  const { name, phone, time, date } = req.body;
  let appointments = loadAppointmentsFromFile();

  const existingIndex = appointments.findIndex((a) => a.phone === phone);

  if (existingIndex >= 0) {
    appointments[existingIndex] = {
      ...appointments[existingIndex],
      name,
      phone,
      time,
      date,
    };
    saveAppointmentsToFile(appointments);
    return res
      .status(200)
      .json({ message: "Appointment modified successfully." });
  }

  const newAppointment = {
    id: uuidv4(),
    name,
    phone,
    time,
    date,
  };

  appointments.push(newAppointment);
  saveAppointmentsToFile(appointments);

  res.status(201).json({
    message: "Appointment booked successfully.",
    appointment: newAppointment,
  });
};

export const getAllAppointments = (req, res) => {
  const appointments = loadAppointmentsFromFile();
  res.status(200).json(appointments);
};

export const getAnAppointmentByPhone = (req, res) => {
  const { phone } = req.params;
  const appointments = loadAppointmentsFromFile();

  const appointment = appointments.find((a) => a.phone === phone);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found." });
  }

  res.status(200).json(appointment);
};

export const updateAnAppointmentByPhone = (req, res) => {
  const ph = req.params.id;
  const { name, phone, time, date } = req.body;
  console.log(req.body);
  let appointments = loadAppointmentsFromFile();
  const index = appointments.findIndex((a) => a.phone === ph.trim());
  if (index >= 0) {
    // Update appointment
    appointments[index] = {
      ...appointments[index],
      name,
      phone,
      time,
      date,
    };
    saveAppointmentsToFile(appointments);
    return res
      .status(200)
      .json({ message: "Appointment updated successfully." });
  }

  res.status(404).json({ message: "Appointment not found." });
};

export const deleteAnAppointmentByPhone = (req, res) => {
  const phone = req.params.id;
  let appointments = loadAppointmentsFromFile();

  const index = appointments.findIndex((a) => a.phone === phone.trim());

  if (index >= 0) {
    // Delete appointment
    appointments.splice(index, 1);
    saveAppointmentsToFile(appointments);
    return res
      .status(200)
      .json({ message: "Appointment deleted successfully." });
  }

  res.status(404).json({ message: "Appointment not found." });
};
