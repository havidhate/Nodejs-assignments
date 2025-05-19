const express = require("express");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
app.use(express.json());

app.use("/todos", todoRoutes);

app.get((req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
