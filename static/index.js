// for displaying the result of fetch request
let resultsSection;
// for triggering formSubmitAction function click 
let formButton;
// for input value of organisation input text box
let orgNameInput;
// for input value of repository count input number box
let repoCountInput;
// for input value of committers count input number box
let committerCountInput;
// for handling error messages
let errorMessageSpan;

// function to check validity of inputs
const isValid = (orgName, repoCount, committerCount) => {
    // checking if some variable is empty
    if (!orgName || !repoCount || !committerCount) {
        return false;
    }
    // repoCount and committerCount are numbers because the input type of html element is number
    return true;
}

// function to update the UI based on response from the server 
const updateUI = (response = [], hasErrored = false, errorMessage = '') => {
    // string to display output the result of fetch request
    let uiString = '';

    // check if error has occurred in the fetch request
    if (hasErrored) {
        uiString += `<h4>${errorMessage}!</h4>`;
    }
    else {
        // map the response object to display the every repository with corresponding contributors
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

    // update the UI
    document.getElementById('response').innerHTML = uiString;
    resultsSection.style.visibility = 'visible';
    formButton.disabled = false;
    formButton.innerText = 'Search';
}

// function to handle form submit action
const formSubmitAction = async (event) => {
    event.preventDefault();

    // set the values of result section, error section empty
    document.getElementById('response').innerHTML = '';
    errorMessageSpan.innerText = '';
    resultsSection.style.visibility = 'hidden';

    // extract the user input
    const orgName = orgNameInput.value;
    const repoCount = repoCountInput.value;
    const committerCount = committerCountInput.value;

    // check validity of the input
    if (!isValid(orgName, repoCount, committerCount)) {
        errorMessageSpan.innerText = 'One or more input values missing or invalid...';
        return;
    }

    formButton.innerText = 'Please wait';

    try {
        // fetch the data
        let response = await fetch(`/api?org=${orgName}&repo=${repoCount}&committer=${committerCount}`);
        let isSuccess = response.ok;
        response = await response.json();
        response = JSON.parse(response);

        // check if the request was successful
        if (!isSuccess) {
            const message = `An error has occured: ${response.message}`;
            throw new Error(message);
        }

        // update the UI
        updateUI(response);
    } catch (error) {
        // show error
        updateUI([], true, error);
    }
}

// function to set the dom element variables when dom is loaded
const documentLoadAction = () => {
    // intitalise the variables for handling dom elements
    resultsSection = document.getElementById('results');
    formButton = document.getElementById('form-submit');
    orgNameInput = document.getElementById('org-elem');
    repoCountInput = document.getElementById('repo-elem');
    committerCountInput = document.getElementById('committer-elem');
    errorMessageSpan = document.getElementById('error-message');

    formButton.addEventListener('click', formSubmitAction);
}

document.addEventListener('DOMContentLoaded', documentLoadAction);


