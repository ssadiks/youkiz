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
      lowercase: true,
      required: 'Type is required'
    },
    song: {
      type: String,
      trim: true,
      lowercase: true,
    }
});

export default mongoose.model('Video', VideoSchema);