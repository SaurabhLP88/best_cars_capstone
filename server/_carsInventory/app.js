/* jshint esversion: 8 */

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3050;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Load car records
const carsData = JSON.parse(
  fs.readFileSync('./data/car_records.json', 'utf8')
);

// MongoDB connection (Docker container name: mongo_db)
mongoose.connect('mongodb://mongo_db:27017/', {
  dbName: 'dealershipsDB'
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Import Mongoose model
const Cars = require('./inventory');

// Insert data into MongoDB
(async () => {
  try {
    await Cars.deleteMany({});
    await Cars.insertMany(carsData.cars);
    console.log('✅ Car records inserted');
  } catch (error) {
    console.error('❌ Error inserting records:', error);
  }
})();

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Mongoose API');
});

// 1️⃣ Cars by dealer ID
app.get('/cars/:id', async (req, res) => {
  try {
    const docs = await Cars.find({ dealer_id: req.params.id });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cars' });
  }
});

// 2️⃣ Cars by dealer + make
app.get('/carsbymake/:id/:make', async (req, res) => {
  try {
    const docs = await Cars.find({
      dealer_id: req.params.id,
      make: req.params.make
    });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cars by make' });
  }
});

// 3️⃣ Cars by dealer + model
app.get('/carsbymodel/:id/:model', async (req, res) => {
  try {
    const docs = await Cars.find({
      dealer_id: req.params.id,
      model: req.params.model
    });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cars by model' });
  }
});

// 4️⃣ Cars by max mileage
app.get('/carsbymaxmileage/:id/:mileage', async (req, res) => {
  try {
    const mileage = parseInt(req.params.mileage);
    let condition = {};

    if (mileage === 50000) condition = { $lte: 50000 };
    else if (mileage === 100000) condition = { $gt: 50000, $lte: 100000 };
    else if (mileage === 150000) condition = { $gt: 100000, $lte: 150000 };
    else if (mileage === 200000) condition = { $gt: 150000, $lte: 200000 };
    else condition = { $gt: 200000 };

    const docs = await Cars.find({
      dealer_id: req.params.id,
      mileage: condition
    });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cars by mileage' });
  }
});

// 5️⃣ Cars by price
app.get('/carsbyprice/:id/:price', async (req, res) => {
  try {
    const price = parseInt(req.params.price);
    let condition = {};

    if (price === 20000) condition = { $lte: 20000 };
    else if (price === 40000) condition = { $gt: 20000, $lte: 40000 };
    else if (price === 60000) condition = { $gt: 40000, $lte: 60000 };
    else if (price === 80000) condition = { $gt: 60000, $lte: 80000 };
    else condition = { $gt: 80000 };

    const docs = await Cars.find({
      dealer_id: req.params.id,
      price: condition
    });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cars by price' });
  }
});

// 6️⃣ Cars by minimum year
app.get('/carsbyyear/:id/:year', async (req, res) => {
  try {
    const docs = await Cars.find({
      dealer_id: req.params.id,
      year: { $gte: parseInt(req.params.year) }
    });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cars by year' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
