var express = require('express');
var mongoose = require('mongoose');

var promotionRouter = express.Router();
var Promotions = require('./Promotion');

promotionRouter.route('/')
    .get(function (req, res, next) {
        Promotions.find({}, function (err, promotion) {
            if (err) throw err;
            res.json(promotion);
        });
    })

    .post(function (req, res, next) {
        Promotions.create(req.body, function (err, promotion) {
            if (err) throw err;
            var id = promotion.id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added promotion with id: ' + id);
        });
    })

    .delete(function (req, res, next) {
        Promotions.remove({}, function (err, response) {
            if (err) throw err;
            res.json(response);
        })
    });

promotionRouter.route('/promotionId')
.get(function (req, res, next) {
        Promotions.findById(req.params.promotionId, function (err, promotion) {
            if (err) throw err;
            res.json(promotion);
        });
    })

    .put(function (req, res, next) {
        Promotions.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body
        }, {
            new: true
        }, function (err, promotion) {
            if (err) throw err;
            res.json(promotion);
        });
    })

    .delete(function (req, res, next) {
        Promotions.findByIdAndRemove(req.params.promotionId, function (err, response) {
            if (err) throw err;
            res.json(response);
        })
    })

module.exports = promotionRouter;