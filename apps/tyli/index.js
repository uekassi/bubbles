//write here the code when the app is loaded

const load = (req, res) => {
	res.redirect("/tyli/login");
}

const login = (req, res) => {
	//instructions to verify the login
	res.redirect("tyli/dashboard");
}

const addnote = (req, res) => {
	const fs = require("fs");
	let name = req.body.noteTitle;
	let content = req.body.noteContent;
	const data = name + "\n" + content;
	let notes = fs.readFileSync("./apps/tyli/datas/notes.json");
	notes = JSON.parse(notes);
	notes.push(req.body);
	fs.mkdirSync("./apps/tyli/datas/user_notes/"+req.body.noteFolder);
	fs.writeFileSync("./apps/tyli/datas/notes.json", JSON.stringify(notes));
	fs.writeFileSync("./apps/tyli/datas/user_notes/"+req.body.noteFolder+"/"+name+".ppr", data);
	
	res.redirect("/tyli/editor")
}


exports.load = load
exports.login = login
exports.addnote = addnote