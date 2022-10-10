const roModel = require("../models/repairOrderModel.js");
const userModel = require("../models/userModel.js")

exports.getUser = (req,res, next) => {
  console.log('get controller hit from user')
  userModel.findUserById(req.params.userId,(err, user) => {
    if(err) return res.status(404).json({message:"something went wrong"});
    if(!user) return res.status(404).json({message:`Can't seem to find that user`});
    return res.status(200).json(user)
  })
}

exports.getAllROs = (req, res, next) => {
  let userId = req.body.userId;
  let errorMessage = { message: `No RO's found for this user` };
  roModel.findUserRepairOrders(userId, (err, repairOrders) => {
    if (err) {
      return res.status(404).json(errorMessage);
    } else if (!repairOrders) {
      return res.status(404).json(errorMessage);
    } else {
      return res.status(200).json(repairOrders);
    }
  });
};

exports.getROsByDate = (req, res, next) => {};

exports.updateOneRO = (req, res, next) => {};

exports.deleteOneRO = (req, res, next) => {
  let ro_id = req.body.ro_id;
  let errorMessage = { message: "Something went wrong deleting the RO" };
  roModel.deleteOneRepairOrderById(ro_id, (err, doc) => {
    if (err) {
      return res.status(404).json(errorMessage);
    } else if (!doc) {
      return res.status(404).json({ message: "Could not find that RO" });
    } else {
      return res
        .status(200)
        .json({ message: `Deleted RO number ${doc.ro_number} successfully!` });
    }
  });
};

exports.createOneRO = (req, res, next) => {
  let errorMessage = { message: "Something went wrong saving the RO" };
  roModel.createRepairOrder(req.body, (err, saved) => {
    let successMessage = { message: `Successfuly saved the RO` };
    if (err) {
      return res.status(404).json(errorMessage);
    } else {
      return res.status(200).json(successMessage);
    }
  });
};
