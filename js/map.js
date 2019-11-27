let mapHeight;
let handleResize;
initHandleResize();
function initHandleResize() {
    this.handleResize = () => {
        this.setMapHeight();
    }
    window.addEventListener('load', this.handleResize);
    window.addEventListener('resize', this.handleResize);
}
function setMapHeight() {
    const headerHeight = document.querySelector('header').clientHeight;
    this.mapHeight = window.innerHeight - headerHeight - 50 + 'px';
    const map = document.querySelector('iframe');
    map.setAttribute("style", "height: " + this.mapHeight);
}
function showEventsPage() {
    document.querySelector('iframe').src = 'html/events.html';    
    clearStyleforUnselectedMenuEntries("Events");
    setStyleForSelectedMenuEntry("Events");
}
function showMapPage() {
    document.querySelector('iframe').src = 'html/map.html';
    clearStyleforUnselectedMenuEntries("Map");
    setStyleForSelectedMenuEntry("Map");
}
function showCasualtiesPage() {
    document.querySelector('iframe').src = 'html/Casualities.html';
    clearStyleforUnselectedMenuEntries("Casualties");
    setStyleForSelectedMenuEntry("Casualties");
}
function showGuidePage() {
    document.querySelector('iframe').src = 'html/Interfata.html';
    clearStyleforUnselectedMenuEntries("Guide");
    setStyleForSelectedMenuEntry("Guide");
}
function showFormPage() {
    document.querySelector('iframe').src = 'html/Form.html';
    clearStyleforUnselectedMenuEntries('iframe');
}
function setStyleForSelectedMenuEntry(content) {
    const item = document.getElementsByTagName('li');
    for(let i = 0; i<item.length; i++) {
        if(item[i].textContent === content) {
            item[i].classList.add('selected');
            break;
        }
    }
}
function clearStyleforUnselectedMenuEntries(content){
    const item = document.getElementsByTagName('li');
    for(let i = 0; i<item.length; i++) {
        if(item[i].textContent !== content) {
            item[i].classList.remove('selected');
        }
    }
}