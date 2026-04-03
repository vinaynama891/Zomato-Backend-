const express = require('express'); 
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const userRoutes = require('./routes/user.routes');
const cors = require("cors");

const app = express();

app.use(cookieParser());
app.use(express.json());

// app.use(
//   cors({
//     origin: [
//       "*"
//       // "http://localhost:3000",
//       // "https://zomato-frontend-bice.vercel.app"
//     ],
//     credentials: true,
//   })
// );

app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // set this to your Netlify URL
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("hi");
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/user', userRoutes);

module.exports = app;