const router = require('express').Router();
const cors = require('cors');
const { fetchRepos, fetchContributors } = require('../helpers/fetchQueries');
const { topReposByForks, topContributorsByCommits, checkIfValid, flatten } = require('../helpers/utilities');

// api for fetching the data
router.get('/', cors(), async (req, res) => {
    // extract request parameters
    const orgName = req.query.org_name;
    const repoCount = req.query.repo_count;
    const contributorCount = req.query.contributor_count;


    // check if the request parameters are valid
    if (!checkIfValid(orgName, repoCount, contributorCount)) {
        // send bad request status
        res.status(400).json(JSON.stringify({ message: 'Invalid request' }));
        return;
    }

    try {
        // dummy fetch request for repositories to get total pages
        const dummyResponse = await fetchRepos(orgName);

        // extract total pages from response header
        const totalPages = parseInt(dummyResponse.headers.link.split(' ')[2].split('&page=')[1]);

        // array to hold promises for fetch requests of repositories per page
        const repoPerPagePromiseArr = [];

        // fetch request for repositories per page
        for (let i = 1; i <= totalPages; i++) {
            repoPerPagePromiseArr.push(fetchRepos(orgName, i));
        }

        // promise resolution and flattening of the response array to get all the repositories
        const repositories = flatten(await Promise.all(repoPerPagePromiseArr));

        // sort the repositories and fetch the top repositories based on fork count
        const topRepositories = topReposByForks(repositories, repoCount);
        console.log('repositories fetched');

        // fetch all the contributors per repository
        const contributorsPerRepo = await Promise.all(topRepositories.map(repo => fetchContributors(orgName, repo.name)));

        // fetch top contributors based on commits count
        const topContributorsPerRepo = topContributorsByCommits(contributorsPerRepo, contributorCount);
        console.log('contributors fetched');

        // for sending response
        const responseArr = [];

        // zip repository with corresponding contributors together and push into responseArr
        for (let i = 0; i < topRepositories.length; i++) {
            responseArr.push({ repo: topRepositories[i], contributors: topContributorsPerRepo[i] });
        }

        // send a success status with responseArr
        res.status(200).json(JSON.stringify(responseArr));
        return;
    } catch (error) {
        console.log(error);
        // send resource not found status
        res.status(error.status).json(JSON.stringify({ message: error.name }));
        return;
    }
});

module.exports = router;