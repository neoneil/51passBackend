var sql = require("./db.js");
const uuid = require("uuid");

// User object constructor
var Wfd = function(wfd) {
  this.id = uuid();
  this.text = wfd.text;
  this.num = wfd.num;
  this.created_at = new Date();
  this.trans = wfd.trans;
  this.wordsCount = wfd.wordsCount;
};

Wfd.getAll = function(result) {
  sql.query("SELECT * FROM WFD", function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      //console.log("tasks : ", res);
      result(null, res);
    }
  });
};

module.exports = Wfd;

