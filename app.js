let express = require("express");
let path = require("path");
let app = express();

const Products = {
  123: { name: "Orange", price: 79.9 },
  124: { name: "Apple", price: 50.99 },
  125: { name: "Carrot", price: 40.9 },
  126: { name: "Lemon", price: 30.99 },
  127: { name: "Mango", price: 22.99 },
  128: { name: "Tomato", price: 50.9 },
  129: { name: "Cucumber", price: 11 },
  133: { name: "Onions", price: 55.9 },
  134: { name: "Eggs", price: 100.99 },
  135: { name: "Chicken", price: 33.0 },
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
