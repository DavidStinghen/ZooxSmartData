import mongoose from 'mongoose';

const StateSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    abbreviation: {
        type: String,
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
);

export default mongoose.model('State', StateSchema);