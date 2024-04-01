const { response } = require("express");
const TeacherSchema = require("./../model/teacherModel");
const ClassSchema = require("./../model/classModel");


 exports.getAllTeacher = (req, res, next) => {
  TeacherSchema.find({})
  .then((data) => {
    console.log(data);
    res.status(200).json({ data });
  })
  .catch((error) => next(error));
};


  exports.getTeacherById=(req, res, next) => {
    TeacherSchema.findById({ _id: req.params.id })
    .then((object) => {
      if (!object) {
        throw new Error("Teacher not Exists");
      }
      res.status(200).json({ object });
    })
    .catch((error) => next(error));
  };
  
  exports.insertTeacher = (req, res, next) => {
    // response.json({body:request.body , file:request.file})
    let object = new TeacherSchema({
      _id: req.body._id,
      fullname: req.body.fullname,
      email : req.body.email,
      password: req.body.password,
      role:req.body.role,
      image: req.file.filename,   //Extract the filename from the uploaded image
    });
    object
      .save()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => next(error));
  };
 

  // const fs = require('fs');

  // exports.insertTeacher = (req, res, next) => {
  //     // Create a new instance of TeacherSchema with request body
  //     let object = new TeacherSchema({
  //         _id: req.body._id,
  //         fullname: req.body.fullname,
  //         email: req.body.email,
  //         password: req.body.password,
  //         role: req.body.role,
  //         image: req.file.buffer // Assuming image field in TeacherSchema stores the file buffer
  //     });
  
  //     // Save the teacher details to the database
  //     object.save()
  //         .then((data) => {
  //             // Write the image to the file system with the name of the user's ID
  //             fs.writeFile(`images/${data._id}.jpg`, req.file.buffer, (err) => {
  //                 if (err) {
  //                     // If there's an error saving the image, delete the teacher record and return an error
  //                     TeacherSchema.findByIdAndDelete(data._id, (err) => {
  //                         if (err) {
  //                             return next(new Error("Error occurred while saving image. Teacher record also not saved."));
  //                         }
  //                         return next(new Error("Error occurred while saving image."));
  //                     });
  //                 } else {
  //                     // If image saved successfully, return the teacher record
  //                     res.status(200).json({ data });
  //                 }
  //             });
  //         })
  //         .catch((error) => next(error));
  // };
  
exports.updateTeacher = (req, res, next) => {
  const id = req.body._id;
  const updateData = {};

  updateData.fullname = req.body.fullname;
  updateData.email = req.body.email;
  // updateData.password = req.body.password;
  updateData.role = req.body.role;

  // Check if req.file exists before accessing req.file.filename
  if (req.file) {
      updateData.image = req.file.filename;
  }

  TeacherSchema.findByIdAndUpdate(id, updateData, { new: true })
      .then((data) => {
          if (!data) {
              res.status(404).json({ data: "Teacher not found" });
          }
          res.status(200).json({ data: "updated" });
      })
      .catch((err) => next(err));
};

  exports.deleteTeacher = (req, res, next) => {
    const id = req.params.id;
  
    TeacherSchema.findById(id)
      .then(teacher => {
        if (!teacher) {
          res.status(404).json({ data: "Teacher not found" });
          return;
        }
  
        // Check if the teacher is supervising any classes
        ClassSchema.find({ supervisor: id })
          .then(classes => {
            if (classes.length > 0) {
              
              TeacherSchema.findOne({ _id: { $ne: id } })
                .then(defaultSupervisor => {
                  ClassSchema.updateMany({ supervisor: id }, { supervisor: defaultSupervisor._id })
                    .then(() => {
                      TeacherSchema.findByIdAndDelete(id)
                        .then(() => {
                          res.status(200).json({ data: "Teacher deleted" });
                        })
                        .catch(error => next(error));
                    })
                    .catch(error => next(error));
                })
                .catch(error => next(error));
            } else {
              TeacherSchema.findByIdAndDelete(id)
                .then(() => {
                  res.status(200).json({ data: "Teacher deleted" });
                })
                .catch(error => next(error));
            }
          })
          .catch(error => next(error));
      })
      .catch(error => next(error));
  };
  
  

  exports.getAllSupervisors = (req, res, next) => {
    ClassSchema.find({})
    .populate(
      {
        path:'supervisor', 
        select: {fullname: 1,_id:0},
      }
      )
    .then(data=>{
      let supervisors = data.map(item=>item.supervisor);
      res.status(200).json({supervisors})
    })
    .catch(err=>next(err));
  }

  