const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetType: {
      type: String,
      enum: ["Post", "Comment"],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "targetType",
      required: true,
    },
  },
  { timestamps: true },
);
likeSchema.index({ userId: 1, targetType: 1, targetId: 1 }, { unique: true });

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
