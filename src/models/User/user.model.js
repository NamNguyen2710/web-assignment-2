import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import user from './user.mongo.js';

async function readUserByUserId(userId) {
  return user.findOne(
    { _id: new mongoose.Types.ObjectId(userId) },
    { __v: 0, password: 0 }
  );
}

async function validateLogin(username, password) {
  const result = await user.findOne({ username }, { __v: 0 });
  if (!result) throw new Error('Incorrect username or password');

  const checkPassword = await bcrypt.compare(password, result.password);
  if (!checkPassword) throw new Error('Incorrect username or password');

  const returnResult = result.toJSON();
  delete returnResult.password;
  return returnResult;
}

async function updateUserByUserId(newUser) {
  return await user.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(newUser._id) },
    { $set: newUser },
    {
      upsert: true,
      returnDocument: 'after',
      projection: { __v: 0, password: 0 }
    }
  );
}

async function createUser(newUser) {
  const result = await user.create(newUser);
  const returnResult = result.toJSON();
  delete returnResult.password;
  return returnResult;
}

export { readUserByUserId, validateLogin, updateUserByUserId, createUser };
