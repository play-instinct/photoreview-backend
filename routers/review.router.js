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

router.route('/reviews/:id')
    .get(passport.authenticate('jwt', { session: false }), (req, res) => {
        Review.findById(req.params.id)
        .then(review => res.json({ review }));
    });


module.exports = { router };
