

module.exports = function(app) {
  let wfd = require('../controller/appController');
  let ra = require('../controller/appController');
  let di = require('../controller/appController');
  let essay = require('../controller/appController');
  let swt = require('../controller/appController');
  let essayanswer = require('../controller/appController');
  let audioanswer = require('../controller/appController');
  let user = require('../controller/appController');
  var jwt = require("jsonwebtoken");
  function verifyToken(req, res, next)
  {
    console.log('verify token...');
    //console.log(req);
    if(!req.headers.authorization)
    {
      return res.status(401).send('unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
      return res.status(401).send('unauthorized request');
    }
    let payload = jwt.verify(token, 'secret');
    if(!payload){
      return res.status(401).send('unauthorized request');
    }
    req.userId = payload.subject;
    console.log('token authorized!!!');
    //console.log(req.body);
    next();
  }


  app.route('/register')
  .get(user.getUsers)
  .post(user.createUser);

  app.route('/login')
  .post(user.loginUser);


  
  // app.route('/wfd', verifyToken)
  // .get(wfd.getWfds)
  app.get('/wfd', verifyToken, wfd.getWfds)
  app.get('/rs', wfd.getRss)
  // app.route('/ra')
  // .get(ra.getRas)
  app.get('/ra', verifyToken, ra.getRas)
  app.get('/swt',  swt.getSwts)
  app.route('/di')
  .get(di.getDisAll)
  
  app.route('/di/:category')
  .get(di.getOneDis)

  app.route('/essay')
  .get(essay.getEassyAll)
  
  app.route('/essay/:category')
  .get(essay.getOneCategoryEssay)

  app.route('/essayanswer')
  .get(essayanswer.getEassyanswerAll)
  .post(essayanswer.createEssayanswer)
  
  app.route('/essayanswer/:name')
  .get(essayanswer.getOneCategoryEssayanswer)

  app.route('/dianswer')
  .get(audioanswer.getAudioanswerAllDi)
  //.post(essayanswer.createEssayanswer) // server.js 实现此功能
  
  app.route('/dianswer/:name')
  .get(audioanswer.getOneCategoryAudioanswerDi)

  app.route('/raanswer')
  .get(audioanswer.getAudioanswerAllRa)
  //.post(essayanswer.createEssayanswer) // server.js 实现此功能
  
  app.route('/raanswer/:name')
  .get(audioanswer.getOneCategoryAudioanswerRa)




}