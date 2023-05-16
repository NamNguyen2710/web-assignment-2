import mongoose from 'mongoose';

const distributionHubSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true, unique: true },
  address: { type: String, require: true, unique: true }
});

export default mongoose.model('DistributionHub', distributionHubSchema);
