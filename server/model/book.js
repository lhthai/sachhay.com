import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    thumbnail: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    book_url: {
        type: String
    },
    download_epub: String,
    download_mobi: String,
    download_pdf: String
}, { timestamps: true })

bookSchema.index({ title: 'text', author: 'text' })

const Book = mongoose.model('Book', bookSchema)

export default Book;