const { body , param} = require("express-validator");

exports.insertValidator = [
  body("_id")
    .isMongoId()
    .withMessage("Teacher ID should be an integer"),
  
  body("fullname")
    .isString()
    .withMessage("Full name should be a string"),

  body("password")
    .isLength({ min: 3 }) 
    .withMessage("Password should be at least 3 characters long"),

  body("email")
    .isEmail()
    .withMessage("Email should be a valid email address"),

  // body("image")
  //   .isString()
  //   .withMessage("Image should be a string"),
];


exports.updateValidator = [
  body("_id")
    .isMongoId()
    .withMessage("Teacher ID should be an integer"),
  
  body("fullname").optional()
    .isString()
    .withMessage("Full name should be a string"),

  body("password").optional()
    .isLength({ min: 3 }) 
    .withMessage("Password should be at least 3 characters long"),

  body("email").optional()
    .isEmail()
    .withMessage("Email should be a valid email address"),

  body("image").optional()
    .isString()
    .withMessage("Image should be a string"),
];


exports.validateId = [
  param("id")
      .isMongoId()
      .withMessage("Teacher id should be Monjo Id"),
];

// {
//   "id":  "603d99cbeeb29842146b157a", 
//   "fullname": "awad",
//   "password": "123",
//   "email": "johndoe@example.com",
//   "image": "https://example.com/profile_image.jpg"
// }
