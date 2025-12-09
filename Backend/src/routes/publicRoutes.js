
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Client = require('../models/Client');
const Contact = require('../models/Contact');
const Subscription = require('../models/Subscription');

// GET projects
router.get('/projects', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

// GET clients
router.get('/clients', async (req, res) => {
  const clients = await Client.find().sort({ createdAt: -1 });
  res.json(clients);
});

// POST contact form
router.post('/contacts', async (req, res) => {
  try {
    const { fullName, email, mobile, city, message } = req.body;
    const c = await Contact.create({ fullName, email, mobile, city, message });
    res.json(c);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const s = await Subscription.create({ email });
    res.json(s);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;