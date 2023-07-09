const multer = require('multer');
const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv');
dotenv.config()

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
//Creating a storage object to store the images in destination folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg'
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

const uploadToCloudinary = async (locaFilePath) => {
  console.log(locaFilePath);

  // locaFilePath: path of image which was just
  // uploaded to "uploads" folder
  try {
    const result = await cloudinary.uploader
      .upload(locaFilePath)
    return result;
  } catch (error) {
    console.log(error)
  }
}

const sharp = require("sharp");

async function resizeImage(file) {
  try {
    console.log(file)
    const res = await sharp(file)
      .resize({
        width: 200,
        height: 150
      })
      .toFormat("jpeg", { mozjpeg: true })
      .toFile(`uploads/resized-${file.split('\\')[1]}`);

    let result = await uploadToCloudinary(`uploads/resized-${file.split('\\')[1]}`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { upload, uploadToCloudinary, resizeImage };