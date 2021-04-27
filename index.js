const sauce = process.argv[2];
if (!sauce) return console.log("No sauce given!");

const goWebGo = new Promise(resolve => {
	resolve(
		sauce.match(/\d{1,6}/) ? require("./sites/nhentai.js")(sauce) :
		sauce.includes("joyhentai") ? require("./sites/joyhentai.js")(sauce) :
		sauce.includes("kissmanga") ? require("./sites/kissmanga.js")(sauce) :
		console.log("Invalid input")
	);
});

goWebGo.then(() => console.log("Courtesy, your friendly neighbourhood Spider-Man")).catch(console.log);