const dbconfig = require('./db');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = `mongodb://${dbconfig.host}:${dbconfig.port}/${dbconfig.database}`;
mongoose.connect(url);
console.log(url);