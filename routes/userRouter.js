const { getUserInfo, getMyProfile, followAndUnfollowController, EditProfile, getAllUserController } = require('../controllers/usercontroller');

const router = require('express').Router();
const requiredUser = require('../middleware/requireUser')

router.get('/getAllUsers', getAllUserController)
router.get('/:userId', requiredUser, getUserInfo)
router.get('/', requiredUser, getMyProfile)
router.post('/followOrUnfollow', requiredUser, followAndUnfollowController)
router.put('/profile/edit', requiredUser, EditProfile)


module.exports = router;