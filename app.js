let express = require("express");
let path = require("path");
let app = express();

const Products = {
  123: ["Orange", 79.9],
  124: ["Apple", 50.99],
  125: ["Carrot", 40.9],
  126: ["Lemon", 30.99],
  127: ["Mango", 22.99],
  128: ["Tomato", 50.9],
  129: ["Cucumber", 11],
  133: ["Onions", 55.9],
  134: ["Eggs", 100.99],
  135: ["Chicken", 33.0],
};

//configure app to serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
app.get("/", (req, res, _) => {
  req.sendFile("index.html");
});

app.get("/products/:id", (req, res, _) => {
  res.json(Products[req.params.id]);
});
