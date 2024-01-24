const mongoose = require("mongoose");
const Joi = require("joi")
require("dotenv").config();
const jwt = require("jsonwebtoken")
const ArtistSchema = new mongoose.Schema({
  artistId:{
    type: String,
    require: true,
    unique: true,
    min: 5,
    max: 128,
  },
  name: {
    type: String,
    require: true,
    min: 2,
    max: 70,
  },
  email: {
    type: String,
    require: true,
    max: 90,
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
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  bio:{
    type: String,
    default: "",
  },
  picturePath: {
    type: String,
    default: "",
  },
  arts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Arts",
    },
  ],
});
ArtistSchema.methods.generateAuthToken = function(){
  const tokken = jwt.sign({_id: this._id},process.env.JWT_SECERT);
  return tokken;
}

const Artist = mongoose.model("Artist", ArtistSchema);

function validateArtist(artist) {
  const schema = Joi.object({
    artistId: Joi.string().min(5).max(128).required(),
    name: Joi.string().min(2).max(70).required(),
    email: Joi.string().max(90).required().email(),
    password: Joi.string().min(5).required(),
    phoneNumber: Joi.string().required(),
  });
  return schema.validate(artist);
}
module.exports = {
  Artist: Artist,
  validateArtist: validateArtist,
};