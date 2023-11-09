
const cloudinary = require("cloudinary").v2;

cloudinary.config({
     cloud_name: process.env.CLOUD_NAME,
     api_key: process.env.CLOUD_API_KEY,
     api_secret: process.env.CLOUD_API_SECRET,
});

const uploadCloudinary = async (image, folder = 'blogium') => {
     try {
          const data = await cloudinary.uploader.upload(image, { folder: folder })
          return { publicId: data.public_id, url: data.secure_url }
     } catch (error) {
          console.log(error)
     }
}

module.exports = { uploadCloudinary }




