var sql = require("./db.js");
const uuid = require("uuid");
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
const pug = require('pug');
var Essayanswer = function(essayanswer) {
  //this.id = uuid();
  this.name = essayanswer.name;
  //this.created_at = new Date();
  this.article = essayanswer.article;
  this.score = essayanswer.score;
  this.email = essayanswer.email;
  this.question = essayanswer.question;
};

Essayanswer.getOneCategory = ( emailID, result) => {
  sql.query("SELECT * FROM essayanswer WHERE email = " + sql.escape(emailID), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
    } else {
      console.log("tasks : ", res);
      result(null, res);
    }
  });
};

Essayanswer.getAllData = (result) => {
  sql.query("SELECT * FROM essayanswer " , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
    } else {
      console.log("tasks : ", res);
      result(null, res);
    }
  });
};
var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};


Essayanswer.create = function(essayanswer, result) {
  sql.query(
    "INSERT INTO essayanswer SET ?",
    new Essayanswer(essayanswer),
    function(err, res) {
      console.log(essayanswer.article);// 得到学生写的文章
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("res is ", res);
        result(null, "Successfully created articles");
      }
    }
  );
// node mailer begins...
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'adelaideneocs@gmail.com', // generated ethereal user
    pass: '20200220Pr', // generated ethereal password
  },
});

// nodemailer ends.....

readHTMLFile(__dirname +'/emailPug/test.pug', function(err, html) {
  var html = pug.renderFile(__dirname +'/emailPug/test.pug', {
    essayInPug: essayanswer.article,
    nameInPug: essayanswer.name,
    questionInPug: essayanswer.question
  })
  var template = handlebars.compile(html);
  var htmlToSend = template(html);
  var mailOptions = { 
      from: '"阿德马老师" <adelaideneocs@gmail.com>',
      to : `adelaideneocs@gmail.com, ${essayanswer.email}`,
      subject : `${essayanswer.name} 完成的作文`,
      html : htmlToSend
   };
   let info =  transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
          console.log(error);
          callback(error);
      }else{
        console.log(response);
      }
  });
});


};


module.exports = Essayanswer;

