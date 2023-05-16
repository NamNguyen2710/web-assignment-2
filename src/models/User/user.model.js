import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import user from './user.mongo';

async function readUserByUserId(userId) {
  return user.findOne({ _id: mongoose.Types.ObjectId(userId) }, { __v: 0 });
}

async function validateLogin(username, password) {
  const result = await user.findOne({ username }, { __v: 0 });
  if (!result) throw new Error('Incorrect username or password');

  const checkPassword = await bcrypt.compare(password, result.password);
  if (!checkPassword) throw new Error('Incorrect username or password');

  return result;
}

async function updateUserByUserId(newUser) {
  return await user.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(newUser._id) },
    newUser,
    {
      upsert: true,
      returnDocument: 'after',
      projection: { __v: 0 }
    }
  );
}

async function createUser(newUser) {
  return await user.create(newUser);
}

export { readUserByUserId, validateLogin, updateUserByUserId, createUser };
