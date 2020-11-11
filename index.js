const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use('/', express.static(path.join(__dirname, '/static')));

app.get('/', async (req, res) => {
    repos = await fetch('https://api.github.com/orgs/octo-org/repos');
    repos = await repos.json()
    console.log(repos[0].name)
    res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.listen(3000, () => {
    console.log('Server has started running!')
});