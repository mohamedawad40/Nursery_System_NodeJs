const mongoose = require("mongoose");

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
    address: addressSchema
});

module.exports = mongoose.model("children", childSchema);
