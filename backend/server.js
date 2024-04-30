const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
require('dotenv').config();
const stripe = require('stripe')('sk_test_51O2CGJSFyCK83PL8zeJuHhOULxPauoSzwoM8NlKJEiEuuPtoDMK6zhGJPykIf3LY2OkpDsuK2SOqmlJRxkGQnv9V009wDZvtE6');
require('./connection')
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
  cors: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PATCH', "DELETE"]
})


const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/images', imageRoutes);




app.post('/create-payment', async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });
    res.status(200).json(paymentIntent);
  } catch (e) {
    console.error(e); // Log the error for debugging purposes
    res.status(400).json({ error: e.message }); // Send the error message back as JSON
  }
});



server.listen(8080, ()=> {
  console.log('server running at port', 8080)
})

app.set('socketio', io);
