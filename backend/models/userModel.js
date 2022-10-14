import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false, required: true },
  },
  {
    // options, when we create a record, automatically 2 new fields will be added
    // last update time+create time
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
