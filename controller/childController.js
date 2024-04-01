const ChildSchema = require("../model/childModel");

exports.getAllChildren = (req, res, next) => {
    ChildSchema.find({})
        .then((children) => {
            res.status(200).json({ data: children });
        })
        .catch((error) => next(error));
};

exports.getChildById = (req, res, next) => {
    ChildSchema.findOne({ _id: req.params.id })
        .then((child) => {
            if (!child) {
                throw new Error("Child not found");
            }
            res.status(200).json({ data: child });
        })
        .catch((error) => next(error));
};

exports.insertChild = (req, res, next) => {
    let child = new ChildSchema({
        _id: req.body._id,
        fullName: req.body.fullName,
        age : req.body.age,
        level: req.body.level,
        address:req.body.address,
        image: req.file.filename, 
    });
    child.save()
        .then((data) => {
            res.status(200).json({ data :"new child added"});
        })
        .catch((error) => next(error));
};
exports.updateChild = (req, res, next) => {
    const id = req.body._id;
    const updateData = {};

    // Assign the fields to update from req.body to updateData
    updateData.fullName = req.body.fullName;
    updateData.age = req.body.age;
    updateData.level = req.body.level;

    // Check if req.file exists before accessing req.file.filename
    if (req.file) {
        updateData.image = req.file.filename;
    }

    // Update the child record with the new data
    ChildSchema.findByIdAndUpdate(id, updateData, { new: true })
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: "Child not found" });
            }
            res.status(200).json({ data: "updated" });
        })
        .catch((err) => next(err));
};

exports.deleteChild = (req, res, next) => {
    ChildSchema.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Child deleted successfully" });
        })
        .catch((error) => next(error));
};
