const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use('/', express.static(path.join(__dirname, '/static')));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/api', async (req, res) => {
    const orgName = req.query.org;
    const repoCount = req.query.repo;
    const committerCount = req.query.committer;

    const repoResponse = await fetch(`https://api.github.com/orgs/${orgName}/repos`);
    const repos = await repoResponse.json();

    const committerResponse = await fetch(`https://api.github.com//repos/{owner}/{repo}/stats/contributors
    /${orgName}/repos`);
    const committers = await committerResponse.json();

    res.send('Done');
});

app.listen(3000, () => {
    console.log('Server has started running!')
});