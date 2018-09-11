const mongoose = require('mongoose');


const ReviewSchema = mongoose.Schema({
    photographersName: { type: String, required: true },
    photographerAlias: { type: String },
    activeLocation: {
        type: String,
    },

    starRating: {
        type: Num,
    },
    status: {type: String,
        enum: ['isApproved', 'isRejected', 'isPostponed'],
        default: 'isUnrated'},

    encounterDate: {
        type: Date,
        required: true,
    },

    reviewText: {
        type: String,
    },
    Author: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ],
    
},{
    timestamps: true

    });


const Review = mongoose.model('Review', ReviewSchema);

module.exports = { Review };
