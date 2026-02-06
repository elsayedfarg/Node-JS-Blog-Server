const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

const User = require("../models/userModel");
const APIError = require("../utils/APIError");

const jwtSign = util.promisify(jwt.sign);

const signUp = async (userData) => {
  // destructure user data to extract the needed fields
  const { password } = userData;

  // extract plain password and hash it
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user with hashed password
  return await User.create({
    ...userData,
    password: hashedPassword,
  });
};

const signIn = async ({ email, password }) => {
  // find user by email
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new APIError("Invalid email or password", 401);
  }

  // compare hashed password with plain password
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new APIError("Invalid email or password", 401);
  }
  // return token
  const payload = {
    userId: user._id,
    role: user.role,
  };

  const token = await jwtSign(payload, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  data = {
    token,
    tokenExpiry: new Date(Date.now() + (1 + 2) * 60 * 60 * 100),
    userType: user.role,
  };
  return data;
};

const getAllUsers = async ({ page = 1, limit = 5 }) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [users, totalUsers] = await Promise.all([
    User.find({}, { password: 0 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("followersCount")
      .populate("followingCount"),
    User.countDocuments(),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(totalUsers / limit),
    totalUsers,
  };

  return { users, pagination };
};

const getUserById = async (userId) => {
  return await User.findById(userId)
    .select("-password")
    .populate("followersCount")
    .populate("followingCount");
};

const updateUserById = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

const searchUser = async (queryParams) => {
  const { name, email } = queryParams;

  let filter = {};
  if (name) {
    filter.$text = { $search: name };
  }
  if (email) {
    filter.email = email;
  }

  const users = await User.find(filter).select("-password");

  return users;
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
