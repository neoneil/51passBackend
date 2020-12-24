var sql = require("./db.js");
var Audioanswer = function(audioanswer) {
  this.audio = audioanswer.audio;
  this.name = audioanswer.name;
  this.email = audioanswer.email;
  this.time = audioanswer.time;
};

Audioanswer.getOneCategoryDi = ( emailID, result) => {
  sql.query("SELECT * FROM dianswer WHERE email = " + sql.escape(emailID), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
    } else {
      console.log("tasks : ", res);
      result(null, res);
    }
  });
};

Audioanswer.getAllDataDi = (result) => {
  sql.query("SELECT * FROM dianswer " , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
    } else {
      console.log("tasks : ", res);
      result(null, res);
    }
  });
};




Audioanswer.getOneCategoryRa = ( emailID, result) => {
  sql.query("SELECT * FROM raanswer WHERE email = " + sql.escape(emailID), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
    } else {
      console.log("tasks : ", res);
      result(null, res);
    }
  });
};

Audioanswer.getAllDataRa = (result) => {
  sql.query("SELECT * FROM raanswer " , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
    } else {
      console.log("tasks : ", res);
      result(null, res);
    }
  });
};
// Audioanswer.create = function(audioanswer, result) {
//   sql.query(
//     "INSERT INTO dianswer SET ?",
//     new Audioanswer(audioanswer),
//     function(err, res) {

//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//       } else {
//         console.log("res is ", res);
//         result(null, "Successfully created audio");
//       }
//     }
//   );

// };


module.exports = Audioanswer;

