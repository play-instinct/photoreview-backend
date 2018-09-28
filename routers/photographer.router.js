const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Photographer = require('../models/photographer.model');
const Review = require('../models/review.model');
const disableWithToken = require('../middlewares/disableWithToken.middleware').disableWithToken;
const requiredFields = require('../middlewares/requiredFields.middleware');
const errorsParser = require('../helpers/errorsParser.helper');

require('../strategy/jwt.strategy')(passport);

// Create API group routes
const router = express.Router();

router.route('/photographers')
    .post(disableWithToken, requiredFields('name' ), (req, res) => {
        let gPhotographer;
        
        Photographer.find({ name: req.body.name })
        .then((foundResult) => {
            if (!foundResult) {
                    return Photographer.create({
                        name: req.body.name,
                        photographerAlias: req.body.photographerAlias,
                        website_url: req.body.website_url,
                        instagram_url: req.body.instagram_url,
                        created_by: req.body.created_by,
                        reviews: []

                    });
                }
            else {return foundResult }
        })
        .then((createdPhotographer) => {
                gPhotographer = createdPhotographer;
                return Review.create({
                status: req.body.status,
                encounterDate: req.body.encounterDate,
                starRating: req.body.starRating,
                encounterLocation: req.body.encounterLocation,
                reviewText: req.body.reviewText,
                author: req.body.author
            })
        })
        .then(createdReview => {
           return Photographer.findOneandUpdate({
                _id: gPhotographer._id
            }, {$push: {reviews: createdReview._id}})
        })
        .then(() => res.json({}))
        .catch(report => res.status(400).json(errorsParser.generateErrorResponse(report)));
    })

//route to photographer must populate reviews as well 

router.route('/photographers/:id')
    .get(passport.authenticate('jwt', { session: false }), (req, res) => {
        Photographer.findById(req.params.id)
        .populate('reviews')
        .then(user => res.json({ user }));
    });


module.exports = { router };
