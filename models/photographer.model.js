const mongoose = require('mongoose');


const Photographer = mongoose.Schema({
    name: { type: String },
    photographerAlias: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviews: [{
        _id: false,
        review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    }],

}, {
    timestamps: true

    });



const Photographer = mongoose.model('Photographer', PhotographerSchema);

module.exports = { Photographer };
