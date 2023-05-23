// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
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
