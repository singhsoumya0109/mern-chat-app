const mongoose = require("mopngoose");

const chatModel = mongoose.Schema({
  chatName: {
    type: String,
    trim: true,
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  latest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
    {
    timestamps:true,
    });


const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;