window.onload = init;

function init() {
    var button = document.getElementById('add_button');
    button.onclick = createSticky;

    var clearButton = document.getElementById('clear_button');
    clearButton.onclick = clearStickyNotes;

    // gets an existing stickiesArray or creates one if none is present via the helper function getStickiesArray();
    var stickiesArray = getStickiesArray();

    for (var i = 0; i < stickiesArray.length; i++) {
        var key = stickiesArray[i];
        // var value = localStorage[key];
        // since the text is now found in stickyObj, we need to parse the object before creating the sticky note
        var value = JSON.parse(localStorage[key]);
        addStickyToDOM(key, value);
    }
}

function createSticky() {
    var stickiesArray = getStickiesArray();
    var currentDate = new Date();
    // remember that getTime() gets the number of milliseconds that have passed since 1970, so every key is now guaranteed to be unique
    var key = 'sticky_' + currentDate.getTime;
    var value = document.getElementById('note_text').value;

    // Coloring the sticky notes
    var colorSelectObj = document.getElementById('note_color');
    var index = colorSelectObj.selectedIndex;
    var color = colorSelectObj[index].value;
    // Create an object to contain the text and color of the sticky note
    var stickyObj = {
        'value': value,
        'color': color
    }
    // JSON just converts objects back and forth to key/value pairs so we can stringify the stickyObj and add it to local storage
    localStorage.setItem(key, JSON.stringify(stickyObj));
    // append the key to the stickiesArray
    stickiesArray.push(key);
    // stores the array back in localStorage, stringifying it first
    localStorage.setItem('stickiesArray', JSON.stringify(stickiesArray));
    // Now we can pass the stickyObj to the DOM to add the text and note color while still creating a unique key for each sticky note
    addStickyToDOM(key, stickyObj);
}

// inserts sticky notes in to <ul> element as <li> items
function addStickyToDOM(key, stickyObj) {
    var stickies = document.getElementById('stickies');
    var sticky = document.createElement('li');
    sticky.setAttribute('id', key);
    // now we can use stickyObj to set the background color of the sticky note
    sticky.style.backgroundColor = stickyObj.color

    var span = document.createElement('span');
    span.setAttribute('class', 'sticky');
    // and use stickyObj to set the text value of the sticky note
    span.innerHTML = stickyObj.value;
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
    var key = e.target.id;
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
    sticky.parentNode.removeChild(sticky);
}

// clear all stickies at once and local storage
function clearStickyNotes() {
    localStorage.clear();
    // clean out stickies array
    var stickyList = document.getElementById('stickies');
    var stickies = stickyList.childNodes;
    for (var i =stickies.length - 1; i >= 0; i--) {
        stickyList.removeChild(stickies[i]);
    }

    // reset stickiesArray
    var stickiesArray = getStickiesArray();
}
