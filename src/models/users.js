const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    cart: [{
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // or 'Service'
      itemType: { type: String, enum: ['product', 'service'], required: true },
      quantity: { type: Number, default: 1 },
    }],
  });
  
const User = mongoose.model('User', userSchema);
  
module.exports = User