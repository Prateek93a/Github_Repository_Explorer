const { Octokit } = require("@octokit/rest");

// create an instance of Octokit
const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

// fetch request for repostories of an organisation
const fetchRepos = (org, page = 1) => octokit.repos.listForOrg({ org, type: 'public', page });

// fetch request for contributors of given repository
const fetchContributors = (org, repo) => octokit.repos.listContributors({ owner: org, repo });

module.exports = { fetchRepos, fetchContributors };