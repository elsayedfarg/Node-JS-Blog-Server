const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    age: {
      type: Number,
      required: true,
      min: [10, "Age must be greater than 10"],
      max: [100, "Age must be less than 100"],
    },
    profilePicture: {
      url: String,
      fileId: String,
      filePath: String,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.set("id", false);

userSchema.index({
  name: "text",
  email: "text",
});

userSchema.virtual("followersCount", {
  ref: "Follow",
  localField: "_id",
  foreignField: "followingId",
  count: true,
});

userSchema.virtual("followingCount", {
  ref: "Follow",
  localField: "_id",
  foreignField: "followerId",
  count: true,
});

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
