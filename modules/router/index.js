const load = (app) => {
	const appRoutes = require("../../datas/routes.json");
	let uidExist = false;

	//routes middleware
	app.use((req, res, next) => {
		//console.log(req.method, req.url, req.query);
		next();
	})

	app.param('uid', (req, res, next, uid) => {
		//console.log("Doing name validation "+uid);
		next();
	});

	appRoutes.forEach((appRoute) => {
		if(appRoute.pagePath === "/login" || appRoute.pagePath === "/signin" || appRoute.pagePath === "/"){
			
			app.get(appRoute.pagePath, (req, res) => {
				res.render(appRoute.renderPage, {
					title: appRoute.title,
					cssFile: appRoute.cssFile
				})
			});
		}else if(appRoute.pagePath === "/tyli"){
			app.get(appRoute.pagePath, (req, res) => {
				tyli.load(req, res);
			})
		}else if(appRoute.pagePath === "/tyli/login"){
			app.get(appRoute.pagePath, (req, res) => {
				res.render(appRoute.renderPage, {
					title: appRoute.title,
					cssFile: appRoute.cssFile
				});
			})
		}else {
			app.get(appRoute.pagePath, (req, res) => {
				let uid = req.query.uid;
				
				if(uid == undefined){
					res.render("pages/access-denied", {
						title: "Accès refusé"
					});
				}else{
					//uid verification here!
					uidExist = true;
					if(uidExist){
						res.render(appRoute.renderPage, {
							title: appRoute.title,
							cssFile: appRoute.cssFile
						});
					}else{
						res.render("pages/access-denied", {
							title: "Accès refusé",
							cssFile: "access-denied"
						});
					}
				}
			})
		}

	});

	app.post("/tyli/login", (req, res) => {
		console.log(req.body);
		res.redirect("/tyli/dashboard")
	})
}

exports.load = load