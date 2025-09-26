const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fromName: {
      type: String,
      trim: true,
      default: "Anonymous",
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500, // prevents excessively long messages
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("Message", MessageSchema);
