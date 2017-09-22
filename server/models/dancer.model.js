import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DancerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: 'videoId is required'
  },
  gender: {
    type: String,
    trim: true,
    required: 'Gender is required'
  }
});

export default mongoose.model('Dancer', DancerSchema);
