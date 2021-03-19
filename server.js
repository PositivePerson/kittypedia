const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/public')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
    });
}

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.use('/api', require('./routes/hello'));
app.use('/api', require('./routes/files'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
});