import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
      required: true
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

export default mongoose.model('City', CitySchema);