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
    let child = new ChildSchema(req.body);
    child.save()
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => next(error));
};

exports.updateChild = (req, res, next) => {
    ChildSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((child) => {
            res.status(200).json({ data: child });
        })
        .catch((error) => next(error));
};

exports.deleteChild = (req, res, next) => {
    ChildSchema.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Child deleted successfully" });
        })
        .catch((error) => next(error));
};
