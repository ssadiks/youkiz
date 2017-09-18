import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DancerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: 'videoId is required'
  },
  sex: {
    type: String,
    trim: true,
    required: 'Sex is required'
  }
});

export default mongoose.model('Dancer', DancerSchema);
