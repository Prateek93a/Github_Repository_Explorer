let resultsSection;
let formButton;
let orgNameInput;
let repoCountInput;
let committerCountInput;
let errorMessageSpan;

const repoQuery = (orgName) => `https://api.github.com/orgs/${orgName}/repos`
const committerQuery = (orgName) => `https://api.github.com/orgs/${orgName}/repos`

const fetchRepos = (orgName) => fetch(repoQuery(orgName));
const fetchCommitters = (orgName) => fetch(committerQuery(orgName));

const updateUI = (repos = [], committers = []) => {
    resultsSection.style.visibility = 'visible';
    formButton.disabled = false;
    let repoListString = '<ul>';
    for (let i = 0; i < repos.length; i++) {
        repoListString += `<li>${repos[i].name}</li>\n`;
    }
    repoListString += '</ul>';
    let committerListString = '<ul>';
    for (let i = 0; i < committers.length; i++) {
        committerListString += `<li>${committers[i].name}</li>\n`;
    }
    committerListString += '</ul>';
    console.log(repoListString);
    document.getElementById('repo-list').innerHTML = repoListString;
    document.getElementById('committer-list').innerHTML = committerListString;
    document.getElementById('repo-header').innerText = 'Repositories';
    document.getElementById('committer-header').innerText = 'Committers';
    formButton.innerText = 'Search';
}

const formSubmitAction = async (event) => {
    event.preventDefault();
    if (!orgNameInput.value || !repoCountInput.value || !committerCountInput.value) {
        errorMessageSpan.innerText = 'One or more input values missing...';
        return;
    }
    errorMessageSpan.innerText = '';
    formButton.innerText = 'Please wait';
    await fetch(`/api?org=${orgNameInput.value}&repo=${repoCountInput.value}&committer=${committerCountInput.value}`);
    //formButton.disabled = true;
    //console.log('request submitted');

    //let repos = await fetchRepos(orgNameInput.value);
    //repos = await repos.json();
    //let committers = await fetchCommitters(orgNameInput.value);
    //committers = await committers.json();
    //updateUI(repos, committers);
}

const documentLoadAction = () => {
    resultsSection = document.getElementById('results');
    formButton = document.getElementById('form-submit');
    orgNameInput = document.getElementById('org-elem');
    repoCountInput = document.getElementById('repo-elem');
    committerCountInput = document.getElementById('committer-elem');
    errorMessageSpan = document.getElementById('error-message');

    formButton.addEventListener('click', formSubmitAction);
}

document.addEventListener('DOMContentLoaded', documentLoadAction);


