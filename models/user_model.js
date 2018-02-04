const mongoose = require('mongoose');
const regPhone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: [5, 'min length 5 character'],
    required: [true, 'name field is required']
  },
  phone_number: {
    type: String,
    unique: true, 
    required: [true, 'phone number field  is required'],
    validate: [
      function(phone_number) {
        return phone_number.match(regPhone)
      },
      'is not a valid phone number!'
    ] 
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});
module.exports = userSchema