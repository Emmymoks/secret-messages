const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    linkId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
  },
  { timestamps: true } // auto-manages createdAt & updatedAt
);

// Ensure indexes are created (handles unique properly in newer Mongoose)
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ linkId: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);
