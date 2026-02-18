const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true }
});

// Transformation du _id en id pour le JSON (important pour Swagger)
roomSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = mongoose.model("Room", roomSchema);