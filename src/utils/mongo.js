import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { loadDistributionHubData } from '../models/DistributionHub/distributionHub.model';

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
