const express = require('express');
const AuthMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", AuthMiddleware, async (req, res) => {
  try {
    const { status, toUserId } = req.params;
    const fromUserId = req.user._id;
    const allowedConnectionRequestStatuses = ["ignored", "intrested"];

    if (!allowedConnectionRequestStatuses.includes(status)) {
      throw new Error("Status is not valid");
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if (existingConnectionRequest) {
      throw new Error("Connection request already exist");
    }

    const connectionRequest = new ConnectionRequest({ fromUserId, toUserId, status });
    const data = await connectionRequest.save();

    res.json({
      message: "Connection request sent successfully",
      data
    });

  } catch (error) {
    res.status(400).send("Error: " + error.message)
  }
});

requestRouter.post("/request/review/:status/:requestId", AuthMiddleware, async (req, res) => {
  try {
    const { status, requestId } = req.params;
    const allowedStatuses = ["accepted", "rejected"];

    if (!allowedStatuses.includes(status)) {
      throw new Error("Status is not valid");
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: req.user._id,
      status: "intrested"
    });

    if (!connectionRequest) {
      return res.status(404).json({
        message: "Connection Request is not found"
      });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save()

    if (data) {
      res.json({
        message: `Connection request is ${status}`,
        data
      })
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = requestRouter;