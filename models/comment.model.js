const mongoose = require('mongoose');


const CommentSchema = mongoose.Schema({
    commentBody: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true

    });



const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment };
