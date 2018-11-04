const express = require('express');
const axios = require('axios');
const config = require('./config');
var fileModule = require('./modules/file');
var connectionModule = require('./modules/connectionService');
var path = require('path');
    
    const app = express();
    app.use(express.static('public'));
    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname + '/views/index.html'));
    })
    connectionModule.data.init(app);
    fileModule.file.init();
    
