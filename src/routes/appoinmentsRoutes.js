import express from "express";
const appointmentRouter = express.Router();

appointmentRouter.post("/appointments");
appointmentRouter.get("/appointments");
appointmentRouter.get("/appointments/:id");
appointmentRouter.put("/appointments/:id");
appointmentRouter.delete("/appointments/:id");
