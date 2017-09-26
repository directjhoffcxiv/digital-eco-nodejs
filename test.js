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
var G_BB ='1';
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

    var connectionDB = new Connection(configDB);
      connectionDB.on('connect', function(err) {
        console.log("Connected");
        //executeStatement();
        var temp3 = executeStatement(function(Result){
          if(Result){
            console.log(Result);
          }
        });
        //console.log(temp3);
        //console.log(G_BB);
      });

    function executeStatement(done){

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
        //console.log(result);
        G_BB = result;
        done(result);
        //console.log(G_BB);
        //result ="";
        });
          request.on('done',function(rowCount, more){
          //console.log(rowCount + 'rows Returned');

      });
      connectionDB.execSql(request);

    }
