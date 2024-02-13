/**============================================
 *               VARIABLES
 *=============================================**/
let members = [];

const memberData = {
	brianne: {},
	elaine: {},
	rose: {},
	ruud: {},
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
				showMemberData();
			})
			.catch((error) => console.error("Error when loading the data:", error));
	});
}

/**============================================
 *               EXAMPLE: FUNCTION
 *=============================================**/
function showMemberData() {
	console.log("Showing member data now!");
	const memberOne = document.querySelector("#member-one");
	const memberTwo = document.querySelector("#member-two");
	const memberThree = document.querySelector("#member-three");
	const memberFour = document.querySelector("#member-four");

	// Changing the html based on the data. ALWAYS USE memberData.yourname.thepropertyneeded
	memberOne.textContent = memberData.brianne.name;
	memberTwo.textContent = memberData.elaine.name;
	memberThree.textContent = memberData.rose.name;
	memberFour.textContent = memberData.ruud.name;
}
