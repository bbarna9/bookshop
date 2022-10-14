import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    release: { type: Number, required: true },
    page: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
  },
  {
    // options, when we create a record, automatically 2 new fields will be added
    // last update time+create time
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);
export default Book;
