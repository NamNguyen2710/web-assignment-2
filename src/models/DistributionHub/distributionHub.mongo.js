// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
import mongoose from 'mongoose';

const distributionHubSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true, unique: true },
  address: { type: String, require: true, unique: true }
});

export default mongoose.model('DistributionHub', distributionHubSchema);
