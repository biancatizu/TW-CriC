const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    firstname: {type: String, required: true, max: 25},
    lastname: {type: String, required: true, max: 25},
    situation: {type: String, required: true, max: 25},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    description: {type: String, required: false, max: 200}
});

module.exports = mongoose.model('Person', PersonSchema);