const fs = require('fs');

// Load JSON file
const data = require('./car_records.json');

// Access cars array
const updatedCars = data.cars.map(car => ({
  ...car,
  price: Math.floor(Math.random() * (40000 - 8000 + 1)) + 8000
}));

// Write back to file
fs.writeFileSync(
  'car_records.json',
  JSON.stringify({ cars: updatedCars }, null, 2)
);

console.log('✅ Price added to all car records');
