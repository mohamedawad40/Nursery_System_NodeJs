const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" }, 
  children: [{ type: Number, ref: "children" }] 
});


module.exports = mongoose.model("classes", classSchema);
