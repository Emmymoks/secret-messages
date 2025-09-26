const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// Ensure unique index on username (in case of schema changes)
UserSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);
