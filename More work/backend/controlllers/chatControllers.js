const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("User param not sent with request");
        res.sendStatus(400);
    }
    var isChat = await Chat.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");
    
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0)
    {
        res.send(isChat[0]);
    }
    else
    {
        var chatData = {
            chatName: "sender",
            isGroup: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id })
                .populate("users", "-password");
            res.status(200).send(fullChat);
        }
        catch (error)
        {
            res.status(400);
            throw new Error(error.message);
        }
    }
});


const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
                });
                res.status(200).send(results);
            });
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});


const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send(
            { message: "All details aren't filled" }
        );
    }
    
    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res
            .status(400)
            .send("Add more users");
    }
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users,
            isGroup: true,
            groupAdmin: req.user,
        });


        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(200).json(fullGroupChat);
    }
    catch (error)
    {
        res.status(400);
        throw new Error(error.message);
    }
    
});


const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    
    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat id invalid");
    }
    else {
        res.json(updatedChat);
    }
});




const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // Find the chat to validate if it exists and check admin privileges
  const chat = await Chat.findById(chatId);

  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  if (!chat.isGroup) {
    return res
      .status(400)
      .json({ message: "Cannot add users to a non-group chat" });
  }

  // Check if the requester is the group admin
  if (chat.groupAdmin.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Only the group admin can add users to the group" });
  }

  // Check if the user is already in the group
  if (chat.users.includes(userId)) {
    return res.status(400).json({ message: "User is already in the group" });
  }

  try {
    // Add the user to the group
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password") // Populate user details, excluding the password
      .populate("groupAdmin", "-password"); // Populate group admin details, excluding the password

    if (!added) {
      return res
        .status(500)
        .json({
          message: "Failed to add user to the group due to an unknown error",
        });
    }

    res.status(200).json(added); // Return the updated chat object
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});




  


const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // Find the chat to validate if it exists and check admin privileges
  const chat = await Chat.findById(chatId);

  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  if (!chat.isGroup) {
    return res
      .status(400)
      .json({ message: "Cannot remove users from a non-group chat" });
  }

  // Check if the requester is the group admin
  if (chat.groupAdmin.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({
        message: "Only the group admin can remove users from the group",
      });
  }

  // Check if the user is in the group
  if (!chat.users.includes(userId)) {
    return res.status(400).json({ message: "User is not in the group" });
  }

  try {
    // Remove the user from the group
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password") // Populate user details, excluding the password
      .populate("groupAdmin", "-password"); // Populate group admin details, excluding the password

    if (!removed) {
      return res.status(500).json({
        message: "Failed to remove user from the group due to an unknown error",
      });
    }

    res.status(200).json(removed); // Return the updated chat object
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});


module.exports = { accessChat, fetchChats, createGroupChat, renameGroup ,addToGroup,
    removeFromGroup,
};