const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

const fetchRepos = (org, repoCount) => octokit.paginate(`GET /orgs/${org}/repos?per_page=100`, { type: 'public' });

const fetchCommitters = (org, repo) => octokit.repos.listContributors({ owner: org, repo });

module.exports = { fetchRepos, fetchCommitters };