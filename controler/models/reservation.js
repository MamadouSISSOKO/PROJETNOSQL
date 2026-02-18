const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  roomId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Room", 
    required: true 
  },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  totalPrice: { type: Number }
});

// Transformation du _id en id pour Swagger
reservationSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = mongoose.model("Reservation", reservationSchema);