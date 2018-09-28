const mongoose = require('mongoose');


const PhotographerSchema = mongoose.Schema({
    name: { type: String },
    photographerAlias: [{ type: String }],
    website_url: {type: String},
    instagram_url: {type: String},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],

}, {
    timestamps: true

    });



module.exports = mongoose.model('Photographer', PhotographerSchema);

// const Photographer = mongoose.model('Photographer', PhotographerSchema);

// module.exports = { Photographer };
