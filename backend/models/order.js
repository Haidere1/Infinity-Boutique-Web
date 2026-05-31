import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderId: { type: String, unique: true },
  userName: String,
  userEmail: String,
  items: [
    {
      prName: String,
      prPrice: String,
      prDescription: String,
      prImage: String,
    }
  ],
  total: String,
  status: {
    type: String,
    enum: ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'confirmed'
  },
  createdAt: { type: Date, default: Date.now }
});

const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;
