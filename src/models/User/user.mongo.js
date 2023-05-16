import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: val => /^[A-Za-z\d]{8,15}$/.test(val)
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: val =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        val
      )
  },
  type: {
    type: String,
    required: true,
    enum: ['vendor', 'customer', 'shipper']
  },
  name: {
    type: String,
    required: function () {
      return this.type === 'customer';
    },
    trim: true,
    minLength: 5
  },
  address: {
    type: String,
    reqired: function () {
      return this.type !== 'vendor';
    },
    trim: true,
    minLength: 5
  },
  businessName: {
    type: String,
    required: function () {
      return this.type === 'vendor';
    },
    trim: true,
    minLength: 5,
    index: true,
    unique: true,
    sparse: true
  },
  businessAddress: {
    type: String,
    required: function () {
      return this.type === 'vendor';
    },
    trim: true,
    minLength: 5,
    index: true,
    unique: true,
    sparse: true
  },
  businessAddress: {
    type: String,
    required: () => this.userType === 'vendor',
    trim: true,
    minLength: 5,
    unique: true
  },
  avatar: String,
  distributionHub: {
    hubId: Number,
    name: String,
    address: String
  }
});
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model('User', userSchema);
