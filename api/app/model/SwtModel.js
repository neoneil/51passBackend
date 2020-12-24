var sql = require("./db.js");
const uuid = require("uuid");

// User object constructor
var Swt = function(swt) {
  this.id = uuid();
  this.title = swt.title;
  this.num = swt.num;
  this.text = swt.text;
};

Swt.getAll = function(result) {
  sql.query("SELECT * FROM swt", function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      //console.log("tasks : ", res);
      result(null, res);
    }
  });
};

module.exports = Swt;

