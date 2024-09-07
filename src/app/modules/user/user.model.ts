import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import {userStatus } from './user.constant';
import config from '../../config';

export const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: { type: Date },
    role: {
      type: String,
      enum: ['superAdmin', 'admin', 'user'],
    },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: userStatus,
      default: 'in-progress',
    },
    pImage: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isFirstRide: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

/* middlewares */
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  /* hashing the password before save to db */
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// filter out deleted docs
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

/* set empty sting after saving the password */
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

/* create the static method */
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChange = async function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimestamp;
};

/* declare the model */
export const User = model<TUser, UserModel>('User', userSchema);
