const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

// Address sub-schema
const addressSchema = new Schema({
        city: { type: String },
        street: { type: String },
        building: { type: String }
    },
    { _id: false }
);

// Child schema
const childSchema = new Schema({
    _id: { type: Number },
    fullName: { type: String },
    age: { type: Number },
    level: { type: String, enum: ["PreKG", "KG1", "KG2"] },
    image: {type:String},
    address: addressSchema
});

// childSchema.plugin(AutoIncrement, {inc_field: '_id'});
childSchema.plugin(AutoIncrement, { id: "child", incField: "_id" });

module.exports = mongoose.model("children", childSchema);
