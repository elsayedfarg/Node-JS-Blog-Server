const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["draft", "scheduled", "published"],
      default: "draft",
    },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
    images: [
      {
        url: String,
        fileId: String,
        filePath: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

postSchema.set("id", false);

postSchema.index({
  title: "text",
  content: "text",
});

postSchema.virtual("likesCount", {
  ref: "Like",
  localField: "_id",
  foreignField: "targetId",
  count: true,
  match: { targetType: "Post" },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
