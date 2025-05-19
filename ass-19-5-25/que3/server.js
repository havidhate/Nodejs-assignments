const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const DB_FILE = "./db.json";

// Utility to read data from db.json
function readData() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

// Utility to write data to db.json
function writeData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// POST /dishes → Add a new dish
app.post("/dishes", (req, res) => {
  const data = readData();
  const newDish = req.body;
  data.push(newDish);
  writeData(data);
  res.status(201).json({ message: "Dish added successfully", dish: newDish });
});

// GET /dishes → Retrieve all dishes
app.get("/dishes", (req, res) => {
  const data = readData();
  res.status(200).json(data);
});

// GET /dishes/:id → Retrieve a dish by its ID
app.get("/dishes/:id", (req, res) => {
  const data = readData();
  const dish = data.find(d => d.id == req.params.id);
  if (dish) {
    res.json(dish);
  } else {
    res.status(404).json({ message: "Dish not found" });
  }
});

// PUT /dishes/:id → Update a dish by its ID
app.put("/dishes/:id", (req, res) => {
  let data = readData();
  const index = data.findIndex(d => d.id == req.params.id);
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json({ message: "Dish updated", dish: data[index] });
  } else {
    res.status(404).json({ message: "Dish not found" });
  }
});

// DELETE /dishes/:id → Delete a dish by its ID
app.delete("/dishes/:id", (req, res) => {
  let data = readData();
  const filtered = data.filter(d => d.id != req.params.id);
  if (data.length === filtered.length) {
    return res.status(404).json({ message: "Dish not found" });
  }
  writeData(filtered);
  res.json({ message: "Dish deleted" });
});

// GET /dishes/get?name=... → Search for dishes by name (partial/case-insensitive)
app.get("/dishes/get", (req, res) => {
  const query = req.query.name?.toLowerCase();
  if (!query) return res.status(400).json({ message: "Name query param required" });

  const data = readData();
  const results = data.filter(d => d.name.toLowerCase().includes(query));

  if (results.length > 0) {
    res.json(results);
  } else {
    res.json({ message: "No dishes found" });
  }
});

// Handle undefined routes
app.use("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
