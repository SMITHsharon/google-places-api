
$(document).ready(function(){

// DON'T PUSH API KEY UP TO GITHUB
const apiKey = "";
let menuChoice;

// writes the result of the call to the DOM
const writeToDOM = (placesArray) => {
	domString = "";
	// let placesArray = ajaxObject.results;

	$("#outputHere").empty(); // clear the DOM of prior output

	domString += `<div class="resultHeader">`;
	if (menuChoice === "liquor_store") {
		domString += `Search Matches for Liquor Stores`;
	} else 
	if (menuChoice === "mosque") {
		domString += `Search Matches for Mosques`;
	} else 
	if (menuChoice === "night_club") {
		domString += `Search Matches for Night Clubs`;
	} else 
	if (menuChoice === "cemetery") {
		domString += `Search Matches for Cemeteries`;
	} else {
		domString += `Search Matches for Fire Stations`;
	}
	domString += `</div>`;

	if (placesArray.length !== 0) {
		for (let i=0; i<placesArray.length; i++) {
			domString += `<a href="#"><div id="${placesArray[i].place_id}" class="thisPlace">`;
			domString += `${placesArray[i].name}</div></a>`;
		}
		// placesArray.forEach(function(thisPlace) {
		// 	domString += `<div class="thisPlace">`;
		// 	domString += `${thisPlace.name}</div>`;
		// })
	} else {
			domString += `<<div class="thisPlace">There were no places found matching your request.</div>`;
	}

	$("#outputHere").append(domString);
};


const writeAddressToDOM = (address) => {
	let outputString = `<div>${address}</div>`;
	$("#addresses").append(outputString);
};


$("body").on("click", ".thisPlace", (e) => {
	let place_id = e.target.id;
	loadDetail(place_id).then((result) => {
		console.log(result.formatted_address);
		writeAddressToDOM(result.formatted_address);
	});
});

const loadDetail = (place_id) => {
	return new Promise ((resolve, reject) => {
		$.ajax(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${apiKey}`)
		.done((data) => resolve(data.result))
		.fail((error) => reject(error));
	});
};


// event handler on menu click
$("body").on("click", "li", (e) => {
	menuChoice = e.target.innerHTML;
	loadPlaces(menuChoice).then((data) => {
		console.log(data);
		let myData = data;
	}).catch((error) => {
		console.log(error);
	});
});


// Promise <ajax> call
const loadPlaces = (dropdownType) => {

		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.174465,-86.767960&radius=50000&type=${dropdownType}&key=${apiKey}`)
		.done((data) => { resolve(data.results);
			writeToDOM(data.results);
		})	
			
		.fail((error) => reject(error));
	});
};

});
