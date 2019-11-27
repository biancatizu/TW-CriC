const eventList = {
    id: [1, 2, 3],
    names: ['Earthquake', 'Terrorist Attack', 'Fire'],
    location: ['Nepal', 'Paris', 'Iasi'],
    victims: [13, 24, 2],
    date: ['18-03-2019', '22-02-2019', '10-10-2018']
}

function populateEventList() {
    const list = document.createElement('ul');
    for (let i = 0; i < eventList.names.length; i++) {
        const item = document.createElement('li');
        item.appendChild(document.createTextNode(eventList.names[i]));
        item.onclick = function(){
            showDetailsOfEvent(eventList.id[i]);
        };
        list.appendChild(item);
    }
    document.getElementById('eventList').appendChild(list);
}

function showDetailsOfEvent(id) {
    const details = document.createElement('p');
    for (let i = 0; i < eventList.id.length; i++) {
        if (id === eventList.id[i]) {
            details.innerHTML="Name: " + eventList.names[i] +"<br>" +
            "Location: " + eventList.location[i]+"<br>" +
            "Victims: " + eventList.victims[i]+"<br>" +
            "Date: " + eventList.date[i];
        }
    }
    document.getElementById('eventDetails').removeChild(document.getElementById('eventDetails').lastChild);
    document.getElementById('eventDetails').appendChild(details);
}
populateEventList();