const mongoose = require('mongoose');

const User = require('../models/users');
const Product = require('../models/products');
const Service = require('../models/services');
const Order = require('../models/orders');

async function createUser(username, email, password) {
  try {
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error("Error creating user");
  }
}

async function getUserByUsername(username) {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw new Error("Error fetching user");
  }
}

async function getAllProducts() {
  try {
    const products = await Product.find({ type: 'product' });
    return products;
  } catch (error) {
    throw new Error("Error fetching products");
  }
}

async function getAllServices() {
  try {
    const services = await Service.find({ type: 'service' });
    return services;
  } catch (error) {
    throw new Error("Error fetching services");
  }
}

async function addToCart(userId, itemId, itemType) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the item already exists in the cart
    const existingCartItem = user.cart.find(item => item.itemId.toString() === itemId && item.itemType === itemType);
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      user.cart.push({ itemId, itemType });
    }

    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error adding item to cart");
  }
}

async function removeFromCart(userId, itemId, itemType) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.cart = user.cart.filter(item => item.itemId.toString() !== itemId || item.itemType !== itemType);
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error removing item from cart");
  }
}

async function clearCart(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.cart = [];
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error clearing cart");
  }
}

// async function getTotalBill(userId) {
//   try {
//     const user = await User.findById(userId).populate('cart.itemId');
//     if (!user) {
//       throw new Error("User not found");
//     }

//     let totalBill = 0;
//     const itemsWithTax = user.cart.map(item => {
//       const price = item.itemId.price;
//       let tax = 0;
//       if (item.itemType === 'product') {
//         tax = price > 1000 && price <= 5000 ? price * 0.12 : price > 5000 ? price * 0.18 : 200;
//       } else if (item.itemType === 'service') {
//         tax = price > 1000 && price <= 8000 ? price * 0.10 : price > 8000 ? price * 0.15 : 100;
//       }
//       totalBill += (price + tax) * item.quantity;
//       return { ...item.itemId._doc, quantity: item.quantity, tax };
//     });

//     return { itemsWithTax, totalBill };
//   } catch (error) {
//     throw new Error("Error calculating total bill");
//   }
// }

async function getTotalBill(userId) {
    try {
      const user = await User.findById(userId).populate('cart.itemId');
      if (!user) {
        throw new Error("User not found");
      }
  
      let totalBill = 0;
      const itemsWithTax = [];
  
      for (const cartItem of user.cart) {
        const item = cartItem.itemId;
        const quantity = cartItem.quantity;
        const price = item.price;
        console.log(item, quantity, price);
        let tax = 0;
        let pa = 0.12, pb = 0.18, pc = 200, sa = 0.10, sb = 0.15, sc = 100;
        if (item.type === 'product') {
            if (price > 1000 && price <= 5000) {
                tax = price * pa;
            } else if (price > 5000) {
                tax = price * pb;
            }
            tax += pc;
        } else if (item.type === 'service') {
            if (price > 1000 && price <= 8000) {
                tax = price * sa;
            } else if (price > 8000) {
                tax = price * sb;
            } 
            tax += sc;
        }
        const itemTotalPrice = (price + tax) * quantity;
        totalBill += itemTotalPrice;
  
        itemsWithTax.push({
          _id: item._id,
          name: item.name,
          type: item.type,
          quantity,
          price,
          tax,
          itemTotalPrice,
        });
      }
      console.log(itemsWithTax, totalBill);
      return { itemsWithTax, totalBill };
    } catch (error) {
      throw new Error("Error calculating total bill");
    }
}
  
async function confirmOrder(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const { itemsWithTax, totalBill } = await getTotalBill(userId);

    // Save the order in the Order collection
    const order = new Order({
      user: user._id,
      items: itemsWithTax.map(item => ({
        itemId: item._id,
        itemType: item.type,
        quantity: item.quantity,
        price: item.price,
        tax: item.tax,
      })),
      totalBill,
    });

    await order.save();

    // Clear the cart after confirming the order
    user.cart = [];
    await user.save();

    return order;
  } catch (error) {
    throw new Error("Error confirming order");
  }
}

async function getAllOrders() {
    try {
      const orders = await Order.find().populate('user', 'username email');
      return orders;
    } catch (error) {
      throw new Error("Error fetching orders");
    }
  }

module.exports = {
  createUser,
  getUserByUsername,
  getAllProducts,
  getAllServices,
  addToCart,
  removeFromCart,
  clearCart,
  getTotalBill,
  confirmOrder,
  getAllOrders,
};
