const { MongoClient } = require('mongodb');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
const client = new MongoClient('mongodb://127.0.0.1');
const db = client.db('app');
const coll = db.collection('places');

app.use(express.json());
app.use(express.static('..'));




// app.get('/get_contact', function (req,res) {
// let respnse={
//   name:req.query.name,
//   mail:req.query.mail,
//   phone:req.query.phone
// };
// console.log(respnse);
// res.end(JSON.stringify(respnse));

// });

// app.listen(3000, function( ) {
//   console.log('Example app listening on port 3000!');
// });


// var express = require('express');
// var app = express();
// var bodyparser = require('body-parser');
// const { json } = require('express');
// var urlencodedParser=bodyparser.urlencoded({extended:false});

//  app.post('/post_contact' , urlencodedParser, function (req,res){
//   let respnse={
//     name:req.body.name,
//      mail:req.body.mail,
//      phone:req.body.phone
//    };
//    console.log(respnse);
//    res.end(json.stringify(respnse));
//  });

//  app.listen(3000, function () {
//    console.log('Example app listening on port 3000!');
//  });


// Get cafes and restaurants
app.get('/api', async (req, res) => {
  // If request has query then use it to filter results
  const filter = {};
  if (req.query.type) {
    filter.type = req.query.type;
  }
  if (req.query.query) {
    filter.$text = { $search: req.query.query };
  }
  // Set sorting
  let sort = { created_at: -1 };
  if (req.query.sort === 'top') {
    sort = { likes: -1 };
  }
  // Set limit
  let limit = 0;
  if (req.query.limit) {
    limit = Number(req.query.limit);
  }
  const cursor = coll.find(filter).sort(sort).limit(limit);
  // Get results and return to user
  const results = await cursor.toArray();
  res.send(results);
});

app.post('/api/rate', async (req, res) => {
  try {
    const placeName = req.body.name;
    const like = req.body.like === true;
    if (like) {
      await coll.updateOne({ name: placeName }, { $inc: { likes: 1 } });
    } else {
      await coll.updateOne({ name: placeName }, { $inc: { likes: -1 } });
    }
  } catch {
    res.send('invalid request');
    return;
  }
  res.send('success');
});

app.post('/api/review', async (req, res) => {
  try {
    const placeName = req.body.name;
    const reviewer = req.body.reviewer;
    const review = req.body.review;
    await coll.updateOne({ name: placeName }, { $push: { reviews: { reviewer, review } } });
  } catch {
    res.send('invalid request');
    return;
  }
  res.send('success');
});

app.post('/api/add', async (req, res) => {
  try {
    const name = req.body.name;
    const type = req.body.type;
    const logo = req.body.logo;
    const img1 = req.body.img1;
    const img2 = req.body.img2;
    await coll.insertOne({
      name,
      type,
      created_at: new Date().toJSON().slice(0, 10),
      likes: 0,
      logo,
      img1,
      img2,
      reviews: []
    });
  } catch {
    res.send('invalid request');
    return;
  }
  res.send('success');
});

app.listen(port, async () => {
  // delete database at start
  try {
    await coll.drop();
  } catch { }
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
