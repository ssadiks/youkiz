import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  videoId: {
    type: String,
    trim: true,
    unique: true,
    required: 'videoId is required'
  },
  type: {
    type: String,
    trim: true,
    required: 'Type is required'
  },
  song: {
    type: String,
    trim: true,
  },
  dancers: [{
    name: String
  }]
});

export default mongoose.model('Video', VideoSchema);