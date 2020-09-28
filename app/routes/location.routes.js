module.exports = app => {
    const locations = require("../controllers/location.controller.js");
  
    // Create a new Customer
    app.post("/locations", locations.create);
  
    // Retrieve a single Customer with customerId
    app.get("/locations", locations.findOne);
  
    // Update a Customer with customerId
    app.put("/locations", locations.update);
  
};