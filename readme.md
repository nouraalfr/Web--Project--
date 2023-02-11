        Al Imam Muhammad ibn Saud Islamic University                          
          College of Computer and Information System
                       Computer Science Department
                         2nd  Semester 1444 H – 2023 G

In this project, we created Riyadh Places website, Riyadh Places is a blog about Cafes and restaurants, in our blog you can find the top cafes and restaurant also you can find the latest of them, where you can share your reviews about the places and rate them, also, you can add a place too. Our blog is for anyone who’s passionate about food places and like to know what’s new in Riyadh.

2. Look & Feel  
Our blog website chooses light colors and bold fonts to make it easier for users to read and go through the pages. We also choose creating cards to display our places to make it fun and easy to use. Included navigation bar with sidebar that include the pages to make it easier to move through the pages.
References for HTML and CSS: 
Bootstrap: https://getbootstrap.com/ 

1. Flow Chart  


3. Dynamic Components 
File names the include JavaScript:
add.html 
cafes.html 
details.html
restaurants.html
index.html
app.js

4. Business Logic 
Our database structure has one collection ‘places’ and we can filter the data by the type, we have two type cafes and restaurants. The collection has name, type ,date of creation, likes, images , reviews and location.

When the backend first starts we do ‘collection.createIndex({name: ‘text’})’  so we can use ‘$search’ on the name field to make searching easier. Then we read items from a JSON file and do collection.insertMany() to insert the data into Mongo.

The main GET route in the backend is /api which executes collection.find().sort().limit() on the collection ‘places’. It returns all items in the collection filtered by the query ‘query’ which filters the name of the place and the query ‘type’ which filters the type of the place (café, restaurant). Sorting is based on ‘created_at: -1’ (newest to oldest) unless the query ‘sort=top’ is given then we sort by ‘likes: -1’ (most liked to least liked). The ‘limit’ query is used to limit the number of results the SQL query returns and can be used like ‘limit=10’.
The POST route ‘/api/rate’ takes a JSON with the place name and if the it’s a like or dislike and executes collection.updateOne() which updates the place with the provided name and increases the likes by one if ‘like == true’  or decreases by one of ‘like == false’.
The post route ‘/api/review’ also takes a JSON with the name of the place, the name of the author, and the review text. It executes collection.updateOne() and updates the place name by pushing the review to the field ‘reviews’.

The POST route ‘/api/add’ takes a JSON as well with information about a new place that the user wants to add and executes collection.insertOne() adding a new place to the collection.
Returns all items in the collection with the filter, sorting and limit specified in the query.


References
MongoDB documentation
https://www.mongodb.com/docs/drivers/node/current/

Node express documentation 
https://expressjs.com/en/starter/installing.html 
https://expressjs.com/en/guide/routing.html 

Using the Fetch API
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 

async function
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

URL Search Params
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

https://stackoverflow.com/a/10007542 

Reading file with NodeJS
https://nodejs.org/api/fs.html#fsreadfilesyncpath-options

Bootstrap for style
https://getbootstrap.com/ 

