const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog",
        // this field is points to the blog that this comment belongs to
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
        // this field is points to the user that created this object
    }
}, { timestamps: true, }
)

const Comment = model("comment", commentSchema);

module.exports = Comment;