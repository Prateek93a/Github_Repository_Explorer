const fetchRepos = async (orgName, repoCount) => {
    let repositories = [];
    let page = 1;

    const repoResponse = await fetch(`https://api.github.com/orgs/${orgName}/repos`);
    const repos = await repoResponse.json();
}