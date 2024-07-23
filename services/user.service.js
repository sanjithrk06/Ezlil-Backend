const User = require("../models/user.model");
const Address = require("../models/address.model");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createUser = async (userData) => {
  try {
    const { firstName, lastName, email, mobile, password, role, address } =
      userData;

    // Validation
    if (!email) throw new Error("Email field must be filled");
    if (!password) throw new Error("Password field must be filled");
    if (!mobile) throw new Error("Mobile field must be filled");
    if (!validator.isEmail(email)) throw new Error("Email is not valid");
    if (!validator.isStrongPassword(password))
      throw new Error("Password not strong enough");

    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) throw new Error("Email already in use");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create the user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hash,
      role: role || "User",
      mobile,
    });
    // Handle address
    if (address) {
      let addressData;
      if (address[0] && address[0]._id) {
        // Address exists
        addressData = await Address.findById(address[0]._id);
        if (!addressData) throw new Error("Address not found");
      } else {
        // Create new address
        addressData = new Address({
          ...address,
          user: user._id, // Associate the address with the user
        });
        await addressData.save();

        user.address.push(addressData._id);
        await user.save();
      }
    }

    // Save the user
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId).populate("address");
    if (!user) throw new Error(`User not found with id: ${userId}`);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error(`User not found with email: ${email}`);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await findUserById(userId);
    if (!user) throw new Error(`User not found with id: ${userId}`);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAllUsers = async () => {
  try {
    return await User.find().populate("address");
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserById = async (userId, updateData) => {
  try {
    // Extract address data if present
    const { address, ...userUpdates } = updateData;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) throw new Error(`User not found with id: ${userId}`);

    // Update address if address data is provided
    if (address) {
      // Check if user already has an address
      let userAddress = await Address.findOne({ _id: { $in: user.address } });

      if (userAddress) {
        // Update existing address
        await Address.findByIdAndUpdate(userAddress._id, address);
      } else {
        // Create a new address if not found
        const newAddress = new Address({
          ...address,
          user: user._id, // Associate the address with the user
        });
        await newAddress.save();
        // Add new address ID to user's address array
        user.address.push(newAddress._id);
      }
    }

    // Update user data
    Object.assign(user, userUpdates);
    await user.save();

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUserById = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error(`User not found with id: ${userId}`);
    return `User with id ${userId} deleted successfully`;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
  updateUserById,
  deleteUserById,
};
