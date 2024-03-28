const TeacherSchema = require("./../model/teacherModel");


 exports.getAllTeacher = (req, res, next) => {
  TeacherSchema.find({})
  .then((data) => {
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
    let object = new TeacherSchema(req.body);
    object
      .save()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => next(error));
  };
  
  exports.updateTeacher = (req, res, next) => {
    TeacherSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((teacher) => {
        res.status(200).json({ teacher });
      })
      .catch((error) => next(error));
  };
  

  exports.deleteTeacher = (req, res, next) => {
    TeacherSchema.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ message: "Teacher deleted successfully" });
      })
      .catch((error) => next(error));
  };
  
  exports.getAllSupervisors = (req, res, next) => {
    TeacherSchema.find({ role: 'supervisor' })
      .then((supervisors) => {
        res.status(200).json({ supervisors });
      })
      .catch((error) => next(error));
  };

  