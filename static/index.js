// for displaying the result of fetch request
let resultsSection;

// for triggering formSubmitAction function click 
let formButton;

// for input value of organisation input text box
let orgNameInput;

// for input value of repository count input number box
let repoCountInput;

// for input value of contributors count input number box
let contributorCountInput;

// for handling error messages
let errorMessageSpan;

// function to check validity of inputs
const isValid = (orgName, repoCount, contributorCount) => {
    // checking if some variable is empty
    if (!orgName || !repoCount || !contributorCount) {
        return false;
    }

    // check if the count is less than or equal to 0
    if (Number(repoCount) <= 0 || Number(contributorCount) <= 0) {
        return false;
    }

    // check if the numbers are integers
    if (!Number.isInteger(Number(repoCount)) || !Number.isInteger(Number(contributorCount))) {
        return false;
    }

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
            const { repo, contributors } = row;
            let rowString = '<div class="col s12">\n';
            rowString += `<h4>${repo.name}: #${repo.forks} Forks </h4>\n`;
            rowString += '<ul>\n';
            for (contributor of contributors) {
                rowString += `<li>${contributor.name}: #${contributor.commits} Commits</li>\n`
            }
            rowString += '</ul>\n';
            rowString += '</div>';
            return rowString;
        }).join('\n');
    }

    // update the UI
    document.getElementById('response').innerHTML = uiString;
    resultsSection.style.visibility = 'visible';
    formButton.innerText = 'Search';
    formButton.classList.remove('disabled');
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
    const contributorCount = contributorCountInput.value;

    // check validity of the input
    if (!isValid(orgName, repoCount, contributorCount)) {
        errorMessageSpan.innerText = 'One or more input values missing or invalid...';
        return;
    }

    // disable the button
    formButton.innerText = 'Loading';
    formButton.classList.add('disabled');

    try {
        // api url
        const url = `/api?org_name=${orgName}&repo_count=${repoCount}&contributor_count=${contributorCount}`;

        // fetch the data
        let response = await fetch(url);
        let isSuccess = response.ok;
        let status = response.status;
        response = await response.json();
        response = JSON.parse(response);

        // check if the request was successful
        if (!isSuccess) {
            let message;
            if (status == 404) {
                message = 'Organisation not found';
            } else {
                message = `${response.message}`;
            }
            throw new Error(message);
        }

        // update the UI
        updateUI(response);
    } catch (error) {
        // handle error condition
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
    contributorCountInput = document.getElementById('contributor-elem');
    errorMessageSpan = document.getElementById('error-message');

    formButton.addEventListener('click', formSubmitAction);
}

document.addEventListener('DOMContentLoaded', documentLoadAction);


