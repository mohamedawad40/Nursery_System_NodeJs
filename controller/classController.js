const ClassSchema = require("../model/classModel");
const childSchema = require("../model/childModel");
const teacherSchema = require("../model/teacherModel");

exports.getAllClasses = (req, res, next) => {
    ClassSchema.find({})
        .populate({ path: "supervisor", select: { fullname: 1, _id: 0 } })
        .populate({ path: "children", select: { fullName: 1, _id: 0 } })
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

exports.insertClass = async (req, res, next) => {
    try {
        // Check if the supervisor exists
        const supervisor = await teacherSchema.findOne({ _id: req.body.supervisor });
        if (!supervisor) {
            return res.status(404).json({ message: "Supervisor not found" });
        }

        // Check if all children exist
        const children = await childSchema.find({ _id: { $in: req.body.children } });
        if (children.length !== req.body.children.length) {
            const missingChildIds = req.body.children.filter(childId => !children.find(child => child._id === childId));
            return res.status(404).json({ message: `${missingChildIds.length} children not found` });
        }

        // Create and save the new class
        const newClass = new ClassSchema(req.body);
        await newClass.save();

        // Respond with success message
        res.status(200).json({ message: "New class added" });
    } catch (error) {
        next(error);
    }
};



exports.updateClass = async (req, res, next) => {
    if (req.body.supervisor!=null) {
        const teacher = await teacherSchema.findOne({ _id: req.body.supervisor });
        if (!teacher) {
            next(new Error("Teacher not found"));
        }
    } else if (req.body.children != null) {
        const children = await childSchema.find({ _id: { $in: req.body.children } });
        if (children.length !== req.body.children.length) {
            next(new Error(`${req.body.children.length - children.length} children not found`));
        }
    }
    ClassSchema.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: "Class not found" });
            }
            res.status(200).json({ data: "updated" });
        })
        .catch((err) => next(err));

};

exports.deleteClass = (req, res, next) => {
    ClassSchema.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Class not found for id: " + req.params.id });
            }
            res.status(200).json({ message: "Class deleted", data: data });
        })
        .catch((err) => next(err));
};

exports.getClassChildrenInfo = (req, res, next) => {
    ClassSchema.findOne({ _id: req.params.id })
        .populate({ path: "children", select: { _id: 0, fullName: 1 } })
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: "Class not found" });
            }
            res.status(200).json(data);
        })
        .catch((err) => next(err));
}


exports.getClassTeacherInfo = (req, res, next) => {
    ClassSchema.find({ _id: req.params.id }, { _id: 0, supervisor: 1, })
        .populate({ path: "supervisor", select: { _id: 0, fullname: 1 } })
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: "Class not found" });
            }
            res.status(200).json(data);
        })
        .catch((err) => next(err));
}

