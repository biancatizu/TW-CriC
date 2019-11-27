function addPerson() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            getPersonDetails(position.coords);
        })
    }
}

function getPersonDetails(position) {
    const personDetails = {
        firstname: document.forms['addPersonForm']['firstname'].value,
        lastname: document.forms['addPersonForm']['lastname'].value,
        situation: document.forms['addPersonForm']['situation'].value,
        latitude: position.latitude,
        longitude: position.longitude,
        description: document.forms['addPersonForm']['details'].value,
    };
    if (personDetails.firstname === '' || personDetails.lastname === '' || personDetails.situation === '') {
        alert('Invalid form data! Make sure you completed all required fields.');
        return false;
    } else {
        makeRequest(personDetails);
    }
}

function makeRequest(personDetails) {
    const request = new XMLHttpRequest();
    if (personDetails) {
        request.open('POST', 'http://localhost:4201/persons/create', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function () {
            alert('Person added!');
        }
        request.send(JSON.stringify(personDetails));
    }
}