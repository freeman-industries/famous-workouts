NodeList.prototype.forEach = Array.prototype.forEach;

var _FW = {};

//muscle code
var oldEmojiNumber = 0;
var changeMuscle = function(){

	var emojiNumber = oldEmojiNumber;

	while(emojiNumber === oldEmojiNumber){
		emojiNumber = Math.floor((Math.random() * 6) + 1);
	}

	var muscleDiv = document.querySelector("header .wrap .lefticon");
	muscleDiv.setAttribute("style", "background-image:url(/images/muscle/" + emojiNumber + ".png)");

	var thumbDiv = document.querySelector("header .wrap .righticon");
	thumbDiv.setAttribute("style", "background-image:url(/images/thumb/" + emojiNumber + ".png)");

	// emojiNumber++;
};

changeMuscle();

var shuffle = function(array){
	var currentIndex = array.length, temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

var celebs = document.querySelector(".workout_thumbs");

console.log("hey");

if(celebs !== null){
	var tiles = celebs.querySelector(".workout_tile");

	console.log(tiles);

	shuffled = shuffle(tiles);

	console.log(shuffled);

	var div = document.createElement("div");
	shuffled.forEach(function(tile){
		div.appendChild(tile);
	});

	console.log(div);

	document.querySelector(".workout_thumbs").innerHTML = div.innerHTML;
}

//extend array
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
