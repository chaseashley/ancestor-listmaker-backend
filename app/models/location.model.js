const sql = require("./db.js");

// constructor
const Location = function(location) {
    this.locationName = location.locationName,
    this.coordinates = location.coordinates
};

Location.create = (newLocation, result) => {
    sql.query("INSERT INTO locations SET ?", newLocation, (err, res) => {
        if (err) {
            console.log("error at location.model.js Location.create: ", err);
            result(err, null);
            return;
        }

    result(null, { locationName: res.insertLocation, ...newLocation });
  });
};

Location.findByLocationName = (locationName, result) => {
    sql.query("SELECT * FROM locations WHERE locationName = ?", locationName, (err, res) => {
        if (err) {
            console.log("error at location.model.js Location.findByLocationName: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found locationName: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Location with the location
        result({ kind: "not_found" }, null);
    });
};

Location.updateByLocationName = (location, result) => {
    sql.query(
        "UPDATE locations SET coordinates = ? WHERE locationName = ?",
        [location.coordinates, location.locationName],
        (err, res) => {
        if (err) {
            console.log("error at location.model.js Location.updateByLocationName: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Location with the locationName
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated location: ", { locationName: location.locationName, ...location });
        result(null, { locationName: location.locationName, ...location });
    }
  );
};

module.exports = Location;