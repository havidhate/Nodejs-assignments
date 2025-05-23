const express = require("express");
const app = express();
const ticketRoutes = require("./routes/ticketRoutes");

app.use(express.json());
app.use("/tickets", ticketRoutes);

app.get((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
