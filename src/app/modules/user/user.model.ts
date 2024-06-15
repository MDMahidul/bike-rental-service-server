import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  {
    timestamps: true,
    toJSON: {
      // Remove the password from the output
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

//pre middleware hook , hashing password before save
userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

/* userSchema.post<TUser>('save', function (doc, next) {
  doc.password = '';
  next();
}); */

export const User = model<TUser>('User', userSchema);
