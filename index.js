const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const fs = require("fs");
const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.get("/personal", (req, res) => {
  const personal = readJSONFile('Personal');
  if (personal != undefined){
    res.status(200).send(personal);
  } else {
      res.status(404).send("Nu s-a găsit - personal.");
  }
});

app.get("/questions", (req, res) => {
  const questions = readJSONFile('Questions');
  if (questions != undefined){
    res.status(200).send(questions);
  } else {
      res.status(404).send("Nu s-a găsit - questions.");
  }
});

function readJSONFile(optiune) {
	if (optiune == 'Personal')
		return JSON.parse(fs.readFileSync("resources/personal.json"))["personal"];
	else if (optiune == 'Questions')
		return JSON.parse(fs.readFileSync("resources/questions.json"))["questions"];
}

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);