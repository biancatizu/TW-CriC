const Person = require('../models/person.model');

exports.getAll = function (req, res) {
    Person.find({}, function(err, persons) {
        if(err) return next(err);
        res.send(persons);
    });
};

exports.create = function (req, res) {
    const person = new Person({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        situation: req.body.situation,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        description: req.body.description,
    });
    person.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Person added successfuly');
    });
};

exports.getPerson = function (req, res) {
    Person.findById(req.params.id, function (err, person) {
        if (err) return next(err);
        res.send(person);
    });
};

exports.update = function (req, res) {
    Person.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        function (err, person) {
            if (err) return next(err);
            res.send('Person updated');
        });
};

exports.delete = function(req, res) {
    Person.findByIdAndRemove(req.params.id, function(err) {
        if(err) return next(err);
        res.send('Deleted successfuly');
    });
};