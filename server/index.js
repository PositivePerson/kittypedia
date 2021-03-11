const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
}

// =============================================================

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

app.put('/api/download', async (req, res) => {
    // console.log(req);
    const downloaded = await download(req.body.url);
    res.send(`I just downloaded file with id: ${req.body.url.substr(34)}`);
})

app.delete('/api/cleanDirectory', (req, res) => {
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
})

app.get('/api/showFilesFolderContent', (req, res) => {
    const folder = './client/public/images';

    fs.readdir(folder, (err, files) => {
        if (err) throw err;

        res.send(files);
        console.log(files);
    });

})

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));