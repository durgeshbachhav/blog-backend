const Blog = require("../models/blog");
const User = require("../models/user");
const { uploadCloudinary } = require("../services/cloudinary");
const { success, error } = require("../utility/responseWrapper");
const CreateBlogController = async (req, res) => {
     const { title, text, image, tags } = req.body;
     try {

          if (!title || !text || !image || !tags) {
               return res.status(400).json(error(400, "Please enter all fields"));
          }
          let imageData = {};
          if (image) {
               const results = await uploadCloudinary(image, 'blogium')
               imageData = results;
          }
          const author = req._id;
          const user = await User.findById(req._id)

          const newBlog = await Blog.create({ author, title, text, tags, image: imageData });
          user.blogs.push(newBlog._id)
          await user.save();
          return res.send(success(200, { newBlog }));
     } catch (e) {
          return res.send(error(500, e.message));
     }
}

const EditBlogController = async (req, res) => {
     const id = req.params.blogId;
     const { title, text, image, tags } = req.body;
     try {

          let imageData = {};
          if (image) {
               const results = await uploadCloudinary(image, 'blogium')
               imageData = results;
          }
          const author = req._id;
          const blog = await Blog.findByIdAndUpdate(id, { author, title, text, tags, image: imageData }, { new: true });
          if (!blog) {
               return res.status(404).json(error(404, "Blog not found"));
          }
          const user = await User.findById(req._id)
          user.blogs.push(blog._id)

          return res.send(success(200, { blog }));
     } catch (e) {
          return res.send(error(500, e.message));
     }
}

const getAllBlogController = async (req, res) => {
     try {
          const blogs = await Blog.find();
          const populatedBlogs = await Blog.populate(blogs, { path: 'author' });
          return res.send(success(200, { blogs: populatedBlogs }))
     } catch (e) {
          return res.send(error(500, e.message))
     }
}
const getBlogController = async (req, res) => {
     try {
          const id = req.params.blogId;
          const blog = await Blog.findOne({ _id: id }).select('-password').populate('author')

          if (!blog) {
               return res.status(404).json(error(404, "Blog not found"));
          }
          return res.send(success(200, { blog }));
     } catch (e) {
          return res.send(error(500, e.message));
     }
}

const deleteBlogController = async (req, res) => {
     try {
          const id = req.params.id;
          const blog = await Blog.findByIdAndDelete(id)

          return res.send(success(200, 'blog deleted successfully'))
     } catch (e) {
          return res.send(error(500, e.message))
     }
}

module.exports = {
     CreateBlogController,
     EditBlogController,
     getAllBlogController,
     getBlogController,
     deleteBlogController
}