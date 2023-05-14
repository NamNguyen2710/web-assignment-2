import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true }
});
