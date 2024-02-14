/**============================================
 *               VARIABLES
 *=============================================**/
let members = [];

const memberData = {
	brianne: {},
	elaine: {},
	rose: {},
};

/**============================================
 *       LOADING AND LOGGING THE RIGHT DATA
 *=============================================**/

// Fetching the members
fetch("./team.json")
	.then((response) => response.json())
	.then((teamdata) => {
		members = teamdata.members;
		loadMemberData(members);
		console.log("TEAM MEMBERS:", members);
	});

// Matching data to members
function loadMemberData(members) {
	members.forEach((member) => {
		const dataURL = `${member.personalPage}`;

		fetch(dataURL)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				// Directly assign the fetched data to the correct variable based on the member's name
				Object.assign(memberData[member.name], data);
				console.log(`${member.name}`, data); // Logs the data per member

				// Set background image here after data is loaded
				const buttons = [brianneButton, roseButton, elaineButton];

				buttons.forEach((button) => {
					button.style.backgroundImage = `url("${
						memberData[button.id].avatar_url
					}")`;
				});
			})
			.catch((error) => console.error("Error when loading the data:", error));
	});
}

/**============================================
 *             HTML VARIABLES
 *=============================================**/

// This concerns only the dynamic HTML variables.
const nameEl = document.getElementById("name");
const usernameEl = document.getElementById("username");
const levelEl = document.getElementById("level");
const iconEl = document.getElementById("icon");
const favGameEl = document.getElementById("favorite-game");
const bioEl = document.getElementById("bio");

// Each button
const brianneButton = document.getElementById("brianne");
const elaineButton = document.getElementById("elaine");
const roseButton = document.getElementById("rose");

const buttonEls = document.getElementsByTagName("button"); // @ Brianne from Rose: Should return a HTML Collection, which I think may be most convenient to work with and loop over in this scenario..?

/**============================================
 *        CHANGING DATA ON BUTTON CLICK
 *=============================================**/
// Changing the html based on the data. ALWAYS USE memberData.yourname.thepropertyneeded

function updateMemberData(member) {
	nameEl.textContent = member.name;
	usernameEl.textContent = member.username;
	levelEl.textContent = `LVL${member.age}`;
	bioEl.textContent = member.bio;
	iconEl.src = member.avatar_url;
	favGameEl.textContent = member.favorite_game.join(", ");
	console.log("button clicked!");
}

brianneButton.addEventListener("click", () => {
	updateMemberData(memberData.brianne);
});

elaineButton.addEventListener("click", () => {
	updateMemberData(memberData.elaine);
});

// ELAINE: favoriteGames moet zijn favorite_game

roseButton.addEventListener("click", () => {
	updateMemberData(memberData.rose);
});
