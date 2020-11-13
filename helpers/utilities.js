// utility function to fetch top 'repoCount' repositories based on forks
const topReposByForks = (data, repoCount) => {
    // extracting name and number of forks
    let repos = data.map(repo => ({ name: repo.name, forks: repo.forks_count }));

    // sorting based on number of forks
    repos.sort((a, b) => b.forks - a.forks);

    // fetching top 'repoCount' number of repositories
    return repos.slice(0, repoCount);
}

// utility function to fetch top 'committerCount' contributors per repository based on commits
const topContributorsByCommits = (contributors, contributorCount) => {
    // extracting data variable containing contributors info per repository
    contributors = contributors.map(({ data }) => data);

    // extracting name and commits of contributors per repository
    contributors = contributors.map(contributor => contributor.map(data => ({
        name: data.login,
        commits: data.contributions
    })));

    // fetching and returning top 'contributorCount' number of contributors per repository
    return contributors.map(arr => arr.slice(0, contributorCount));
}

// utility function to check the validity of request parameters
const checkIfValid = (orgName, repoCount, contributorCount) => {
    // checking if some variable is empty
    if (!orgName || !repoCount || !contributorCount) {
        return false;
    }

    // checking if repoCount and contributorCount are valid numbers or not
    if (Number.isNaN(Number(repoCount)) || Number.isNaN(Number(contributorCount))) {
        return false;
    }

    // check if the count is less than or equal to 0
    if (Number(repoCount) <= 0 || Number(contributorCount) <= 0) {
        return false;
    }

    return true;
}

// utility function for flattening the 2D response array
const flatten = (arr) => {
    arr = arr.map(item => item.data);
    const flattenArr = [];
    for (let item of arr) {
        flattenArr.push(...item);
    }
    return flattenArr;
}

module.exports = { topReposByForks, topContributorsByCommits, checkIfValid, flatten };