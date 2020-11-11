const formButton = document.getElementById('form-submit');
const orgNameInput = document.getElementById('org-elem');
const repoCountInput = document.getElementById('repo-elem');
const committerCountInput = document.getElementById('committer-elem');

formButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (!orgNameInput.value) return;
    if (!repoCountInput.value) return;
    if (!committerCountInput.value) return;
    console.log('request submitted');
});