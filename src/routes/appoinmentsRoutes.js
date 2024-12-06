import express from "express";
import {
  addAnAppointment,
  deleteAnAppointmentByPhone,
  getAllAppointments,
  getAnAppointmentByPhone,
  updateAnAppointmentByPhone,
} from "../controllers/appointments.controller.js";
const appointmentRouter = express.Router();

appointmentRouter.post("/", addAnAppointment);
appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/:id", getAnAppointmentByPhone);
appointmentRouter.put("/:id", updateAnAppointmentByPhone);
appointmentRouter.delete("/:id", deleteAnAppointmentByPhone);

export default appointmentRouter;
