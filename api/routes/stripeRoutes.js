// routes/stripeRoutes.js
const express = require('express');
const Stripe = require('stripe');
const authenticateJWT = require('../middlewares/auth');
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Endpoint to create a PaymentIntent
router.post('/create-payment-intent', authenticateJWT, async (req, res) => {
  try {
    const { amount } = req.body; // amount in cents: $10.00 = 1000

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment Intent creation failed' });
  }
});

module.exports = router;
