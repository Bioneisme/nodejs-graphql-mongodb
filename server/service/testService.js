const TestModel = require('../models/test-model');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "DEV",
    },
});
class testService{
    async createTest(title){

    }
}