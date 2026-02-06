const User = require("../models/userModel");
const APIError = require("../utils/APIError");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  return resetToken;
};

const saveResetToken = async (userId, token) => {
  const user = await User.findById(userId);
  if (!user) throw new APIError("User not found", 404);

  // hash the token at first then save it to the database
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 15 * 60 * 1000;
  await user.save();
};

const verifyResetToken = async (token) => {
  // hash the user token to be able to compare it with the other one in the database
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // get the user by token then check token validity
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new APIError("Token is invalid or has expired", 400);

  return user;
};

const resetPassword = async (token, newPassword) => {
  const user = await verifyResetToken(token);

  const hashedPassword = await bcrypt.hash(newPassword, 10); // i have forgot to hash it before saving it into the database
  user.password = hashedPassword;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  return user;
};

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new APIError("User not found", 404);

  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!isPasswordCorrect) {
    throw new APIError("Current password is incorrect", 401);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return user;
};

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }

  const resetToken = generateResetToken();

  await saveResetToken(user._id, resetToken);

  return { user, resetToken };
};

module.exports = {
  generateResetToken,
  saveResetToken,
  verifyResetToken,
  resetPassword,
  changePassword,
  requestPasswordReset,
};
