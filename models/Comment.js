const { Schema, model } = require('mongoose');

const CommentShema = new Schema ({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = model('Comment', CommentShema);

module.exports = Comment;