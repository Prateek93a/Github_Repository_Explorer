require('dotenv').config()
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const { fetchRepos, topReposByForks, fetchCommitters, topCommittersByCommits } = require("./fetchQuery");


//octokit.listForOrg()
//octokit.repos.listForOrg({ org: 'microsoft' }).then(({ data }) => {
//    // handle data
//    console.log(data.length)
//});



const app = express();
app.use('/', express.static(path.join(__dirname, '/static')));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/api', async (req, res) => {
    const orgName = req.query.org;
    const repoCount = req.query.repo;
    const committerCount = req.query.committer;
    const response = []

    const data = await fetchRepos(orgName);
    const repos = topReposByForks(data, repoCount);
    console.log('repos fetched');

    for (repo of repos) {
        const { data: cdata } = await fetchCommitters(orgName, repo.name);
        const committers = topCommittersByCommits(cdata, committerCount);
        response.push({ repo, committers });
    }
    console.log('committers fetched');

    res.json(JSON.stringify(response));
});

app.listen(5050, () => {
    console.log('Server has started running!')
});

//process.on('SIGTERM', ()=>{
//    app.
//})