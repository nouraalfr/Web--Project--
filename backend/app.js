const { MongoClient } = require('mongodb');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
const client = new MongoClient('mongodb://127.0.0.1');
const db = client.db('app');
const coll = db.collection('places');

// Get cafes and restaurants
app.get('/', async (req, res) => {
  // Allow all cross origin
  res.header('Access-Control-Allow-Origin', '*');
  // If request has query then use it to filter results
  const filter = {};
  if (req.query.type) {
    filter.type = req.query.type;
  }
  if (req.query.query) {
    filter.$text = { $search: req.query.query };
  }
  if (req.query.rating) {
    filter.rating = Number(req.query.rating);
  }
  // Set limit
  let limit = 0;
  if (req.query.limit) {
    limit = Number(req.query.limit);
  }
  // Always sort by latest
  const cursor = coll.find(filter).sort({ created_at: -1 }).limit(limit);
  // Get results and return to user
  const results = await cursor.toArray();
  res.send(results);
});

app.listen(port, async () => {
  // delete database at start
  //await coll.drop();
  // create index for name field so we can search
  await coll.createIndex({ name: 'text' });
  await insertItems();
  console.log(`Backend listening on port ${port}`);
});

async function insertItems() {
  // Read data from file
  const data = JSON.parse(fs.readFileSync('data.json'));
  // Insert data into mongodb
  await coll.insertMany(data);
}
