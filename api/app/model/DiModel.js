var sql = require("./db.js");
const uuid = require("uuid");

var Di = function(di) {
  this.id = uuid();
  this.text = di.text;
  this.freq = di.freq;
  this.created_at = new Date();
  this.category = di.category;
  this.num = di.num;
  this.url = di.url;
};

Di.getOneCategory = ( categoryID, result) => {
  sql.query("SELECT * FROM DI WHERE category = " + sql.escape(categoryID), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
    } else {
      console.log("tasks : ", res);
      result(null, res);
    }
  });
};

Di.getAllData = (result) => {
  sql.query("SELECT * FROM DI ORDER BY RAND() " , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
    } else {
      console.log("tasks : ", res);
      result(null, res);
    }
  });
};

module.exports = Di;

