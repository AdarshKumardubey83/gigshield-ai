import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: [true, 'Please add a phone number'],
      unique: true,
    },
    firebaseUid: {
      type: String,
      required: [true, 'Firebase UID is required'],
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      default: '',
    },
    platform: {
      type: String,
      enum: ['zomato', 'swiggy'],
    },
    workerId: {
      type: String,
      trim: true,
    },
    location: {
      city: { type: String, trim: true, default: '' },
      state: { type: String, trim: true, default: '' },
      coordinates: {
        lat: { type: Number, default: null },
        lng: { type: Number, default: null },
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
