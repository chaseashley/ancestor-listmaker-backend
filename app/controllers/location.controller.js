const Location = require("../models/location.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const location = new Location({
      locationName: req.body.locationName,
      coordinates: req.body.coordinates
    });
  
    // Save Customer in the database
    Location.create(location, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Location."
        });
      else res.send(data);
    });
};

exports.findOne = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

    Location.findByLocationName(req.body.locationName, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Location with locationName ${req.params.locationName}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving Location with locationName " + req.params.locationName
            });
        }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
    // Create a Customer
    const location = new Location({
        locationName: req.body.locationName,
        coordinates: req.body.coordinates
    });
  
    Location.updateByLocationName(location, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Location with locationName ${location.locationName}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Location with locationName " + location.locationName
            });
          }
        } else res.send(data);
      }
    );
};