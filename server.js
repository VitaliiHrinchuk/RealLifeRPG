const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const router = require('./api/routes/router');

const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost:27017/ReaLifeRPG',{useNewUrlParser: true});
mongoose.connection.on('open', (ref)=>{
    console.log('Connected to mongo server.');
    //trying to get collection names
    // mongoose.connection.db.listCollections().toArray(function (err, names) {
    //     console.log(names); // [{ name: 'dbname.myCollection' }]
    //     module.exports.Collection = names;
    // });
})
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


server.use('/', router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log("server is listening on port: "+PORT));