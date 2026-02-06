const passwordResetService = require("../services/passwordResetServices");
const emailService = require("../services/emailServices");
const APIError = require("../utils/APIError");
const sendResponse = require("../utils/sendResponse");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const result = await passwordResetService.requestPasswordReset(email);

  const { user, resetToken } = result;
  // console.log(user, resetToken);
  await emailService.sendPasswordResetEmail(user, resetToken);

  sendResponse(res, null, 200, {
    message: "Password reset link sent to email",
  });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await passwordResetService.resetPassword(token, newPassword);

  await emailService.sendPasswordResetConfirmation(user);

  sendResponse(res, null, 200, {
    message: "Password reset successful",
  });
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await passwordResetService.changePassword(
    req.user.userId, // from the authenticate middleware
    currentPassword,
    newPassword,
  );

  sendResponse(res, null, 200, {
    message: "Password changed successfully",
  });
};

module.exports = {
  forgotPassword,
  resetPassword,
  changePassword,
};
