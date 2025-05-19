const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "db.json");

const readTodos = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const writeTodos = (todos) => {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

module.exports = { readTodos, writeTodos };
