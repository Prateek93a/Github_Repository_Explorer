let resultsSection;
let formButton;
let orgNameInput;
let repoCountInput;
let committerCountInput;
let errorMessageSpan;

const updateUI = (response = [], hasErrored) => {
    let uiString = '';
    if (hasErrored) {
        uiString += '<h4>Sorry, the request is invalid!</h4>';
    } else {
        uiString = response.map(row => {
            const { repo, committers } = row;
            let rowString = '<div class="col s12">\n';
            rowString += `<h4>${repo.name}: #${repo.forks} Forks </h4>\n`;
            rowString += '<ul>\n';
            for (committer of committers) {
                rowString += `<li>${committer.name}: #${committer.commits} Commits</li>\n`
            }
            rowString += '</ul>\n';
            rowString += '</div>';
            return rowString;
        }).join('\n');
    }
    document.getElementById('response').innerHTML = uiString;
    resultsSection.style.visibility = 'visible';
    formButton.disabled = false;
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
    try {
        let response = await fetch(`/api?org=${orgNameInput.value}&repo=${repoCountInput.value}&committer=${committerCountInput.value}`);
        response = await response.json();
        console.log(response);
        //formButton.disabled = true;
        //console.log('request submitted');

        updateUI(JSON.parse(response), false);
    } catch (error) {
        console.log(error);
        updateUI([], true);
    }

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


