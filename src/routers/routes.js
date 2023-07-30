const express = require('express');
const router = express.Router();

const {
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
} = require('../controllers/billingController');

// Create an account
router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await createUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Fetch all products and services information with their prices
router.get('/products', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

router.get('/services', async (req, res) => {
  try {
    const services = await getAllServices();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching services' });
  }
});

// Add a product or service to the cart
router.post('/users/:userId/cart', async (req, res) => {
  try {
    const { userId } = req.params;
    const { itemId, itemType } = req.body;
    const user = await addToCart(userId, itemId, itemType);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

// Remove a product or service from the cart
router.delete('/users/:userId/cart/:itemId/:itemType', async (req, res) => {
  try {
    const { userId, itemId, itemType } = req.params;
    const user = await removeFromCart(userId, itemId, itemType);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error removing item from cart' });
  }
});

// Clear the cart
router.delete('/users/:userId/cart', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await clearCart(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error clearing cart' });
  }
});

// View total bill
router.get('/users/:userId/bill', async (req, res) => {
  try {
    const { userId } = req.params;
    const bill = await getTotalBill(userId);
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ error: 'Error calculating total bill' });
  }
});

// Confirm the order
router.post('/users/:userId/confirm-order', async (req, res) => {
  try {
    const { userId } = req.params;
    const order = await confirmOrder(userId);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error confirming order' });
  }
});

router.get('/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching user' });
  }
});

router.get('/:username/orders', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!user.isAdmin) {
      return res.status(404).json({ error: 'No admin access' });
    }
    const orders = await getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching orders' });
  }
});

module.exports = router;
