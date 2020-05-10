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

app.get("/users", (req, res) => {
  const users = readJSONFile('Users');
  if(users != undefined){
    res.status(200).send(users);
  } else {
    res.status(404).send("Nu s-a găsit - users");
  }
});

app.post("/users", (req, res) => {
    const users = readJSONFile('Users');
    var user = {
        username: req.body.username,
        password: req.body.password,
        privilege: req.body.privilege,
        quizP: req.body.quizP,
        quizF: req.body.quizF,
        lastLogin: req.body.lastLogin
    }
    console.log(user);
    if (req.body.type == 'create')
    {
      for (let i = 0; i < users.length; i++)
        if (users[i].username == user.username)
        {
          res.status(409).send(false);
          return ;
        }

      users.push(user);
      writeJSONFile(users, 'Users');
      res.status(200).send(user);
    }
    else if (req.body.type == 'update')
    {
      for (let i = 0; i < users.length; i++)
        if (users[i].username == user.username)
        {
          if (req.body.quizP != undefined)
            users[i].quizP = String(parseInt(users[i].quizP) + req.body.quizP);
          else if (req.body.quizF != undefined)
            users[i].quizF = String(parseInt(users[i].quizF) + req.body.quizF);
          else if (req.body.lastLogin != undefined)
            users[i].lastLogin = req.body.lastLogin;
        }

        writeJSONFile(users, 'Users');
        res.status(200).send(user);
    }
    else if (req.body.type == 'retrive')
    {
      for (let i = 0; i < users.length; i++)
        if (users[i].username == user.username)
        {
          res.status(200).send(users[i]);
          return ;
        }

      res.status(404).send(false);
    }
});

function readJSONFile(optiune) {
	if (optiune == 'Personal')
		return JSON.parse(fs.readFileSync("resources/personal.json"))["personal"];
	else if (optiune == 'Questions')
		return JSON.parse(fs.readFileSync("resources/questions.json"))["questions"];
  else if (optiune == 'Users')
    return JSON.parse(fs.readFileSync("resources/users.json"))["users"];
}

function writeJSONFile(content, optiune) {
  if (optiune == 'Users')
  {
    fs.writeFileSync(
      "resources/users.json",
      JSON.stringify({ users : content }, null, 4),
      "utf8",
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

}

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);
