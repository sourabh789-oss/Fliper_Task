const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const Project = require('../models/Project');
const Client = require('../models/Client');
const Contact = require('../models/Contact');
const Subscription = require('../models/Subscription');

// multer temp storage
const upload = multer({ dest: 'src/uploads/' });

// Admin: create project (multipart/form-data: title, description, link, image)
router.post('/projects', upload.single('image'), async (req, res) => {
  try {
    const { title, description, link } = req.body;
    let imageUrl = null;

    if (req.file) {
      const inPath = req.file.path;
      const outName = `project_${Date.now()}.jpg`;
      const outPath = path.join(__dirname, '..', 'uploads', outName);

      await sharp(inPath).resize(800, 600, { fit: 'cover' }).toFile(outPath);
      fs.unlinkSync(inPath);
      imageUrl = `/uploads/${outName}`;
    }

    const project = await Project.create({ title, description, link, imageUrl });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Admin: create client (name, designation, description, image)
router.post('/clients', upload.single('image'), async (req, res) => {
  try {
    const { name, designation, description } = req.body;
    let imageUrl = null;
    if (req.file) {
      const inPath = req.file.path;
      const outName = `client_${Date.now()}.jpg`;
      const outPath = path.join(__dirname, '..', 'uploads', outName);
      await sharp(inPath).resize(450, 350, { fit: 'cover' }).toFile(outPath);
      fs.unlinkSync(inPath);
      imageUrl = `/uploads/${outName}`;
    }
    const client = await Client.create({ name, designation, description, imageUrl });
    res.json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Admin: view contacts
router.get('/contacts', async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// Admin: view subscriptions
router.get('/subscriptions', async (req, res) => {
  const subs = await Subscription.find().sort({ createdAt: -1 });
  res.json(subs);
});

module.exports = router;