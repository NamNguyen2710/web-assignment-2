import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 20,
    trim: true
  },
  price: { type: Number, required: true, min: 0 },
  image: { type: String },
  description: { type: String, maxLength: 500, trim: true }
});

export default mongoose.model('Product', productSchema);
