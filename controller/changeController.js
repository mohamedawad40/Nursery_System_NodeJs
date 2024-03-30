const bcrypt = require("bcrypt");
const TeacherSchema = require("./../model/teacherModel");

const handleChangePassword = async (req, res) => {
    try {
        const { _id, password ,newpassword } = req.body;
        console.log(_id);
        console.log(password);

        const user = await TeacherSchema.findById(_id);
        console.log(user.password);

        if (!user) {
            return res.status(400).send({ message: "User not found" }); 
        } 
        // console.log(user.password + '---' + password);

        const oldPasswordMatched = await bcrypt.compare(password, user.password);
        if (!oldPasswordMatched) {
            return res.status(401).send({ message: "Old password did not match" });
        }
        console.log(newpassword);
        const salt = await bcrypt.genSalt();
        const newPasswordHash = await bcrypt.hash(newpassword, salt);
        console.log("newpassword: " +newPasswordHash)
        // user.password = newPasswordHash;
        const userpass =await TeacherSchema.findByIdAndUpdate(_id,{password : newPasswordHash}, {new:true});
        // const updatedUser = await userpass.save();    ///error
        console.log(userpass);
        res.send(userpass);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
};

module.exports = handleChangePassword;
