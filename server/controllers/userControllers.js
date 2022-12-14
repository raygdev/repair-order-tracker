const roModel = require("../models/repairOrderModel.js");
const userModel = require("../models/userModel.js")
const { generateToken } = require('./middleware/tokenUtil')

exports.getUser = (req,res, next) => {
  userModel.findUserById(req.params.userId,(err, user) => {

    if(err) return res.status(404).json({message:"something went wrong"});

    if(!user) return res.status(404).json({message:`Can't seem to find that user`});

    return res.status(200).json({
        ...user._doc,
        token: generateToken(user._id)
    })
  })
}

exports.getAllROs = (req, res, next) => {
  roModel.findUserRepairOrders(req.body.userId, (err, repairOrders) => {

    if (err) return res.status(404).json({ message: `No RO's found for this user` });

    if (!repairOrders) return res.status(404).json({ message: `No RO's found for this user` });

    return res.status(200).json(repairOrders);
  });
};

exports.deleteOneRO = (req, res, next) => {
  let ro_id = req.body.ro_id;
  roModel.deleteOneRepairOrderById(ro_id, (err, doc) => {

    if (err) return res.status(404).json({ message: "Something went wrong deleting the RO" });

    if (!doc) return res.status(404).json({ message: "Could not find that RO" });

    return res.status(200).json({ message: `Deleted RO number ${doc.ro_number} successfully!` });
  });
};

exports.createOneRO = (req, res, next) => {
  roModel.createRepairOrder(req.body, (err, saved) => {

    if (err) return res.status(404).json({ message: "Something went wrong saving the RO" });

    return res.status(200).json({ message: `Successfuly saved the RO` });
  });
};
