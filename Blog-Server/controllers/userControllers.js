const userService = require("../services/userServices");
const emailService = require("../services/emailServices");

const sendResponse = require("../utils/sendResponse");
const throwIfNotFound = require("../utils/throwIfNotFound");

const signUp = async (req, res) => {
  const newUser = await userService.signUp(req.body);
  emailService.sendWelcomeEmail(newUser);
  sendResponse(res, newUser, 201);
};

const signIn = async (req, res) => {
  const data = await userService.signIn(req.body);
  sendResponse(res, null, 201, { data });
};

const getAllUsers = async (req, res) => {
  const { users, pagination } = await userService.getAllUsers(req.query);
  sendResponse(res, users, 200, {
    results: users.length,
    pagination,
  });
};

const getUserById = async (req, res) => {
  const user = throwIfNotFound(
    await userService.getUserById(req.params.userId),
    "User not found",
  );
  sendResponse(res, user);
};

const updateUserById = async (req, res) => {
  const updatedUser = throwIfNotFound(
    await userService.updateUserById(req.params.userId, req.body),
    "User not found",
  );
  sendResponse(res, updatedUser);
};

const deleteUserById = async (req, res) => {
  throwIfNotFound(
    await userService.deleteUserById(req.params.userId),
    "User not found",
  );

  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
};

const searchUser = async (req, res) => {
  const users = await userService.searchUser(req.query);

  sendResponse(res, users);
};

module.exports = {
  signUp,
  signIn,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  searchUser,
};
