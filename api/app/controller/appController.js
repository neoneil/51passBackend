
var Wfd = require("../model/WfdModel");
var Ra = require("../model/RaModel");
var Rs = require("../model/RsModel");
var Swt = require("../model/SwtModel");
var Di = require("../model/DiModel");
var Essay = require("../model/EssayModel");
var Essayanswer = require("../model/EssayAnswerModel");
var Audioanswer = require("../model/AudioModel");
var User = require("../model/UserModel");
var jwt = require("jsonwebtoken");
exports.getUsers = function(req, res) {
  User.getAll(function(err, users) {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(users);
    }
  });
};

exports.createUser = function(req, res) {
  const user = new User(req.body);
  if (!user) {
    res.status(400).send({ error: true, message: "Please provide user" });
  } else {
    
    User.create(user, function(err, user){
      if(err) {
        res.send(err);
      } else {
        res.json(user);
        //res.status(200).send(user);
      }
    }); 
  }
};

exports.loginUser = function (req, res){
  const user = new User(req.body);
  if (!user) {
    res.status(401).send({ error: true, message: "invalid user" });
  } else {
    User.login(user, function(err, user){
      if(err) {
        res.send(err);
      } else {
        res.json(user);
      }
    }); 
  }
};


exports.getWfds = function(req, res) {
  Wfd.getAll(function(err, wfds) {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(wfds);
    }
  });
};
exports.getRas = function(req, res) {
  Ra.getAll(function(err, ras) {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(ras);
    }
  });
};
exports.getRss = function(req, res) {
  Rs.getAll(function(err, rss) {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(rss);
    }
  });
};
exports.getSwts = function(req, res) {
  Swt.getAll(function(err, swt) {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(swt);
    }
  });
};
exports.getOneDis = (req, res) => {
  // console.log("req " + req.params.category);
  Di.getOneCategory(req.params.category, (err, dis) => {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      //console.log("dis: " + dis);
      res.json(dis);
    }
  });
};

exports.getDisAll = (req, res) => {
  // console.log("req " + req.params.category);
  Di.getAllData((err, dis) => {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      //console.log("dis: " + dis);
      res.json(dis);
    }
  });
};

exports.getOneCategoryEssay = (req, res) => {
  // console.log("req " + req.params.category);
  Essay.getOneCategory(req.params.category, (err, essay) => {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(essay);
    }
  });
};

exports.getEassyAll = (req, res) => {
  Essay.getAllData((err, essay) => {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(essay);
    }
  });
};
// get essay answers begins ...... 
exports.getOneCategoryEssayanswer = (req, res) => {
  // console.log("req " + req.params.category);
  Essayanswer.getOneCategory(req.params.name, (err, essay) => {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(essay);
    }
  });
};

exports.getEassyanswerAll = (req, res) => {
  Essayanswer.getAllData((err, essay) => {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(essay);
    }
  });
};


exports.createEssayanswer = function(req, res) {
  const essayanswer = new Essayanswer(req.body);
  //console.log(essayanswer);
  if (!essayanswer) {
    res.status(400).send({ error: true, message: "Please provide article" });
  } else {
    //console.log(essayanswer);
    Essayanswer.create(essayanswer, function(err, essayanswer){
      
      if(err) {
        res.send(err);
      } else {
     
        res.json(essayanswer);
      }
    }); 
  }
};
// get essay answers ends here ........

exports.getOneCategoryAudioanswerDi = (req, res) => {
  // console.log("req " + req.params.category);
  Audioanswer.getOneCategoryDi(req.params.name, (err, essay) => {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(essay);
    }
  });
};

exports.getAudioanswerAllDi = (req, res) => {
  Audioanswer.getAllDataDi((err, essay) => {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(essay);
    }
  });
};





exports.getOneCategoryAudioanswerRa = (req, res) => {
  // console.log("req " + req.params.category);
  Audioanswer.getOneCategoryRa(req.params.name, (err, essay) => {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(essay);
    }
  });
};

exports.getAudioanswerAllRa = (req, res) => {
  Audioanswer.getAllDataRa((err, essay) => {
    if (err) {
      console.log("error is ", err);
      res.send(err);
    } else {
      res.json(essay);
    }
  });
};

// exports.createAudioanswer = function(req, res) {
//   const essayanswer = new Essayanswer(req.body);
//   //console.log(essayanswer);
//   if (!essayanswer) {
//     res.status(400).send({ error: true, message: "Please provide article" });
//   } else {
//     //console.log(essayanswer);
//     Essayanswer.create(essayanswer, function(err, essayanswer){
      
//       if(err) {
//         res.send(err);
//       } else {
     
//         res.json(essayanswer);
//       }
//     }); 
//   }
// };