const mongoose = require("mongoose");
const bcrypt=require('bcrypt');

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullname: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
    image: { type: String },
    role: { type: String, enum: ['admin', 'teacher'], required: true},
    image: {type:String}
  });


  schema.pre( "save", async function (next) {
      
    if (this.role === 'admin') {
        const existingAdmin = await this.constructor.findOne({ role: 'admin' });
        if (existingAdmin) {
            throw new Error('An admin already exists. Only one admin is allowed.');
        }
    }
    
    
    const salt=await bcrypt.genSaltSync();
      this.password= bcrypt.hashSync(this.password,salt);
      next();
  })



  module.exports = mongoose.model("teachers", schema);




  // {
  //   "fullname": "ali",
  //   "password": "111",
  //   "email": "john.doe@example.com",
  //   "image": "profile_picture.jpg",
  //   "role": "admin"
  // }
  