window.onload = init;

function init() {
    var button = document.getElementById('add_button');
    button.onclick = createSticky;

    // gets an existing stickiesArray or creates one if none is present via the helper function getStickiesArray();
    var stickiesArray = getStickiesArray();

    for (var i = 0; i < stickiesArray.length; i++) {
        var key = stickiesArray[i];
        var value = localStorage[key];
        addStickyToDOM(key, value);
    }
}

function createSticky() {
    var value = document.getElementById('note_text').value;
    // // This is the old way of creating a key for each sticky note
    // var key = 'sticky_' + localStorage.length;

    // We can use the getTime() method to create a unique key for each sticky note created
    var currentDate = new Date();
    var time = currentDate.getTime();
    // remember that getTime() gets the number of milliseconds that have passed since 1970, so every key is now guaranteed to be unique
    var key = 'sticky_' + time;
    localStorage.setItem(key, value);

    // grab the stickies array with a new function
    var stickiesArray = getStickiesArray();
    // store the key/value pair with our new, unique key
    localStorage.setItem(key, value);
    // append the key to the stickiesArray
    stickiesArray.push(key);
    // stores the array back in localStorage, stringifying it first
    localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));

    addStickyToDOM(key, value);
}

// inserts sticky notes in to <ul> element as <li> items
function addStickyToDOM(key, value) {
    var stickies = document.getElementById('stickies');
    var sticky = document.createElement('li');
    sticky.setAttribute('id', key);
    var span = document.createElement('span');
    span.setAttribute('class', 'sticky');
    span.innerHTML = value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
    sticky.onclick = deleteSticky;
}

function getStickiesArray() {
    var stickiesArray = localStorage.getItem('stickiesArray');
    if (!stickiesArray) {
        stickiesArray = [];
        localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray)) 
    } else {
        stickiesArray = JSON.parse(stickiesArray);
    }
    return stickiesArray;
}

// delete sticky notes
function deleteSticky(e) {
    // if the click is on the sticky note itself we are good and grab the id
    var key = e.target.id;
    // if the user instead clicks on the text, we need to check the <span> elements parent node, the <li> for the id.
    if (e.target.tagName.toLowerCase() == 'span') {
        key = e.target.parentNode.id;
    }
    localStorage.removeItem(key);
    var stickiesArray = getStickiesArray();
    if (stickiesArray) {
        for (var i = 0; i < stickiesArray.length; i++) {
            if (key == stickiesArray[i]) {
                stickiesArray.splice(i, 1);
            }
        }
        localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
        removeStickyFromDOM(key);
    }
}

function removeStickyFromDOM(key) {
    var sticky = document.getElementById(key);
    // sticky is the <li>, the parentNode is the <ul> so this removes the <li> from the <ul>
    sticky.parentNode.removeChild(sticky);
}
