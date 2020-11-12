let resultsSection;
let formButton;
let orgNameInput;
let repoCountInput;
let committerCountInput;
let errorMessageSpan;

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
    let response = await fetch(`/api?org=${orgNameInput.value}&repo=${repoCountInput.value}&committer=${committerCountInput.value}`);
    response = await response.json();
    console.log(response);
    //formButton.disabled = true;
    //console.log('request submitted');

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


