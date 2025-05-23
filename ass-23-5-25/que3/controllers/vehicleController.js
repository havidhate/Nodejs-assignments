const Vehicle = require("../models/Vehicle");

// Vehicle CRUD
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Trip operations
exports.addTrip = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    vehicle.trips.push(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    const trip = vehicle.trips.id(req.params.tripId);
    Object.assign(trip, req.body);
    await vehicle.save();
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    vehicle.trips.id(req.params.tripId).remove();
    await vehicle.save();
    res.status(200).json({ message: "Trip deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔍 Advanced Queries
exports.tripsOver200km = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ "trips.distance": { $gt: 200 } });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.tripsFromCities = async (req, res) => {
  const cities = ["Delhi", "Mumbai", "Bangalore"];
  try {
    const vehicles = await Vehicle.find({ "trips.startLocation": { $in: cities } });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.tripsAfterDate = async (req, res) => {
  try {
    const date = new Date("2024-01-01");
    const vehicles = await Vehicle.find({ "trips.startTime": { $gte: date } });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.carsOrTrucks = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ type: { $in: ["car", "truck"] } });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
