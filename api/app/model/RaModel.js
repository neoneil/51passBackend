var sql = require("./db.js");
const uuid = require("uuid");

var Ra = function(ra) {
  this.id = uuid();
  this.text = ra.text;
  this.title = ra.title;
  this.created_at = new Date();
  this.key = ra.key;
  this.diff = ra.diff;
};

Ra.getAll = function(result) {
  sql.query("SELECT * FROM ra order by diff", function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      //console.log("tasks : ", res);
      result(null, res);
    }
  });
};

module.exports = Ra;

