import OrderModel from "../models/order.js";
import prcartmodel from "../models/cart.js";
import nodemailer from "nodemailer";

const generateOrderId = () => {
  return 'IR-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
};

const sendConfirmationEmail = async (order) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const itemRows = order.items.map(item => `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #2A2A35;font-family:'Georgia',serif;color:#F5F0E8;font-size:15px;">${item.prName}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #2A2A35;font-family:'Arial',sans-serif;color:#C9A96E;font-size:13px;text-align:right;">PKR ${item.prPrice}</td>
    </tr>
  `).join('');

  const html = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8"/></head>
  <body style="margin:0;padding:0;background:#0A0A0F;font-family:'Arial',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0F;padding:48px 0;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#13131A;border:1px solid #2A2A35;border-top:3px solid #C9A96E;">

          <!-- Header -->
          <tr>
            <td style="padding:40px 48px 32px;text-align:center;border-bottom:1px solid #2A2A35;">
              <p style="margin:0 0 8px;font-family:'Georgia',serif;font-size:32px;color:#C9A96E;letter-spacing:4px;">∞</p>
              <p style="margin:0;font-family:'Georgia',serif;font-size:13px;letter-spacing:6px;text-transform:uppercase;color:#F5F0E8;">Infinity Realm</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px;">
              <p style="margin:0 0 8px;font-family:'Arial',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A96E;">Order Confirmed</p>
              <h1 style="margin:0 0 24px;font-family:'Georgia',serif;font-size:28px;font-weight:normal;color:#F5F0E8;">Thank you, ${order.userName}.</h1>
              <p style="margin:0 0 32px;font-family:'Arial',sans-serif;font-size:13px;color:#8A8A95;line-height:1.8;">
                Your order has been received and is being prepared. We'll notify you when it ships.
              </p>

              <!-- Order ID -->
              <div style="background:#0A0A0F;border:1px solid #2A2A35;padding:16px 20px;margin-bottom:32px;">
                <p style="margin:0;font-family:'Arial',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8A8A95;">Order Reference</p>
                <p style="margin:6px 0 0;font-family:'Georgia',serif;font-size:18px;color:#C9A96E;letter-spacing:2px;">${order.orderId}</p>
              </div>

              <!-- Items -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <thead>
                  <tr>
                    <th style="padding:10px 16px;background:#0A0A0F;font-family:'Arial',sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#C9A96E;text-align:left;border-bottom:1px solid #C9A96E;">Item</th>
                    <th style="padding:10px 16px;background:#0A0A0F;font-family:'Arial',sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#C9A96E;text-align:right;border-bottom:1px solid #C9A96E;">Price</th>
                  </tr>
                </thead>
                <tbody>${itemRows}</tbody>
              </table>

              <!-- Total -->
              <div style="border-top:1px solid #2A2A35;padding-top:20px;display:flex;justify-content:space-between;">
                <table width="100%"><tr>
                  <td style="font-family:'Georgia',serif;font-size:16px;color:#F5F0E8;">Total</td>
                  <td style="font-family:'Georgia',serif;font-size:18px;color:#C9A96E;text-align:right;">PKR ${order.total}</td>
                </tr></table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 48px;text-align:center;border-top:1px solid #2A2A35;">
              <p style="margin:0;font-family:'Arial',sans-serif;font-size:11px;color:#8A8A95;letter-spacing:1px;">
                © ${new Date().getFullYear()} Infinity Realm. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td></tr>
    </table>
  </body>
  </html>`;

  await transporter.sendMail({
    from: `"Infinity Realm" <${process.env.EMAIL_USER}>`,
    to: order.userEmail,
    subject: `Order Confirmed — ${order.orderId}`,
    html,
  });
};

export const createOrder = async (req, res) => {
  const { userName, userEmail, items, total } = req.body;

  if (!userEmail || !items || items.length === 0) {
    return res.status(400).json({ message: 'Email and items are required' });
  }

  const orderId = generateOrderId();

  // Strip MongoDB _id from cart items so they don't conflict with subdoc IDs
  const cleanItems = items.map(({ prName, prPrice, prDescription, prImage }) => ({
    prName, prPrice, prDescription, prImage
  }));

  try {
    const newOrder = new OrderModel({ orderId, userName, userEmail, items: cleanItems, total });
    await newOrder.save();

    // Clear the cart
    await prcartmodel.deleteMany({});

    // Send email (non-blocking — don't fail the order if email fails)
    sendConfirmationEmail(newOrder).catch(err =>
      console.error('Email failed (order still saved):', err.message)
    );

    res.json({ success: true, orderId });
  } catch (error) {
    console.error('Order creation failed:', error.message);
    res.status(500).json({ message: 'Could not place order' });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    await OrderModel.updateOne({ _id: req.params.id }, { status: req.body.status });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Could not update status' });
  }
};
