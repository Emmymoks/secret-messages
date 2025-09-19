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
      default: "Anonymous",
      trim: true,
      maxlength: 100, // prevents abuse with huge names
    },
    body: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000, // keeps messages reasonable size
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// Index to make fetching messages by recipient faster
MessageSchema.index({ toUser: 1, createdAt: -1 });

module.exports = mongoose.model("Message", MessageSchema);
