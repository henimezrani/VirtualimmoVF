const Visit = require("../models/visit");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  getAll: function (req, res) {
    Visit.find()
      .populate("customer agent")
      .then((visits) => {
        res.send(visits);
      });
  },

  getOne: function (req, res) {
    Visit.find({ _id: req.params.id })
      .populate("customer agent")
      .then((visit) => {
        res.send(visit);
      });
  },

  create: function (req, res) {
    Visit.create(req.body).then((visit) => {
      res.send(visit);
    });
  },

  updateOne: function (req, res) {
    Visit.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    }).then((visit) => {
      res.send(visit);
    });
  },

  deleteOne: function (req, res) {
    Visit.findOneAndRemove({ _id: req.params.id }).then((visit) => {
      res.send(visit);
    });
  },
};
