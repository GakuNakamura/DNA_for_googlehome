'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

// Intentのアクション名を指定
const NAME_ACTION = 'start_dna';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const app = new App({request, response});

    var timezoneoffset = -9;
    var dt = new Date(Date.now()-timezoneoffset*60*60000);
//    var dt = new Date();
    var year = dt.getFullYear();
    var month = dt.getMonth()+1;
    var date = dt.getDate();
    var url = 'https://d1atgierv9op2.cloudfront.net/material/article/dna/listening/'+year+'/';
    var url1='';
    var url2='';
    if(month==3) {
        if(date < 29) {
            url2 = parseInt((date-1)/7 + 1);
            url1 = 'mar_week'+ url2 + '/' + ((date-1)%7+1) + '.mp3';
        } else {
            url1 = 'apr_week1/' + ((date-1)%7+1) + '.mp3'; 
        }
        
    }
    if(month == 2) {
        url2 = parseInt((date-1)/7+1);
        url1 = 'feb_week' + url2 + '/'+ ((date-1)%7+1) + '.mp3';
    }
    if(month == 4) {
        if(date < 26) {
            url2 = parseInt((date+2)/7 + 1);
            url1 = 'apr_week'+ url2 + '/' + ((date+2)%7+1) + '.mp3';
        } else {
            url1 = 'may_week1/' + ((date+2)%7+1) + '.mp3';
        }
    }
    if(month==5) {
        if(date < 31) {
            url2 = parseInt((date+4)/7 + 1);
            url1 = 'may_week'+ url2 + '/' + ((date+4)%7+1) + '.mp3';
        } else {
            url1 = 'jun_week1/1.mp3';
        }
    }
    
    

    function StartDna (app) {
        app.tell({
          speech: '<speak>今日のレアジョブデイリーニュースアーティクルを再生します。<audio src="'+url+url1+'"/></speak>'
        });
    }
    let actionMap = new Map();
    actionMap.set(NAME_ACTION, StartDna);
    app.handleRequest(actionMap);
});
