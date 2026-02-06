const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minLength: [1, "Comment must be at least 1 character"],
      maxLength: [1000, "Comment cannot exceed 1000 characters"],
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: false }, // prevent virtual comment id from appearing
    toObject: { virtuals: false },
  },
);

commentSchema.virtual("likesCount", {
  ref: "Like",
  localField: "_id",
  foreignField: "targetId",
  count: true,
  match: { targetType: "Comment" },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
