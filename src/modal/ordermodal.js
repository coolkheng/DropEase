const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  productImage: { type: String, required: false },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
});

const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const orderSchema = new Schema({
  products: [productSchema],
  customer: customerSchema,
  orderDate: { type: Date, required: true },
  payment_status: { type: String, required: true },
  delivery_status: { type: String, required: true },
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
