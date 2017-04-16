var express = require('express');
var mongoose = require('mongoose');

var leaderRouter = express.Router();
var Leaders = require('./Leader');

leaderRouter.route('/')
    .get(function (req, res, next) {
        Leaders.find({}, function (err, leader) {
            if (err) throw err;
            res.json(leader);
        });
    })

    .post(function (req, res, next) {
        Leaders.create(req.body, function (err, leader) {
            if (err) throw err;
            console.log('Leader created!');
            var id = leader.id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Added leader with id: ' + id);
        });
    })

    .delete(function (req, res, next) {
        Leaders.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

leaderRouter.route('/:leaderId')
    .get(function (req, res, next) {
        Leaders.findById(req.params.leaderId, function (err, leader) {
            if (err) throw err;
            res.json(leader);
        });
    })

    .put(function (req, res, next) {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, {
            new: true
        }, function (err, leader) {
            if (err) throw err;
            res.json(leader);
        });
    })

    .delete(function (req, res, next) {
        Leaders.findByIdAndRemove(req.params.leaderId, function (err, response) {
            if (err) throw err;
            res.json(response);
        })
    })

module.exports = leaderRouter;