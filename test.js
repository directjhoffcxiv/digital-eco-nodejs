'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const Connection = require('tedious').Connection;

var configDB = {
    userName: 'anuwatk',
    password: 'L@nnacom@1',
    server: 'digitaleco.database.windows.net',
    options: {encrypt: true, database: 'Digital_ECO'}
};

    var connectionDB = new Connection(configDB);
      connectionDB.on('connect', function(err) {
          console.log("Connected");
          executeStatement();

      });

    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement(){
    var  request = new Request("SELECT * FROM [dbo].[Alluser]",function(err){
        if(err){
          console.log(err);}
          connectionDB.close();
      });

      var result = "";
      request.on('row',function(columns){
        columns.forEach(function(column){
          if(column.value === null){
            console.log('NULL');
          }else {
            result += column.value + " ";
          }
        });
        console.log(result);
        result ="";
        });
          request.on('done',function(rowCount, more){
          console.log(rowCount + 'rows Returned');
      });
      connectionDB.execSql(request);
    }
