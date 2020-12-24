var sql = require("./db.js");
const uuid = require("uuid");

var Essay = function(essay) {
  this.id = uuid();
  this.text = essay.text;
  this.created_at = new Date();
  this.key = essay.key;
  this.category = essay.category;
};

Essay.getOneCategory = ( categoryID, result) => {
  sql.query("SELECT * FROM essay WHERE category = " + sql.escape(categoryID), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
    } else {
      console.log("tasks : ", res);
      result(null, res);
    }
  });
};

Essay.getAllData = (result) => {
  sql.query("SELECT * FROM essay " , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
    } else {
      console.log("tasks : ", res);
      result(null, res);
    }
  });
};




module.exports = Essay;

