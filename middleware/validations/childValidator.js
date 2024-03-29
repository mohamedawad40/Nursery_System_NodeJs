const { body, param } = require("express-validator");

exports.insertValidator = [
  body("_id")
    .isInt()
    .withMessage("Child ID should be an integer"),

  body("fullName")
    .isString()
    .withMessage("Full name should be a string"),

  body("age")
    .isInt({ min: 6 })
    .withMessage("Age should be a non-negative integer"),

  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level should be one of: PreKG, KG1, KG2"),

  // body("address.city")
  //   .isString()
  //   .withMessage("City should be a string"),

  // body("address.street")
  //   .isString()
  //   .withMessage("Street should be a string"),

  // body("address.building")
  //   .isString()
  //   .withMessage("Building should be a string")
];


exports.updateValidator = [
  body("_id")
    .isInt()
    .withMessage("Child ID should be an integer"),

  body("fullName").optional()
    .isString()
    .withMessage("Full name should be a string"),

  body("age").optional()
    .isInt({ min: 6 })
    .withMessage("Age should be more than 6"),

  body("level").optional()
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level should be one of: PreKG, KG1, KG2"),

  body("address.city").optional()
    .isString()
    .withMessage("City should be a string"),

  body("address.street").optional()
    .isString()
    .withMessage("Street should be a string"),

  body("address.building").optional()
    .isString()
    .withMessage("Building should be a string")
];

exports.childIdvalidator = [
  param("id")
      .isInt()
      .withMessage("Child ID should be an integer"),
];


// {
//   "_id": 2,
//   "fullName": "islam",
//   "age": 7,
//   "level": "PreKG",
//   "address": {
//     "city": "Example City",
//     "street": "Example Street",
//     "building": "123 Example Building"
//   }
// }
