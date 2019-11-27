function getPersons() {
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:4201/persons/getAll', true);
    request.onload = function () {
        searchPersons(JSON.parse(request.response));
    }
    request.send();
}

function searchPersons(persons) {
    const container = document.getElementById('userContainer');
    const name = document.getElementById('user').value;
    container.innerHTML = '';

    if (name) {
        let ok = false;
        persons.forEach(person => {
            if (person.lastname.includes(name) || person.firstname.includes(name)) {
                ok = true;

                container.innerHTML += `
                            <div class="card">
                                <img src="https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif"
                                    alt="Unknown person">
                                <div>
                                    <h4>${person.firstname} ${person.lastname}</h4>
                                    <h5>Situation: ${person.situation}</h5>
                                    <h5>Description: ${person.description}</h5>
                                </div>
                            </div>
                            <div>
                                <button class="btn-edit" id="editBtn" onClick="openEditDialog()">Edit</button>
                                <button class="btn-delete" onClick="deletePerson('${person._id}')">Delete</button>
                            </div>
                            <div id="editModal" class="modal">
                                    <form class="form-container" name="editPersonForm">
                                        <span class="close" onClick="closeModal()">&times;</span>
                                        <h2>Edit information about someone</h2>
                                        <hr>
                                        <p>Edit details about the person</p>
                                        <label for="user">
                                            Last name:
                                            <input id="user" name="lastname" value="${person.lastname}" type="text" placeholder="ex.Popescu" required>
                                        </label>
                                        <br>
                                        <label for="user2">
                                            First name:
                                            <input id="user2" name="firstname" value="${person.firstname}" type="text" placeholder="ex. Ion" required>
                                        </label>
                                        <br>
                                        <label for="situation">
                                            Situation:
                                            <select id="situation" name="situation" required>
                                                <option value="alive" ${person.situation == 'alive' ? 'selected':''}>Alive</option>
                                                <option value="notfound" ${person.situation == 'notfound' ? 'selected':''}>Not found</option>
                                                <option value="dead" ${person.situation == 'dead' ? 'selected':''}>Dead</option>
                                            </select>
                                        </label>
                                        <br>
                                        <label for="details">
                                            Description:
                                            <input id="details" name="details" value="${person.description ? person.description : ''}" type="text" placeholder="ex.person is very injured">
                                        </label>
                                        <br>
                                        <div class="btn" type="submit" onClick="editPerson('${person._id}')">
                                            Submit
                                        </div>
                                    </form>
                            </div>
                        `;
            }
        });

        if (!ok) {
            container.innerHTML = 'No persons found!';
        }
    }
}

function deletePerson(personId) {
    const request = new XMLHttpRequest();
    request.open('DELETE', `http://localhost:4201/persons/${personId}/delete`, true);
    request.onload = function () {
        getPersons();
    }
    request.send();
}

function openEditDialog() {
    const modal = document.getElementById('editModal');
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modal.style.display = "block";
}
function closeModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = "none";
}

function editPerson(personId) {
    const request = new XMLHttpRequest();
    const personDetails = getPersonDetails();
    request.open('PUT', `http://localhost:4201/persons/${personId}/update`, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onloadend = function () {
        closeModal();
        getPersons();
    }
    request.send(JSON.stringify(personDetails));
}

function getPersonDetails() {
    const personDetails = {
        firstname: document.forms['editPersonForm']['firstname'].value,
        lastname: document.forms['editPersonForm']['lastname'].value,
        situation: document.forms['editPersonForm']['situation'].value,
        description: document.forms['editPersonForm']['details'].value,
    };
    return personDetails;
}

window.onkeyup = e => {
    if (e.keyCode === 13) {
        getPersons();
    }
}