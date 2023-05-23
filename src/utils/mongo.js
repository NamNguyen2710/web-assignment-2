// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { loadDistributionHubData } from '../models/DistributionHub/distributionHub.model.js';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () =>
  console.log('MongoDB connection ready!')
);
mongoose.connection.on('error', err => console.error(err));

async function connectMongoDB() {
  await mongoose.connect(MONGO_URL);
  await loadDistributionHubData();
}

async function disconnectMongoDB() {
  await mongoose.disconnect();
}

export { connectMongoDB, disconnectMongoDB };
