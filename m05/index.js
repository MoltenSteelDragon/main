var number = prompt('enter a number between 1 and 10'); //gets a number for the multiplication table
var msg = ''; //mesage to be displayed

var i = 1; //counter
//this loop makes the multiplication table
while (i < 11) {
  msg += i + ' * ' + number + ' = ' + (i * number) + '<br />';
  i++;
}

// dipslay the multiplication table
var el = document.getElementById('blackboard');
el.innerHTML = msg;
