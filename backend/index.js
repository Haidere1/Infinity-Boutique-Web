import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import users from './routes/users.js';
import products from './routes/products.js';
import login from './routes/login.js';
import cart from './routes/cart.js';

const app = express();
mongoose.set('strictQuery', false);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3002;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

if (!MONGO_URL) {
  console.error("MONGO_URL is not set. Add it to your .env file.");
  process.exit(1);
}

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use(cors({
  origin: [CLIENT_URL, "http://localhost:3000"],
  credentials: true
}));

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/signup", users);
app.use("/admin", users);
app.use("/products", products);
app.use("/login", login);
app.use("/viewproduct", cart);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
