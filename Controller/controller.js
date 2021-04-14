const mongoose = require("mongoose");
const Company = require("../models/Company");
const Employee = require("../models/Employee");
const config = require("../config");

mongoose.connect(config.databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.createCompany = function (name, hours) {
  return Company.create({
    name,
    hours,
  });
};

exports.getCompany = function (companyId) {
  return Company.findById(companyId).exec();
};

exports.getCompanies = function () {
  return Company.find().populate("employees").exec();
};

exports.createEmployee = function (title, name, wage) {
  return Employee.create({
    title,
    name,
    wage,
  });
};

exports.getEmployees = function () {
  return Employee.find().populate("company").exec();
};

exports.getEmployee = function (employeeId) {
  return Employee.findById(employeeId).exec();
};

exports.connectEmployeeToCompany = function (company, employee) {
  company.employees.push(employee);
  employee.company = company;
  return Promise.all([company.save(), employee.save()]);
};
