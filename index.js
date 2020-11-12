require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const { fetchRepos, fetchCommitters } = require('./helpers/fetchQueries');
const { topReposByForks, topCommittersByCommits, checkIfValid } = require('./helpers/utilities');


// setting up express app
const app = express();
app.use('/', express.static(path.join(__dirname, '/static')));

// for serving landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'));
});

// api for fetching the data
app.get('/api', cors(), async (req, res) => {
    // extract request parameters
    const orgName = req.query.org;
    const repoCount = req.query.repo;
    const committerCount = req.query.committer;

    // for sending response
    const responseArr = [];
    // for handling errors
    let errorMessage;

    // check if the request parameters are valid
    if (!checkIfValid(orgName, repoCount, committerCount)) {
        errorMessage = 'Invalid request';
        // send bad request status
        res.status(400).json(JSON.stringify({ message: errorMessage }));
    }

    try {
        // fetch all repositories of the organisation
        const repoResponse = await fetchRepos(orgName);
        // sort the repositories and fetch the top repositories based on fork count
        const repos = topReposByForks(repoResponse, repoCount);
        console.log('repos fetched');

        // fetch all the contributors per repository
        const committerResponse = await Promise.all(repos.map(repo => fetchCommitters(orgName, repo.name)));
        // fetch top contributors based on commits count
        const committersData = topCommittersByCommits(committerResponse, committerCount);
        console.log('committers fetched');

        // zip repository with corresponding contributors together and push into responseArr
        for (let i = 0; i < repos.length; i++) {
            responseArr.push({ repo: repos[i], committers: committersData[i] });
        }
        res.status(200).json(JSON.stringify(responseArr));

    } catch (error) {
        errorMessage = 'Organisation not found';
        // send resource not found status
        res.status(404).json(JSON.stringify({ message: errorMessage }));
    }
});

app.listen(process.env.PORT || 5050, () => {
    console.log('Server has started running!');
});
