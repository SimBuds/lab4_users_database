const mongoose = require('mongoose');

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
const zipCodeRegex = /^\d{5}-\d{4}$/;
const phoneRegex = /^1-\d{3}-\d{3}-\d{4}$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    required: true,
    match: emailRegex
  },
  city: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]*$/
  },
  zipcode: {
    type: String,
    required: true,
    match: zipCodeRegex
  },
  phone: {
    type: String,
    required: true,
    match: phoneRegex
  },
  website: {
    type: String,
    required: true,
    match: urlRegex
  }
});

module.exports = mongoose.model('User', userSchema);