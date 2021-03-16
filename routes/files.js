const express = require('express');
const router = express.Router();

// =============================================================

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

async function download(url) {
    const response = await fetch(url);
    const buffer = await response.buffer();

    if (url.length <= 34) console.log("Backend: given url is broken (length is smaller than require)!");
    // fs.writeFile(`/client/public/${url.substr(34)}`, buffer, () =>
    fs.writeFile(`./client/public/${url.substr(34)}`, buffer, () =>
        console.log(`finished downloading ${url.substr(34)}!`));
}

// =============================================================

router.put('/download', async (req, res) => {
    // console.log(req);
    const downloaded = await download(req.body.url);
    res.send(`I just downloaded file with id: ${req.body.url.substr(34)}`);
})

router.get('/showFilesFolderContent', (req, res) => {
    const folder = './client/public';

    fs.readdir(folder, (err, files) => {
        if (err) throw err;

        res.send(files);
        console.log(files);
    });
})

router.delete('/cleanDirectory', (req, res) => {
    const directory = "./client/public";

    try {
        fs.unlinkSync(`./client/public/${req.body.url.substr(34)}`)
        //file removed
    } catch (err) {
        console.error(err)
    }

    // fs.readdir(directory, (err, files) => {
    //     if (err) throw err;

    //     for (const file of files) {
    //         fs.unlink(path.join(directory, file), err => {
    //             if (err) throw err;
    //         });
    //     }
    // });

    res.send(`Deleted file from 'public' directory`);
    // res.send(`Deleted all files from 'images' directory`);
    console.log("Removed all saved files");
})

module.exports = router;