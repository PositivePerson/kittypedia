const express = require('express');
const router = express.Router();

const ImageOrGif = require('../models/ImageOrGif');

// =============================================================

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// const url = "https://cdn2.thecatapi.com/images/4uf.jpg"

async function download(url) {
    const response = await fetch(url);
    // console.log(response);
    const buffer = await response.buffer();
    if (url.length <= 34) console.log("Backend: given url is broken (length is smaller than require)!");

    // fs.writeFile(`/client/public/images/${url.substr(34)}`, buffer, () =>
    fs.writeFile(`./client/public/images/${url.substr(34)}`, buffer, () =>
        console.log(`finished downloading ${url.substr(34)}!`));

    return buffer;
}

// =============================================================

router.put('/download', async (req, res) => {
    // console.log(req);
    const downloaded = await download(req.body.url);

    // var imageData = await fs.readFileSync(`../client/public/images/${req.body.url.substr(34)}`);
    var imageData = downloaded;

    const fileType = req.body.url.substr(25).substr(req.body.url.substr(25).indexOf(".")).substr(1);
    console.log("🚀 ~ file: files.js ~ line 34 ~ router.put ~ fileType", fileType)

    try {
        const newFile = new ImageOrGif({
            type: `image/${fileType}`,
            data: imageData
        });

        const file = await newFile.save();


        res.send(`I just downloaded file with id: ${req.body.url.substr(34)}`);
        // res.json(file);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/showFilesFolderContent', (req, res) => {
    const folder = './client/public/images';

    fs.readdir(folder, (err, files) => {
        if (err) throw err;

        res.send(files);
        console.log(files);
    });

})

router.delete('/cleanDirectory', (req, res) => {
    const directory = "./client/public/images";

    // fs.rmdir(directory, { recursive: true }, (err) => console.log("Error: ", err))
    //     .then(() => console.log("Directory removed!"));

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });

    res.send(`Deleted all files from 'images' directory`);
    console.log("Removed all saved files");
})

module.exports = router;