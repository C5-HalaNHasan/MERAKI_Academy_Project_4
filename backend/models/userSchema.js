const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  country: { type: String },
  contactNum: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "role" },
  photo: {
    type: String,
    default:
      "https://www.conarc.com/wp-content/uploads/2017/05/unknown-profile-e1493671083650.jpg",
  }, //! to be updated later by cloudinary
  //   !rating:to be added later, //!
  wishList:[{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
  cartItems:[{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
  boughtItems:[{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
});

// a middleware to be executed before saving the user to the database:
userSchema.pre("save", async function () {
  SALT = 10;
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, SALT);
});

// a middleware to be executed before saving the updated password the database: //! not working yet
userSchema.pre("findByIdAndUpdate", async function () {
  SALT = 10;
  this.password = await bcrypt.hashSync(this.password, SALT);

});




module.exports = mongoose.model("user", userSchema);
