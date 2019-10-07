// local storage uses two text strings as key/value pairs, the first string is the key, the second is the value.
localStorage.setItem('sticky_0', 'Pick up dry cleaning');
localStorage.setItem('sticky_1', 'Cancel cable tv, who needs it now?');

var sticky = localStorage.getItem('sticky_0');

// alert(sticky);

// integers are stored as strings (via type coercion in the example below). You can use parseInt to convert the stored string back in to an integer.
localStorage.setItem('numitems', 1);

var numItems = parseInt(localStorage.getItem('numitems'));
numItems += 1;
localStorage.setItem('numitems', numItems);

// console.log(numItems);

// for floating point numbers (ie decimals), parseFloat
localStorage.setItem('price', 9.99);
var price = parseFloat(localStorage.getItem('price'));

// console.log(price);

// the above uses getters and setters for local storage key/value pairs. Below is a different syntax to setting local storage key/value pairs. It may be more useful for associative arrays.
localStorage['sticky_2'] = 'Pay the bills';
var sticky2 = localStorage['sticky_2'];

// console.log(sticky2);

// The localStorage API also provides a length property and a 'key' method
// NOTE: Iterating through the key/value pairs in localStorage does not produce them in any predictable order. This is due to browser implementations. You can only access the values, not produce an array that can be accessed predictably.
for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];
    console.log(value);
}

localStorage.clear();
