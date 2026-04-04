import mongoose from 'mongoose';

const triggerLogSchema = new mongoose.Schema(
  {
    location: {
      city: { type: String, required: true },
      state: { type: String },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    date: {
      type: Date,
      default: Date.now,
    },
    weather: {
      rainfall_mm: { type: Number, default: 0 },
      temperature_c: { type: Number, default: 0 },
    },
    aqi: {
      value: { type: Number, default: 0 },
    },
    isTriggerMet: {
      type: Boolean,
      default: false,
      // Sets to true if rain > 50, temp > 45, or aqi > 300
    },
  },
  {
    timestamps: true,
  }
);

// We want to avoid pulling duplicate logs for the exact same location on the same day
triggerLogSchema.index({ 'location.city': 1, date: 1 }, { unique: true });

const TriggerLog = mongoose.model('TriggerLog', triggerLogSchema);

export default TriggerLog;
