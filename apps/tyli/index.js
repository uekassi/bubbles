//write here the code when the app is loaded

const load = (req, res) => {
	res.redirect("/tyli/login");
}

const login = (req, res) => {
	//instructions to verify the login
	res.redirect("tyli/dashboard");
}

const addnote = (name, content) => {
	const fs = require("fs");
	const data = name + "\n" + "content";
	try {
		fs.writeFileSync("/datas/user_notes/"+name+".ppr", data);
	} catch(e) {
		console.log(e);
		return false
	}
}


exports.load = load
exports.login = login