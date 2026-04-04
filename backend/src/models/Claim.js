import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
      required: true,
    },
    triggerLog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TriggerLog',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    cause: {
      type: String,
      enum: ['heavy_rain', 'high_heat', 'severe_aqi'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'paid', 'failed'],
      default: 'pending',
    },
    razorpayPayoutId: {
      type: String,
    },
    payoutDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Claim = mongoose.model('Claim', claimSchema);

export default Claim;
