require('dotenv').config()
const express = require('express');
const path = require('path');
const { fetchRepos, fetchCommitters } = require('./fetchQueries');
const { topReposByForks, topCommittersByCommits, checkForError } = require('./utilities');

const app = express();
app.use('/', express.static(path.join(__dirname, '/static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/api', async (req, res) => {
    const orgName = req.query.org;
    const repoCount = req.query.repo;
    const committerCount = req.query.committer;
    const responseArr = [];

    try {
        let response;

        response = await fetchRepos(orgName);
        checkForError(response);

        const repos = topReposByForks(response, repoCount);
        console.log('repos fetched');

        response = await Promise.all(repos.map(repo => fetchCommitters(orgName, repo.name)));
        checkForError(response);

        const committersData = topCommittersByCommits(response, committerCount);
        console.log('committers fetched');

        for (let i = 0; i < repos.length; i++) {
            responseArr.push({ repo: repos[i], committers: committersData[i] });
        }

        res.status(200).json(JSON.stringify(responseArr));
    } catch (error) {
        console.log(error);
        res.status(400).json(JSON.stringify(error));
    }
});

app.listen(5050, () => {
    console.log('Server has started running!');
});
