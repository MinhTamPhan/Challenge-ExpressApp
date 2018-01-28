const dbconfig = require('./db');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.url);
console.log("url moongo database: ", dbconfig.url);
const regPhone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

let User = mongoose.model('User', {
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
      `is not a valid phone number!`
    ] 
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

let user = new User({
   name: 'Practical Node.js',
   phone_number: '1234567890'
});
// user.save((err, results) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   } else {
//     console.log('Saved: ', results)
//     process.exit(0)
//   }
// })
