const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  getAll: function (req, res) {
    User.find().then((users) => {
      res.send(users);
    });
  },

  getOne: function (req, res) {
    User.find({ _id: req.params.id }).then((user) => {
      res.send(user);
    });
  },

  create: function (req, res) {
    User.create(req.body).then((user) => {
      res.send(user);
    });
  },

  updateOne: function (req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
      (user) => {
        res.send(user);
      }
    );
  },

  deleteOne: function (req, res) {
    User.findOneAndRemove({ _id: req.params.id }).then((user) => {
      res.send(user);
    });
  },

  login: async function (req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    // const hashed = await bcrypt.hash(req.body.password, 10);
    const boo = await bcrypt.compare(req.body.password, user.password);
    if (!boo) {
      res.status(403).json({ error: "Wrong Password" });
      return;
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      user,
      token,
    });
  },

  register: async function (req, res) {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      res.status(404).json({ error: "User already exists, please login" });
      return;
    }
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashed });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      user,
      token,
    });
  },

  verify: async function (req, res) {
    const token = req.body.token;
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id });
    res.send(user);
  },
};
