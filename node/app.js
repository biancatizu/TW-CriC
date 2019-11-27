const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const person = require('./routes/person.route');

const databaseUrl = 'mongodb+srv://bianca:bianca@cluster0-pvwh5.mongodb.net/test?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || databaseUrl;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/persons', person);

const port = 4201;
app.listen(port, () => {
    console.log('Server running on port number ' + port);
});