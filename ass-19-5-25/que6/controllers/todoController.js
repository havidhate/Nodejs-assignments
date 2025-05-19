const { readTodos, writeTodos } = require("../models/todoModel");

const getAllTodos = (req, res) => {
    const todos = readTodos();
    res.json(todos);
};

const addTodo = (req, res) => {
    const { title, completed } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const todos = readTodos();
    const newTodo = {
        id: Date.now(),
        title,
        completed: completed || false,
    };
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todos = readTodos();
    const index = todos.findIndex(todo => todo.id == id);
    if (index === -1) return res.status(404).json({ message: "Todo not found" });

    if (title !== undefined) todos[index].title = title;
    if (completed !== undefined) todos[index].completed = completed;
    writeTodos(todos);
    res.json(todos[index]);
};

const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todos = readTodos();
    const updatedTodos = todos.filter(todo => todo.id != id);
    if (todos.length === updatedTodos.length) {
        return res.status(404).json({ message: "Todo not found" });
    }
    writeTodos(updatedTodos);
    res.json({ message: `Todo with id ${id} deleted` });
};

const searchTodos = (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Query is required" });

    const todos = readTodos();
    const result = todos.filter(todo =>
        todo.title.toLowerCase().includes(q.toLowerCase())
    );
    res.json(result);
};

module.exports = {
    getAllTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    searchTodos,
};
