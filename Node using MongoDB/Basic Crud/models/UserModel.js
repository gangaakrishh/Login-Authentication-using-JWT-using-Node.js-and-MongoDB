const mongoose = require("mongoose"); 
const bcrypt = require("bcrypt");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
    timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      console.error("Error hashing password:", error);
      return next(error);
    }
});

userSchema.methods.isPasswordMatched = async function (user, enteredpassword) {
    return await bcrypt.compare(user.password, enteredpassword);
};

//Export the model
module.exports = mongoose.model("User", userSchema);