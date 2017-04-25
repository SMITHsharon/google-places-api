
$(document).ready(function(){

// DON'T PUSH API KEY UP TO GITHUB
const apiKey = "";


// writes the result of the call to the DOM
const writeToDOM = (ajaxObject) => {

	domString = "";

	let placesArray = ajaxObject.results;

	placesArray.forEach(function(thisPlace) {
		domString += `${thisPlace.name}`;
	})

	$("#outputHere").append(domString);
};

// event handler on menu click
$("body").on("click", "li", (e) => {
	loadPlaces(e.target.innerHTML).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
});


// Promise <ajax> call
const loadPlaces = (dropdownType) => {

		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.174465,-86.767960&radius=50000&type=${dropdownType}&keyword=cruise&key=${apiKey}`)
		.done((data) => { resolve(data)
			writeToDOM(data);
		})	
			
		.fail((error) => reject(error));
	});
};

});
