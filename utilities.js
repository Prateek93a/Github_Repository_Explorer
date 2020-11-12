const topReposByForks = (data, repoCount) => {
    repos = data.map(repo => ({ name: repo.name, forks: repo.forks_count }));
    repos.sort((a, b) => b.forks - a.forks);
    if (repos.length > repoCount) return repos.slice(0, repoCount);
    return repos;

}

const topCommittersByCommits = (resdata, committerCount) => {
    const res = resdata.map(({ data }) => data);
    committers = res.map(committer => committer.map(data => ({ name: data.login, commits: data.contributions })));
    if (committers.length > committerCount) return committers.slice(0, committerCount);
    return committers;
}

const checkForError = (response) => {
    if (!response.ok) {
        errorMessage = `An error has occured: ${response.status}`;
        throw new Error(errorMessage);
    }
}

module.exports = { topReposByForks, topCommittersByCommits, checkForError };