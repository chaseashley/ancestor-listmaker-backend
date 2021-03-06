const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ancestor-listmake backend application." });
});

// set port, listen for requests
require("./app/routes/location.routes.js")(app);
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});