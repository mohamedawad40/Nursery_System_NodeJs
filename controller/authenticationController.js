const TeacherSchema = require("./../model/teacherModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
    // Find the user by their full name
    TeacherSchema.findOne({ fullname: req.body.fullname })
        .then((user) => {
            if (!user) {
                throw new Error("User not found");
            }
            // Compare the provided password with the hashed password stored in the database
            console.log(user.password);
            console.log(req.body.password);
            bcrypt.compare(req.body.password, user.password)
                .then((result) => {
                    if (result) {
                        // Passwords match, generate JWT token
                        let token = jwt.sign(
                            {
                                _id: user._id,
                                role: user.role,
                            },
                            process.env.SECRETKEY,
                            { expiresIn: "1hr" }
                        );

                        res.json({ message: "Authenticated", token });
                    } else {
                        // Passwords don't match, authentication failed
                        // throw new Error("Invalid password");
                        res.json({ message: "notAuthenticated" });
                    }
                })
                .catch((error) => {
                    throw error; 
                });
        })
        .catch((error) => {
            // Handle errors
            console.error("Login error:", error);
            res.status(401).json({ message: "Authentication failed" });
        });
};
