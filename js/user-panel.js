if (!localStorage.getItem('username'))
  window.location.href = 'utilizatori.html';


function updateLastLogin() {
  let dat = new Date();
  let data = "";

  if (dat.getDate() < 10)
    data = "0" + dat.getDate();
  else
    data = dat.getDate();
    if ((dat.getMonth() + 1) < 10)
      data += "/0" + (dat.getMonth() + 1);
    else
      data += "/" + (dat.getMonth() + 1);
  data += "/" + dat.getFullYear()  + " - ";
  if (dat.getHours() < 10)
    data += "0" + dat.getHours();
  else
    data += dat.getHours();
  if (dat.getMinutes() < 10)
    data += ":0" + dat.getMinutes();
  else
    data += ":" + dat.getMinutes();
  if (dat.getSeconds() < 10)
    data += ":0" + dat.getSeconds();
  else
    data += ":" + dat.getSeconds();

  var userUpdate = {
    username: localStorage.getItem('username'),
    lastLogin: data
  }

  fetch('http://localhost:3000/users', {
    method: "put",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userUpdate)
  }).then(function(response) {})
}

function loadPage() {
  let buttons = document.getElementById("user-buttons");
  let userRetrive = {
    username: localStorage.getItem('username')
  };
  fetch('http://localhost:3000/users/' + localStorage.getItem('username'), {
    method: "get",
    headers: {
        'Content-Type': 'application/json'
    },
  }).then(function(response) {
    return response.json();
  }).then((json) => {
    if (json.privilege == 'user') {
      let quizP = json.quizP;
      let quizF = json.quizF;
      let login = json.lastLogin;
      let panel = document.getElementById("user-stats");
      let element;

      element = document.createElement("p");
      element.style.color = 'black';
      element.innerHTML = "Bun venit în contul tău, " + json.username + ".";
      element.style.fontSize = "18px";
      panel.appendChild(element);

      element = document.createElement("p");
      element.style.color = 'blue';
      element.innerHTML = "Statisticile tale:";
      element.style.margin = "0.1%";
      panel.appendChild(element);

      element = document.createElement("p");
      element.style.color = 'green';
      element.innerHTML = "Ai trecut " + quizP + " teste de legislație.";
      element.style.margin = "0.1%";
      panel.appendChild(element);

      element = document.createElement("p");
      element.style.color = 'red';
      element.innerHTML = "Ai picat " + quizF + " teste de legislație.";
      element.style.margin = "0.1%";
      panel.appendChild(element);

      element = document.createElement("p");
      element.style.color = "black";
      element.innerHTML = "Ultimul login a avut loc la  " + login + ".";
      element.style.margin = "0.1%";
      panel.appendChild(element);

      element = document.createElement("button");
      element.innerHTML = "Începe test <i class=\"fa fa-question-circle\"></i>";
      element.classList.add("blue-btn");
      element.id = "quiz";
      buttons.appendChild(element);

      document.getElementById("quiz").addEventListener("click", () => {
        quiz();
      });
    }
    else if (json.privilege == 'admin')
    {
      let login = json.lastLogin;
      let panel = document.getElementById("user-stats");
      let element;

      element = document.createElement("p");
      element.style.color = 'black';
      element.innerHTML = "Bun venit în contul tău de administrator, " + json.username + ".";
      element.style.fontSize = "18px";
      element.style.marginBottom = "0.1%";
      panel.appendChild(element);

      element = document.createElement("p");
      element.style.color = "black";
      element.innerHTML = "Ultimul login a avut loc la  " + login + ".";
      element.style.marginTop = "0.1%";
      panel.appendChild(element);

      element = document.createElement("p");
      element.style.color = 'black';
      element.innerHTML = "Statisticile utilizatorilor:";
      element.style.margin = "0.1%";
      panel.appendChild(element);

      fetch('http://localhost:3000/users').then(function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
          }
          response.json().then(function(data) {
            let users = data;
            let quizS = [0, 0];
            for (var i = 0; i < users.length; i++)
            {
              quizS[0] += parseInt(users[i]['quizP']);
              quizS[1] += parseInt(users[i]['quizF']);
            }

            element = document.createElement("p");
            element.style.color = 'blue';
            element.innerHTML = "S-au realizat " + (quizS[0] + quizS[1]) + " teste de legislație.";
            element.style.margin = "0.1%";
            panel.appendChild(element);

            element = document.createElement("p");
            element.style.color = 'green';
            element.innerHTML = "Din ele, " + quizS[0] + " sunt trecute.";
            element.style.margin = "0.1%";
            panel.appendChild(element);

            element = document.createElement("p");
            element.style.color = 'red';
            element.innerHTML = "Restul de " + quizS[1] + " sunt picate.";
            element.style.margin = "0.1%";
            panel.appendChild(element);
        });
      })
    }

    element = document.createElement("button");
    element.innerHTML = "Log out <i class='fa fa-sign-out'></i>";
    element.classList.add("red-btn");
    element.id = "logout";
    buttons.appendChild(element);
    document.getElementById("logout").addEventListener("click", () => {
      logout();
    });

    if (json.privilege == 'user') {
      element = document.createElement("button");
      element.innerHTML = "Delete account <i class='fa fa-trash'></i>";
      element.classList.add("red-btn");
      element.id = "delete";
      buttons.appendChild(element);

      document.getElementById("delete").addEventListener("click", () => {
        deleteAcc();
      });
    }

  })
}

function quiz() {
  window.location.href = 'quiz.html';
}

function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  localStorage.removeItem('privilege');
  window.location.href = 'utilizatori.html';
}

function deleteAcc() {
  fetch('http://localhost:3000/users/' + localStorage.getItem('username'), {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        logout();
    })
}

window.onload = function() {

  updateLastLogin();
  loadPage();
}
