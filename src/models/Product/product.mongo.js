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
