const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

const fetchRepos = async (org, repoCount) => octokit.paginate(`GET /orgs/${org}/repos?per_page=100`, { type: 'public' });

const topReposByForks = (data, repoCount) => {
    repos = data.map(repo => ({ name: repo.name, forks: repo.forks_count }));
    repos.sort((a, b) => b.forks - a.forks);
    if (repos.length > repoCount) return repos.slice(0, repoCount);
    return repos;

}

const fetchCommitters = (org, repo) => octokit.repos.listContributors({ owner: org, repo });

const topCommittersByCommits = (data, committerCount) => {
    committers = data.map(committer => ({ name: committer.login, commits: committer.contributions }));
    if (committers.length > committerCount) return committers.slice(0, committerCount);
    return committers;
}

module.exports = { fetchRepos, topReposByForks, fetchCommitters, topCommittersByCommits };