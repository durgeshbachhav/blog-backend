const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
     title: {
          type: String,
          required: true,
     },
     image: {
          publicId: {
               type: String,
          },
          url: {
               type: String,
          }
     },
     text: {
          type: String,
          required: true,
     },
     code: {
          type: String,
     },
     author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
     },
     tags: [{
          type: String,
          trim: true,
     }]

},
     { timestamps: true })

const Blog = mongoose.model('Blog', BlogSchema)
module.exports = Blog