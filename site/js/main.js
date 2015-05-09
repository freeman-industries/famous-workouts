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

//load workouts
var httpCallback = function(){
	_FW.workouts = JSON.parse(this.responseText)["workouts"];

	document.querySelector("header .wrap").addEventListener("click", function(){
		render("home", _FW.workouts, true);
	});

	var path = location.pathname;
	if(path === "/"){
		render("home", _FW.workouts);
	} else {
		//strip query strings, remove /, replace - with a space
		path = path.split("?")[0].split("/").join("").split("-").join(" ");

		_FW.workouts.forEach(function(workout){
			if(workout.name.toLowerCase() === path){
				render("workout", workout);

				//format url
				var url = workout.name.toLowerCase().split(" ").join("-");

				history.replaceState({
					"pageType":"workout",
					"pageData":workout
				}, null, url);
			}
		});
	}

	window.addEventListener("popstate", function(e) {
		if(e.state === null){
			render("home", _FW.workouts);
		} else {
	    	render(e.state.pageType, e.state.pageData);
		}
	});

};

var httpRequest = new XMLHttpRequest();
httpRequest.onload = httpCallback;
httpRequest.open("get", "/workouts.json", true);
httpRequest.send();

var render = function(pageType, pageData, triggerState){
	var page = document.createElement("div");
	page.id = "page";

	switch(pageType){
		case "home":

			pageData.forEach(function(workout){
				var el = document.createElement("div");
				el.className = "workout_tile";
				el.innerHTML = '<img src="' + workout.photo + '"><div class="name">' + workout.name + '</div>';
				el.__workout = workout;

				el.addEventListener("click", function(e){
					render("workout", el.__workout, true);
				});

				page.appendChild(el);
			});

			//format url
			if(triggerState){
				var url = "/";

				history.pushState({
					"pageType":pageType,
					"pageData":pageData
				}, null, url);
			}

		break;
		case "workout":

			var workout_page_frame = document.createElement("div");
			workout_page_frame.className = "workout_page_frame";
			workout_page_frame.innerHTML = 
				'<div class="frame_border">'
				+ '<div class="frame_inset">'
					+ '<img src="' + pageData.photo + '">'
					+ '<div class="name">' + pageData.name + '</div>'
				+ '</div>'
			+ '</div>';

			var table = document.createElement("table");

			var row = document.createElement("tr");
			row.className = "heading";
			row.innerHTML = '<td>Exercise</td><td>Sets x Reps</td';
			table.appendChild(row);

			pageData.routines.forEach(function(routine){
				var row = document.createElement("tr");
				row.innerHTML = '<td>' + routine.name + '</td><td>' + routine.amount + '</td';
				table.appendChild(row);
			});

			workout_page_frame.appendChild(table);

			page.appendChild(workout_page_frame);

			//format url
			if(triggerState){
				var url = pageData.name.toLowerCase().split(" ").join("-");

				history.pushState({
					"pageType":pageType,
					"pageData":pageData
				}, null, url);
			}

		break;
		default:

		break;
	}

	page.className = "hidden";

	var oldPage = document.getElementById("page");
	oldPage.parentNode.replaceChild(page, oldPage);

	window.document.body.scrollTop = 0;

	changeMuscle();

	setTimeout(function(){
		page.className = "";
	}, 250);
};

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