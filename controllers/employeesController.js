const data = {};
data.employees = require("../model/data.json");

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createEmployee = (req, res) => {
  res.json({
    firstName: req.body.name,
    company: req.body.company,
  });
};

const updateEmployee = (req, res) => {
  res.json({
    name: req.body.name,
    company: req.body.company,
  });
};

const deleteEmployee = (req, res) => {
  res.json({ id: req.body.id });
};

const getEmployee = (req, res) => {
  res.json({ id: req.params.id });
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
