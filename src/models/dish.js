const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 25,
    },
    description: {
      type: String,
      required: true,
      maxlength: 255,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    addedBy: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);

dishSchema.set("toJSON", {
  transform: function (doc, obj, options) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model("Dish", dishSchema);
