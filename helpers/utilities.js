// utility function to fetch top 'repoCount' repositories based on forks
const topReposByForks = (data, repoCount) => {
    // extracting name and number of forks
    let repos = data.map(repo => ({ name: repo.name, forks: repo.forks_count }));
    // sorting based on number of forks
    repos.sort((a, b) => b.forks - a.forks);
    // fetching top 'repoCount' number of repositories
    if (repos.length > repoCount) return repos.slice(0, repoCount);
    return repos;

}

// utility function to fetch top 'committerCount' contributors per repository based on commits
const topCommittersByCommits = (resdata, committerCount) => {
    // extracting data variable containing contributors info per repository
    const res = resdata.map(({ data }) => data);
    // extracting name and commits of contributors per repository
    let committers = res.map(committer => committer.map(data => ({
        name: data.login,
        commits: data.contributions
    })));
    // fetching top 'committerCount' number of contributors per repository
    committers = committers.map(arr => {
        if (arr.length > committerCount) {
            arr = arr.slice(0, committerCount);
        }
        return arr;
    });
    return committers;
}

// utility function to check the validity of request parameters
const checkIfValid = (orgName, repoCount, committerCount) => {
    // checking if some variable is empty
    if (!orgName || !repoCount || !committerCount) {
        return false;
    }
    // checking if repoCount and committerCount are valid numbers or not
    if (Number.isNaN(Number(repoCount)) || Number.isNaN(Number(committerCount))) {
        return false;
    }
    return true;
}

module.exports = { topReposByForks, topCommittersByCommits, checkIfValid };