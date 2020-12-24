const express = require('express');
const app = express();
var sql = require("./app/model/db");
//const ffmpeg = require('ffmpeg');
var AudioModel = function(audioModel) {
  //this.id = uuid();
  this.audio = audioModel.file;
  this.name = audioModel.body.name;
  this.email = audioModel.body.email;
  this.time = new Date();
  this.url = audioModel.body.url
};
// model ends...
var FileReader = require('filereader')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
var multer  = require('multer');
const path = require('path');
app.listen(port);
console.log("app is listening on port: " + port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

// 上传图片
const PATHdi = 'app/diUpload';
let storagedi = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATHdi);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
let uploaddi = multer({
  storage: storagedi
}); 

const PATHra = 'app/raUpload';
let storagera = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATHra);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
let uploadra = multer({
  storage: storagera
});

const PATHrl = 'app/diUpload';
let storagerl = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATHrl);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
let uploadrl = multer({
  storage: storagerl
});

const PATHrs = 'app/diUpload';
let storagers = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATHrs);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
let uploadrs = multer({
  storage: storagers
}); 

//得到 答案 
app.use(express.static('app'));
 
app.get('/app/diUpload/*', function (req, res) {
    res.sendFile( __dirname + "/" + req.url );
    console.log("Request for " + req.url + " received.");
    
})
app.get('/app/assets/DI_images/*', function (req, res) {
  res.sendFile( __dirname + "/" + req.url );
  console.log("Request for " + req.url + " received.");
})
app.get('/upload', function (req, res) {
  res.end('File catcher');
}); 

app.get('/app/raUpload/*', function (req, res) {
  res.sendFile( __dirname + "/" + req.url );
  console.log(" RA Request for " + req.url + " received.");
  
})
app.get('/app/rlUpload/*', function (req, res) { 
  res.sendFile( __dirname + "/" + req.url );
  console.log("Request for " + req.url + " received.");
  
})
app.get('/app/rsUpload/*', function (req, res) {
  res.sendFile( __dirname + "/" + req.url );
  console.log("Request for " + req.url + " received.");
  
})


// POST di
app.post('/upload/di', uploaddi.single('soundBlob'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    console.log(req.name);
    console.log(req.audio);
    return res.send({
      success: false
    });
  } else {
    console.log('File is available!', req.file);
    console.log(req.body.name,req.file.filename);

    sql.query(
      "INSERT INTO dianswer SET ?",
      new AudioModel(req),
      function(err, res) {

        if (err) {
          console.log("error: ", err);
        } else {
          console.log("res is ", res);
        }
      }
    );

    return res.send({
      success: true
    })
  }
  
});
// post ra
app.post('/upload/ra', uploadra.single('soundBlob'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    console.log(req.name);
    console.log(req.audio);
    return res.send({
      success: false
    });
  } else {
    console.log('File is available!', req.file);
    console.log(req.body.name,req.file.filename);

    sql.query(
      "INSERT INTO raanswer SET ?",
      new AudioModel(req),
      function(err, res) {

        if (err) {
          console.log("error: ", err);
        } else {
          console.log("res is ", res);
        }
      }
    );

    return res.send({
      success: true
    })
  }
  
});
// post rl
app.post('/upload/rl', uploadrl.single('soundBlob'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    console.log(req.name);
    console.log(req.audio);
    return res.send({
      success: false
    });
  } else {
    console.log('File is available!', req.file);
    console.log(req.body.name,req.file.filename);

    sql.query(
      "INSERT INTO rlanswer SET ?",
      new AudioModel(req),
      function(err, res) {

        if (err) {
          console.log("error: ", err);
        } else {
          console.log("res is ", res);
        }
      }
    );

    return res.send({
      success: true
    })
  }
  
});
// post rs
app.post('/upload/rs', uploadrs.single('soundBlob'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    console.log(req.name);
    console.log(req.audio);
    return res.send({
      success: false
    });
  } else {
    console.log('File is available!', req.file);
    console.log(req.body.name,req.file.filename);

    sql.query(
      "INSERT INTO rsanswer SET ?",
      new AudioModel(req),
      function(err, res) {

        if (err) {
          console.log("error: ", err);
        } else {
          console.log("res is ", res);
        }
      }
    );

    return res.send({
      success: true
    })
  }
  
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });


var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route


// const fs = require('fs')

// const dir = __dirname;
// const files = fs.readdirSync(dir)

// for (const file of files) {
//   console.log(file)
// }