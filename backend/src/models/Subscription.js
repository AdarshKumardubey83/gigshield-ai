import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    planType: {
      type: String,
      enum: ['basic', 'standard', 'pro'],
      required: true,
    },
    premiumAmount: {
      type: Number,
      required: true,
      // 25 for basic, 40 for standard, 60 for pro
    },
    coverageAmount: {
      type: Number,
      required: true,
      // 500 for basic, 1000 for standard, 1500 for pro
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled'],
      default: 'active',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
