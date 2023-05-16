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
    name: String,
    address: String
  },
  products: [
    {
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
