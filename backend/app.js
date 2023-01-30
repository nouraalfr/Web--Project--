const { MongoClient } = require('mongodb');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
const client = new MongoClient('mongodb://127.0.0.1');
const db = client.db('app');

app.get('/', async (req, res) => {
  res.send('Hello!');
});

// Cafes and resturants
app.get(/^\/(cafes|resturants)$/, async (req, res) => {
  // Allow all cross origin
  res.header('Access-Control-Allow-Origin', '*');
  // Get collection name from path
  const collName = req.params[0];
  // Get collection object
  const coll = db.collection(collName);
  // If request has query then use it to filter results
  const filter = {};
  console.log(req.query);
  if (req.query.name) {
    filter.name = req.query.name;
  }
  if (req.query.rating) {
    filter.rating = Number(req.query.rating);
  }
  // Always sort by latest
  const cursor = coll.find(filter).sort({ created_at: -1 });
  // Get results and return to user
  const results = await cursor.toArray();
  res.send(results);
});

app.listen(port, async () => {
  await db.dropDatabase();
  await insertItems('cafes');
  await insertItems('resturants');
  console.log(`Example app listening on port ${port}`);
});

async function insertItems(type) {
  // Return if collection exists
  const collInfo = await db.listCollections({ name: type }).next();
  if (collInfo) return;
  // Read data from file
  const data = JSON.parse(fs.readFileSync('data/' + type + '.json'));
  // Insert data into mongodb
  const coll = db.collection(type);
  coll.insertMany(data);
}
