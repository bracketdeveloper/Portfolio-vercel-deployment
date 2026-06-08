import mongoose from 'mongoose';
import { env } from './env.js';

let isConnected = false;

export const connectDatabase = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  mongoose.set('strictQuery', true);
  
  await mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 2,
    maxIdleTimeMS: 60000,
    retryWrites: true,
    retryReads: true,
  });
  
  isConnected = true;
  console.log('MongoDB connected');
};
