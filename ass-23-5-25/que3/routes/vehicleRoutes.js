const express = require("express");
const router = express.Router();
const vc = require("../controllers/vehicleController");

// CRUD
router.post("/", vc.createVehicle);
router.get("/", vc.getAllVehicles);

// Trip Operations
router.post("/:id/trips", vc.addTrip);
router.put("/:id/trips/:tripId", vc.updateTrip);
router.delete("/:id/trips/:tripId", vc.deleteTrip);

// Queries
router.get("/query/long-trips", vc.tripsOver200km);
router.get("/query/from-cities", vc.tripsFromCities);
router.get("/query/after-2024", vc.tripsAfterDate);
router.get("/query/type-car-truck", vc.carsOrTrucks);

module.exports = router;
