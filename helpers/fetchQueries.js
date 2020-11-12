const { Octokit } = require("@octokit/rest");

// create an instance of Octokit
const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

// fetch request for repostories of an organisation
const fetchRepos = (org) => octokit.paginate(
    octokit.repos.listForOrg,
    { org, type: 'public', per_page: 100 });

// fetch request for contributors of given repository
const fetchContributors = (org, repo) => octokit.repos.listContributors({ owner: org, repo });

module.exports = { fetchRepos, fetchContributors };