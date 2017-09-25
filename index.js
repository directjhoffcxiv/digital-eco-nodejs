'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const Connection = require('tedious').Connection;

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
  //channelAccessToken: 'N1GTeUQXeB77zQpSTKeoprctXQDZI1OQPAJNfuDZVHgUHBEeY2zPQXiLG7dOhFodGwCu1PXFv+bY/wDAODAFN+rpKMLoQaUYjJGdxNIMWGcOMy7sbNjv8mDcMrFSw4HpMn2VmSR0s+CgY4kHc7BMDwdB04t89/1O/w1cDnyilFU=',
  //channelSecret: 'b99029980da84da3980d785cf5737d63'
};


//var  Connection = require('tedious').Connection;
var configDB = {
    userName: 'anuwatk',
    password: 'L@nnacom@1',
    server: 'digitaleco.database.windows.net',
    options: {encrypt: true, database: 'Digital_ECO'}
};
const ConnectionDB = new Connection(configDB);

//Connection = new Connection(configDB);
ConnectionDB.on('connect', function(err) {
    // If no error, then good to proceed.
        console.log("Connected");
        var echo2 = { type: 'text', text: ' Connect2'};
        executeStatement();
    });


// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  //res.json(req.body.events)
  //console.console.log('wtf');
  //res.end();
  //client.replyMessage(req.body.events.message.text);
  //client.replyMessage('1234556');
  Promise
      //client.replyMessage('1234556');
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    //var msg = {
    //    type: 'text',
    //    text: 'แสรดดดดดดดดด'
    //  };

    const echo = { type: 'text', text: event.message.text };

    return client.replyMessage(event.replyToken, echo + echo2);
}


// event handler
//function handleEvent(event) {
//  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
//    return Promise.resolve(null);
//  }

  // create a echoing text message
  //const echo = { type: 'text', text: event.message.text };
  // var msg = { type: 'text', text: 'สาดดดดดด'};
  // use reply API
//  return client.replyMessage(event.replyToken, msg);
//}

// listen on port
//const port = 8080 || 3000;
//app.listen(port, () => {
  //console.log(`listening on ${port}`);

  app.set('port', (process.env.PORT || 5000));

  app.listen(app.get('port'), function () {
      console.log('run at port', app.get('port'));
});
