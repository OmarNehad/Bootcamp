let express = require("express");
let app = express();
let path = require("path");
var bodyParser = require("body-parser");

const fs = require("fs");
let rawdata = fs.readFileSync("./db/Products.json");
let Products = JSON.parse(rawdata);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

app.post("/order", (req, res) => {
  fs.writeFileSync("./db/Orders.json", JSON.stringify(req.body.order));
});
