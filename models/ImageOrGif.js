const mongoose = require('mongoose');

const ImageOrGifSchema = mongoose.Schema({
    type: String,
    data: Buffer
});

module.exports = mongoose.model('ImageOrGifSchema', ImageOrGifSchema);