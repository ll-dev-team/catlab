var express = require('express');
var router = express.Router();
var slackOutput = require('../data/slackOutput');
var cp = require ('child_process');

router.get('/', function(req, res, next) {
  var replies = [];
  for (var i = 0; i < slackOutput.messages.length; i++) {
    console.log(slackOutput.messages[i].user);
    if (slackOutput.messages[i].parent_user_id) {
      console.log("this message has a parent user id and it is " + slackOutput.messages[i].parent_user_id);
      replies.push(slackOutput.messages[i]);
    }
  }
  res.render('tools', { title: "Tool Page", slack: replies });
  // console.log(slackOutput);
});

router.post('/io2s', function(req, res, next){

  console.log(req.body);
  console.log(process.env.SLACK_WEBHOOK_URL);
  // var thePayload = 'payload={"channel": "#ll-tests", "username": "theworkflow-bot", "text": "<@marlon>: just transcoded ' + path.basename(sourcePath) + ' and put it here: ' + destinationPath + ' .", "icon_emoji": ":desktop_computer:"}';
  // console.log(thePayload);
  // cp.spawnSync("curl", ['-X', 'POST', '--data-urlencode', thePayload, process.env.SLACK_WEBHOOK_URL]);

  var thePayload = 'payload={"channel": "#ll-tests", "username": "theworkflow-bot", "text": "<@marlon>: just got a message from Google Sheets: ' + req.body.sheetData + ' -- does that seem right?", "icon_emoji": ":desktop_computer:"}';
  console.log(thePayload);
  cp.spawnSync("curl", ['-X', 'POST', '--data-urlencode', thePayload, process.env.SLACK_WEBHOOK_URL]);
  res.send("got it" + JSON.stringify(req.body));
  console.log("\n\n");
  console.log("is this the first row? \n" + req.body.sheetData[0]);
});



module.exports = router;
