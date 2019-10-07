window.onload = init;

function init() {
    // hooks button from UI up to allow for user created stickies
    var button = document.getElementById('add_button');
    button.onclick = createSticky;
    // This method of storing stickies will run in to problems since each sticky's name is related to the length of the local storage object, which can have other items in it besides sticky notes. Next let's try using an array (see notetoself2.js).
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        // the substring check ensures that only sticky notes are added to the DOM. localStorage could have other key/value pairs that you don't want added as sticky notes.
        if (key.substring(0, 6) == 'sticky') {
            var value = localStorage.getItem(key);
            addStickyToDOM(value);
        }
    }

    for (var i = 0; i < stickiesArray.length; i++) {
        var key = stickiesArray[i];
        var value = localStorage[key];
        addStickyToDOM(value);
    }
}

function createSticky() {
    var value = document.getElementById('note_text').value;
    var key = 'sticky_' + localStorage.length;
    localStorage.setItem(key, value);

    addStickyToDOM(value);
}

// inserts sticky notes in to <ul> element as <li> items
function addStickyToDOM(value) {
    var stickies = document.getElementById('stickies');
    var sticky = document.createElement('li');
    var span = document.createElement('span');
    span.setAttribute('class', 'sticky');
    span.innerHTML = value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
}
