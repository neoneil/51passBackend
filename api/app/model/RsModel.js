var sql = require("./db.js");
const uuid = require("uuid");

// User object constructor
var Rs = function(rs) {
  this.id = uuid();
  this.text = rs.text;
  this.num = rs.num;
  this.trans = rs.trans;
  this.wordsCount = rs.wordsCount;
};

Rs.getAll = function(result) {
  sql.query("SELECT * FROM rs", function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      //console.log("tasks : ", res);
      result(null, res);
    }
  });
};

module.exports = Rs;

