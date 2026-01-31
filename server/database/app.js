/*jshint esversion: 8 */
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3030;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// -------------------- MongoDB --------------------
mongoose.connect("mongodb://mongo:27017/", {
  dbName: "dealershipsDB"
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB error:", err));

// -------------------- Models --------------------
const Reviews = require('./review');
const Dealerships = require('./dealership');
const Cars = require('./inventory');

// -------------------- Seed Data --------------------
const reviews_data = JSON.parse(fs.readFileSync("./data/reviews.json", "utf8"));
const dealerships_data = JSON.parse(fs.readFileSync("./data/dealerships.json", "utf8"));
const cars_data = JSON.parse(fs.readFileSync("./data/car_records.json", "utf8"));

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

db.once("open", async () => {
  console.log("✅ MongoDB connected, seeding data...");

  try {
    await Reviews.deleteMany({});
    await Reviews.insertMany(reviews_data.reviews);

    await Dealerships.deleteMany({});
    await Dealerships.insertMany(dealerships_data.dealerships);

    await Cars.deleteMany({});
    await Cars.insertMany(cars_data.cars);

    console.log("✅ Seed data inserted successfully");
  } catch (err) {
    console.error("❌ Seed error:", err);
  }
});

// -------------------- Routes --------------------

// Home
app.get('/', (req, res) => {
  res.send("Welcome to the Mongoose API");
});

// -------- Reviews --------
app.get('/fetchReviews', async (req, res) => {
  try {
    const docs = await Reviews.find();
    res.json(docs);
  } catch {
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const docs = await Reviews.find({ dealership: req.params.id });
    res.json(docs);
  } catch {
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

// -------- Dealerships --------
app.get('/fetchDealers', async (req, res) => {
  try {
    const docs = await Dealerships.find();
    res.json(docs);
  } catch {
    res.status(500).json({ error: "Error fetching dealers" });
  }
});

app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const docs = await Dealerships.find({ state: req.params.state });
    res.json(docs);
  } catch {
    res.status(500).json({ error: "Error fetching dealers" });
  }
});

app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const docs = await Dealerships.find({ id: req.params.id });
    res.json(docs);
  } catch {
    res.status(500).json({ error: "Error fetching dealer" });
  }
});

// -------- Insert Review --------
app.post('/insert_review', async (req, res) => {
  try {
    const lastReview = await Reviews.findOne().sort({ id: -1 });
    const new_id = lastReview ? lastReview.id + 1 : 1;

    const review = new Reviews({
      id: new_id,
      ...req.body
    });

    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error inserting review" });
  }
});

// -------- Inventory (MERGED) --------
app.get('/cars/:id', async (req, res) => {
  res.json(await Cars.find({ dealer_id: req.params.id }));
});

app.get('/carsbymake/:id/:make', async (req, res) => {
  res.json(await Cars.find({ dealer_id: req.params.id, make: req.params.make }));
});

app.get('/carsbymodel/:id/:model', async (req, res) => {
  res.json(await Cars.find({ dealer_id: req.params.id, model: req.params.model }));
});

app.get('/carsbymaxmileage/:id/:mileage', async (req, res) => {
  const m = parseInt(req.params.mileage);
  let condition = m === 50000 ? { $lte: 50000 }
    : m === 100000 ? { $gt: 50000, $lte: 100000 }
    : m === 150000 ? { $gt: 100000, $lte: 150000 }
    : m === 200000 ? { $gt: 150000, $lte: 200000 }
    : { $gt: 200000 };

  res.json(await Cars.find({ dealer_id: req.params.id, mileage: condition }));
});

app.get('/carsbyprice/:id/:price', async (req, res) => {
  const p = parseInt(req.params.price);
  let condition = p === 20000 ? { $lte: 20000 }
    : p === 40000 ? { $gt: 20000, $lte: 40000 }
    : p === 60000 ? { $gt: 40000, $lte: 60000 }
    : p === 80000 ? { $gt: 60000, $lte: 80000 }
    : { $gt: 80000 };

  res.json(await Cars.find({ dealer_id: req.params.id, price: condition }));
});

app.get('/carsbyyear/:id/:year', async (req, res) => {
  res.json(
    await Cars.find({
      dealer_id: req.params.id,
      year: { $gte: parseInt(req.params.year) }
    })
  );
});

// -------------------- Start Server --------------------
app.listen(port, () => {
  console.log(`🚀 Unified API running on http://localhost:${port}`);
});


/*jshint esversion: 8 */
/*const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const  cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

const reviews_data = JSON.parse(fs.readFileSync("reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("dealerships.json", 'utf8'));

mongoose.connect("mongodb://mongo_db:27017/",{'dbName':'dealershipsDB'});


const Reviews = require('./review');

const Dealerships = require('./dealership');

try {
  Reviews.deleteMany({}).then(()=>{
    Reviews.insertMany(reviews_data['reviews']);
  });
  Dealerships.deleteMany({}).then(()=>{
    Dealerships.insertMany(dealerships_data['dealerships']);
  });
  
} catch (error) {
  res.status(500).json({ error: 'Error fetching documents' });
}


// Express route to home
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API");
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({dealership: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  //Write your code here
  try {
    const documents = await Dealerships.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
  //Write your code here
  try {
    const documents = await Dealerships.find({state: req.params.state});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
  //Write your code here
  try {
    const documents = await Dealerships.find({id: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});
*/

//Express route to insert review
//app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
/*
  data = JSON.parse(req.body);
  const documents = await Reviews.find().sort( { id: -1 } );
  let new_id = documents[0]['id']+1;

  const review = new Reviews({
		"id": new_id,
		"name": data['name'],
		"dealership": data['dealership'],
		"review": data['review'],
		"purchase": data['purchase'],
		"purchase_date": data['purchase_date'],
		"car_make": data['car_make'],
		"car_model": data['car_model'],
		"car_year": data['car_year'],
	});

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
		console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/
