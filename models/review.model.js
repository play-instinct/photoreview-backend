const mongoose = require('mongoose');


const ReviewSchema = mongoose.Schema({

    starRating: {
        type: Number,
    },
    status: {type: String,
        enum: ['approved', 'rejected', 'postponed', 'unrated'],
        default: 'unrated'},

    encounterDate: {
        type: Date
    },

    encounterLocation: {
        type: String
    },

    reviewText: {
        type: String,
    },
    author: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    
},{
    timestamps: true

    });


module.exports = mongoose.model('Review', ReviewSchema);

