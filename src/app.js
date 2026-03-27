const express = require('express');
const cookieParser = require('cookie-parser') 
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const cors = require('cors')
const userRoutes = require('./routes/user.routes');




const app = express();
app.use(cookieParser());
app.use(express.json());

const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow local dev servers (Vite) e.g. http://localhost:5173, http://localhost:5174
    if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
      return callback(null, true);
    }

    // Allow configured production frontend origins
    if (corsOrigins.length > 0 && corsOrigins.includes(origin)) {
      return callback(null, true);
    }

    // If you set CORS_ORIGINS, this will block other origins (safer default).
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));


app.get("/",(req,res)=>{
    res.send("hi");
})
app.use('/api/auth',authRoutes)
app.use('/api/food',foodRoutes)
app.use('/api/user', userRoutes);

module.exports = app;