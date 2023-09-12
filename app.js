const express = require('express');
const path = require('path');

const router = require("./modules/router/index.js")



const app = express();
const PORT = 3000;

app.set('view engine', 'ejs')

//making sure express can read our request in a json
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//setting up the path to the integrated apps
app.use(express.static(path.join(__dirname, "apps")));

//setting up the path to the public folder
app.use(express.static(path.join(__dirname, "public")));

//adding bootstrap to the app
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap-icons/font")));
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")));

//getting datas
app.use(express.static(path.join(__dirname, "data")));

app.use(express.static(path.join(__dirname, "app_modules")));

//setting up page redirection only GET
router.load(app);


app.listen(process.env.PORT || PORT, () => console.log(`App server currently running on port ${PORT}`));