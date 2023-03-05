const mongoose = require("mongoose");
// const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// UserSchema.pre("save", async function(next){
//   // if(!this.isModified("password")){
//   //   next()
//   // }
//  this.password = await bcrypt.hash(this.password, 10);
//   // const salt = await bcrypt.genSalt(10)
//   // this.password = await bcrypt.hash(this.password,salt)
//   console.log("aaa");
//   next()
// })

const User = mongoose.model("User", UserSchema);
module.exports = User;
