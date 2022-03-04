const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 25,
    },
    addedBy: {
      type: String,
      required: true,
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  { timestamps: true }
);

categorySchema.set("toJSON", {
  transform: function (doc, obj, options) {
    obj.id = obj._id;
    delete obj._id;
    // delete obj.__v;
  },
});

module.exports = mongoose.model("Category", categorySchema);
