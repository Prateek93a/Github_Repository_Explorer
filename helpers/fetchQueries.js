const { Octokit } = require("@octokit/rest");

// create an instance of Octokit
const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

// fetch request for repostories of an organisation
const fetchRepos = (org, repoCount) => octokit.paginate(`GET /orgs/${org}/repos?per_page=100`, { type: 'public' });

// fetch request for contributors of given repository
const fetchCommitters = (org, repo) => octokit.repos.listContributors({ owner: org, repo });

module.exports = { fetchRepos, fetchCommitters };