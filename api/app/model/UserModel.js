var sql = require("./db.js");
const uuid = require("uuid");
var jwt = require("jsonwebtoken");
var User = function(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
  };

  User.getAll = function(result) {
    sql.query("SELECT * FROM users", function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("tasks : ", res);
        result(null, res);
      }
    });
  };
  
  
  User.create = function(user, result) {
    sql.query(
      "INSERT INTO users SET ?",
      new User(user),
      function(err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          // console.log("res is ", res);
          // console.log("user is ", user);
          // let payload = { subject: user.id}
          // let token = jwt.sign(payload, 'secret')
          // result(null, {token});

          let token = jwt.sign({ user }, 'secret',{ expiresIn: '10h' })
          var decoded = jwt.decode(token, {complete: true});
          console.log(decoded.payload);
          result(null, {token}); // 注册成功



        }
      }
    );
  };

  User.login = function(user, result) {
    sql.query(
      "SELECT * FROM users WHERE email = ?", [user.email],
      function(err, res) {
        if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      if(res.length === 0)
      {
        console.log("no person");
        result(err, 'noPerson');
      }
      else{
          console.log(res);
          if(user.email === res[0].email && user.password === res[0].password && res.length !==0)
          {
            console.log(user.email);
            console.log(res[0].email);
                console.log("true");
                let payload = { subject: user.id}
                let token = jwt.sign({ res }, 'secret',{ expiresIn: '10h' })
                var decoded = jwt.decode(token, {complete: true});
                console.log(decoded.payload);
                result(null, {token}); // 登录成功
          }else {
            console.log(user.email);
            console.log(res[0].email);
            console.log("false");
            result(err,'wrongPassword'); // 密码错误
            
          }
    
      }
      }
    );
  };
  module.exports = User;