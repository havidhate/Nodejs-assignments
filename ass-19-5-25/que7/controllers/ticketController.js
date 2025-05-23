const { readTickets, writeTickets } = require("../models/ticketModel");

function getAllTickets(req, res) {
  const tickets = readTickets();
  res.status(200).json(tickets);
}

function getTicketById(req, res) {
  const tickets = readTickets();
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.status(200).json(ticket);
}

function createTicket(req, res) {
  const tickets = readTickets();
  const newTicket = {
    id: tickets.length + 1,
    ...req.body,
    status: "pending"
  };
  tickets.push(newTicket);
  writeTickets(tickets);
  res.status(201).json(newTicket);
}

function updateTicket(req, res) {
  const tickets = readTickets();
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  ticket.title = req.body.title || ticket.title;
  ticket.description = req.body.description || ticket.description;
  ticket.priority = req.body.priority || ticket.priority;

  writeTickets(tickets);
  res.status(200).json(ticket);
}

function deleteTicket(req, res) {
  let tickets = readTickets();
  const initialLength = tickets.length;
  tickets = tickets.filter(t => t.id !== parseInt(req.params.id));
  if (tickets.length === initialLength) return res.status(404).json({ error: "Ticket not found" });

  writeTickets(tickets);
  res.status(204).send();
}

function resolveTicket(req, res) {
  const tickets = readTickets();
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  ticket.status = "resolved";
  writeTickets(tickets);
  res.status(200).json(ticket);
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  resolveTicket
};
