const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const classSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" }, 
  children: [{ type: Number, ref: "children" }] 
});

classSchema.plugin(AutoIncrement, { id: "class", incField:"_id" });

module.exports = mongoose.model("classes", classSchema);
