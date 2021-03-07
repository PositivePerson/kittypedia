const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

// =============================================================

const fs = require('fs');
const fetch = require('node-fetch');

const url = "https://cdn2.thecatapi.com/images/1it.jpg"

async function download() {
    const response = await fetch(url);
    console.log(response);
    const buffer = await response.buffer();
    console.log(buffer);
    if (url.length <= 34) console.log("Backend: given url is broken (length is smaller than require)!");
    fs.writeFile(`./client/imgs/${url.substr(34)}`, buffer, () =>
        console.log('finished downloading!'));
}

// =============================================================

download();

app.listen(port, () => console.log(`Listening on port ${port}`));