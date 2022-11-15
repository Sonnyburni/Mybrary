const mongoose = require('mongoose')
const path = require('path')

const coverImageBasePath = 'uploads/bookCovers'

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImageName: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }
})
// virtual is used as this is a computed property of the object
bookSchema.virtual('coverImagePath').get(function() { //normal function instead of arrow function as access is needed to the "this" keyword which is linked to the actual book itself
    if(this.coverImageName != null){
        return path.join('/', coverImageBasePath, this.coverImageName)
    }
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath