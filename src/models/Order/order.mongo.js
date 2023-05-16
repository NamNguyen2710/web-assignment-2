import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  id: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    default: 'active',
    enum: ['active', 'delivered', 'canceled']
  },
  customer: {
    _customerId: mongoose.Schema.Types.ObjectId,
    address: { type: String, required: true, trim: true }
  },
  products: [
    {
      _productId: mongoose.Schema.Types.ObjectId,
      name: String,
      amount: Number,
      price: Number
    }
  ],
  distributionHub: {
    hubId: Number,
    name: String,
    address: String
  },
  totalPrice: Number
});

export default mongoose.model('Order', orderSchema);
