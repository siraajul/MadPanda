import mongoose from 'mongoose';
const presSchema = new mongoose.Schema({
  userId: { type: String },
  public_id: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    default: '',
  },
});

const Prescription = mongoose.model('Prescription', presSchema);

export default Prescription;
