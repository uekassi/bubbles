function createCSSFile(fileName, fs){
	let defaultData = "/* Mettre votre CSS ici */"
	try {
		fs.writeFileSync("./public/css/"+fileName+".css", defaultData);
		return true;
	} catch(e) {
		console.log(e);
		return false;
	}
}
function createEJSFile(fileName, fs){
	let defaultData = `<%- include('../partials/head') %>\n\t<div class="w-100 h-100 center">\n\t\t<h1>La page ${fileName} est prête <span class="bi-emoji-laughing-fill"></span></h1>\n\t</div>\n<%- include('../partials/foot') %>`;
	try {
		fs.writeFileSync("./views/pages/"+fileName+".ejs", defaultData);
		return true;
	} catch(e) {
		console.log(e);
		return false;
	}
}
function update_routes(pageName, title, postInstructions, getInstructions, fs){
	let routes = fs.readFileSync("./data/routes.json");
	routes = JSON.parse(routes);
	routes.push({
		"pagePath": `/${pageName}`,
		"renderPage": `pages/${pageName}`,
		"title": title,
		"module": pageName,
		"cssFile": pageName,
		"postInstructions": postInstructions,
		"getInstructions": getInstructions
	});
	try {
		fs.writeFileSync("./data/routes.json", JSON.stringify(routes, null, 2));
		return true;
	} catch(e) {
		console.log(e);
		return false;
	}
	
}

function create_page_helper(pageName, pageTitle, postInstructions, getInstructions, comment, pageIsCreated, fs){
	let ejsFileCreated = createEJSFile(pageName, fs);
	if(ejsFileCreated){
		let moduleCreated = create_module(pageName, postInstructions, getInstructions, fs);
		if(moduleCreated){
			let jsonFileUpdated = update_routes(pageName, pageTitle, postInstructions, getInstructions, fs);
			if(jsonFileUpdated){
				comment = "Page successfully created!";
				pageIsCreated = true;
				return {pageIsCreated, comment};
			}else{
				comment = "Page creation failed : Unable to update the routes JSON file!";
				return {pageIsCreated, comment};
			}
		}else{
			comment = "Page creation failed : Unable to create module of the page";
			return {pageIsCreated, comment}
		}
		
	}else{
		comment = "Page creation failed : The EJS file could not be created!";
		return {pageIsCreated, comment};
	}
}
function create_page(pageName, title, postInstructions, getInstructions, pageHasCSS, fs){
	let pageIsCreated = false;
	let comment;
	let createPage;//is an object that contains {pageIsCreated, comment}

	if(pageHasCSS === "on"){
		let cssFileCreated = createCSSFile(pageName, fs);
		if(cssFileCreated){
			createPage = create_page_helper(pageName, title, postInstructions, getInstructions, comment, pageIsCreated, fs);
			return createPage;
		}else{
			comment = "Page creation failed : The CSS file could not be created!";
			return {pageIsCreated, comment};
		}
	}else{
		cssFile = "";
		createPage = create_page_helper(pageName, title, postInstructions, getInstructions, comment, pageIsCreated, fs);
		return createPage;
	}
}
function create_module(pageName, postInstructions, getInstructions, fs){
	let data = `let post = (req, res) => {\n\t${postInstructions}\n}\nlet get = (req, res) => {\n\t${getInstructions}\n}\nexports.post = post;\nexports.get = get;`;
	try {
		fs.writeFileSync("./app_modules/"+pageName+".js", data);
		return true;
	} catch(e) {
		console.log(e);
		return false;
	}
}

let post = (req, res) => {
	let data = req.body;
	const fs = require("fs");
	let page_created = create_page(data.name, data.title, data.postInstructions, data.getInstructions, data.cssFile, fs);
	if(page_created.pageIsCreated){
		console.log(`Success : ${page_created.comment}`);
		res.redirect("/appdev?uid="+req.query.uid);
	}else{
		console.log(`Erreur : ${page_created.comment}`);
		res.redirect("/appdev?uid="+req.query.uid);
	}
}

let get = (req, res) => {

}

exports.post = post
exports.get = get