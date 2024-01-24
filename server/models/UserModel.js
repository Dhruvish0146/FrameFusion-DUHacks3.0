const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 2,
    max: 70,
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 5,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  // cart: {
  //   type: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Arts",
  //     },
  //   ],
  // },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  orders:{
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Arts",
      },
    ],
  }
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECERT);
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(70).required(),
    email: Joi.string().max(90).required().email(),
    password: Joi.string().min(5).required(),
    phoneNumber: Joi.string().required(),
  });
  return schema.validate(user);
}

const User = mongoose.model("User", userSchema);
module.exports = {
  User: User,
  validateUser: validateUser,
};
