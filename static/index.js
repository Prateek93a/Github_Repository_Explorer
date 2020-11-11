let resultsSection;
let formButton;
let orgNameInput;
let repoCountInput;
let committerCountInput;
let errorMessageSpan;

const repoQuery = (orgName) => `https://api.github.com/orgs/${orgName}/repos?type=forks`
const committerQuery = (orgName) => `https://api.github.com/orgs/${orgName}/repos`

const fetchRepos = (orgName) => fetch(repoQuery(orgName));
const fetchCommitters = (orgName) => fetch(committerQuery(orgName));

const updateUI = (repos, committers) => {

}

const formSubmitAction = async (event) => {
    event.preventDefault();
    if (!orgNameInput.value || !repoCountInput.value || !committerCountInput.value) {
        errorMessageSpan.innerText = 'One or more input values missing...';
        return;
    }
    errorMessageSpan.innerText = '';
    console.log('request submitted');

    let repos = await fetchRepos(orgNameInput.value);
    repos = await repos.json();
    let committers = await fetchCommitters(orgNameInput.value);
    committers = await committers.json();

    console.log(repos);
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


