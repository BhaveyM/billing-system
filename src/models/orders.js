const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
      itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
      itemType: { type: String, enum: ['product', 'service'], required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      tax: { type: Number, required: true },
    }],
    totalBill: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
const Order = mongoose.model('Order', orderSchema);
module.exports = Order  