const ClassSchema = require("../model/classModel");

exports.getAllClasses = (req, res, next) => {
    ClassSchema.find({})
        .populate({ path: "supervisor", select: { fullname: 1, _id: 0 } })
        .populate({ path: "children", select: { fullname: 1, _id: 0 } })
        .then((data) => {
            res.status(200).json({ data: data });
        })
        .catch((error) => next(error));
};

exports.getClassById = (req, res, next) => {
    ClassSchema.findOne({ _id: req.params.id })
        .populate({ path: "supervisor", select: { fullname: 1, _id: 0 } })
        .populate({ path: "children", select: { fullname: 1, _id: 0 } })
        .then((object) => {
                if (!object) {
                throw new Error("Class not found");
            }
            res.status(200).json({ data: object });
        })
        .catch((error) => next(error));
};

exports.insertClass = (req, res, next) => {
    let object = new ClassSchema(req.body);
    object.save()
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => next(error));
};

exports.updateClass = (req, res, next) => {
    ClassSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((classObj) => {
            res.status(200).json({ data: classObj });
        })
        .catch((error) => next(error));
};

exports.deleteClass = (req, res, next) => {
    ClassSchema.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Class deleted successfully" });
        })
        .catch((error) => next(error));
};

exports.getClassChildrenInfo = (req, res, next) => {
    ClassSchema.findOne({ _id: req.params.id })
        .populate('children') 
        .then((classObj) => {
            if (!classObj) {
                throw new Error("Class not found");
            }
            res.status(200).json({ children: classObj.children });
        })
        .catch((error) => next(error));
};

exports.getClassTeacherInfo = (req, res, next) => {
    ClassSchema.findOne({ _id: req.params.id })
        .populate('supervisor') 
        .then((classObj) => {
            if (!classObj) {
                throw new Error("Class not found");
            }
            res.status(200).json({ supervisor: classObj.supervisor });
        })
        .catch((error) => next(error));
};
