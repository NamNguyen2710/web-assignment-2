// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 20,
    trim: true
  },
  price: { type: Number, required: true, min: 0 },
  images: [String],
  description: { type: String, maxLength: 500, trim: true },
  owner: {
    _ownerId: mongoose.Schema.Types.ObjectId,
    businessName: String
  }
});

productSchema.index({ name: 'text' });

export default mongoose.model('Product', productSchema);
