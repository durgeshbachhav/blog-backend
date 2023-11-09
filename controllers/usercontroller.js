const User = require("../models/user");
const { uploadCloudinary } = require("../services/cloudinary");
const { success, error } = require("../utility/responseWrapper");
const getMyProfile = async (req, res) => {
     console.log(req._id)
     try {
          const user = await User.findById(req._id).populate('blogs')
          if (!user) {
               return res.send(error(404, 'user not found'))
          }
          return res.send(success(200, { user, message: 'user found' }))
     } catch (e) {
          return res.status(500).send(error(500, e.message));
     }
}
const getUserInfo = async (req, res) => {
     const { userId } = req.params;
     try {
          const user = await User.findById(userId).select("-password").populate('blogs')
          if (!user) {
               return res.status(404).send('User not found');
          }
          return res.send(success(200, { user, message: 'user found' }))
     } catch (e) {
          return res.status(500).send(error(500, e.message));
     }
}
const followAndUnfollowController = async (req, res) => {
     try {
          const { userIdToFollow } = req.body;
          const curUserId = req._id;

          const userToFollow = await User.findById(userIdToFollow).select("-password")
          const curUser = await User.findById(curUserId).select("-password")

          if (curUserId === userIdToFollow) {
               return res.send(error(409, "Users cannot follow themselves"));
          }

          if (!userToFollow) {
               return res.send(error(404, "User to follow not found"));
          }

          if (curUser.followings.includes(userIdToFollow)) {
               // already followed
               const followingIndex = curUser.followings.indexOf(userIdToFollow);
               curUser.followings.splice(followingIndex, 1);

               const followerIndex = userToFollow.followers.indexOf(curUser);
               userToFollow.followers.splice(followerIndex, 1);


          } else {
               userToFollow.followers.push(curUserId);
               curUser.followings.push(userIdToFollow);

          }

          await userToFollow.save();
          await curUser.save();

          return res.send(success(200, { user: userToFollow }))
     } catch (e) {
          return res.send(error(500, e.message));
     }
};
const EditProfile = async (req, res) => {
     try {
          let { fullname, avatar } = req.body;
          const user = await User.findById(req._id)

          if (fullname) {
               user.fullname = fullname
          }

          let imageData = {};
          if (avatar) {
               const result = await uploadCloudinary(avatar, 'blogium')
               imageData = result;
               user.avatar = imageData;
          }
          await user.save();
          return res.send(success(200, { user }))


     } catch (e) {
          return res.send(error(500, e.message));
     }
}

const getAllUserController = async (req, res) => {
     try {
          const users = await User.find().populate('blogs')
          return res.send(success(200, { users }))
     } catch (e) {
          return res.send(error(500, e.message));
     }
}
module.exports = {
     getUserInfo,
     getMyProfile,
     followAndUnfollowController,
     EditProfile,
     getAllUserController
}
