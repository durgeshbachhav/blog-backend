const {
     CreateBlogController,
     EditBlogController,
     getAllBlogController,
     getBlogController,
     deleteBlogController
} = require('../controllers/blogcontroller');
const requiredUser = require('../middleware/requireUser');

const router = require('express').Router();

// Welcome message or API documentation
router.get('/', (req, res) => {
     res.send('Welcome to the Blog API');
});

router.post('/create', requiredUser, CreateBlogController);
router.put('/:blogId', requiredUser, EditBlogController);
router.get('/all', getAllBlogController);
router.get('/:blogId', getBlogController);
router.delete('/:blogId', requiredUser, deleteBlogController);

module.exports = router;
