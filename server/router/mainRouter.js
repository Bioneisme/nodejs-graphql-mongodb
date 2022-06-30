require('dotenv').config()
const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");
const UserModel = require('../models/userModel')
const Router = require('express').Router
const router = new Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "USER_AVATARS",
    },
});

const upload = multer({storage: storage});

router.post('/avatar', upload.single('avatar', {width: 305, height: 305, crop: "fill"}),
    async (req, res) => {
        await UserModel.findOneAndUpdate({email: req.body.email}, {
            image: req.file.path
        })
    })

module.exports = router