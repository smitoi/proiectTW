var eroare;

function verify(user, pass)
{
  return ((user.includes(" ") && pass.includes(" ")) ||
  user == "" || pass == "");
}

function try_login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (verify(user, pass))
  {
    console.log("CEVA");
    eroare.style.color = 'red';
    eroare.innerHTML = "Numele și parola sunt invalide (conțin spații).";
    return ;
  }

  fetch('http://localhost:3000/users', {
    method: 'get'
  }).then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return ;
      }
      response.json().then(function(data) {
        let contCorect = false;

        for (let i = 0; i < data.length; i++) {
          if (user == data[i].username) {
            if (pass == data[i].password)
            {
              contCorect = true;
              break;
            }
            else {
              break;
            }
          }
        }

        if (contCorect == 1) {
          eroare.style.color = 'green';
          eroare.innerHTML = "Contul este corect. Veți fi redirecționat.";
          document.getElementById("username").readOnly = true;
          document.getElementById("password").readOnly = true;
          return ;
        }
        else {
          eroare.style.color = 'red';
          if (!localStorage.getItem('incercari'))
            localStorage.setItem('incercari', 1);
          else {
            let aux = localStorage.getItem('incercari');
            if (aux < 2) {
              aux = parseInt(aux) + 1;
              localStorage.setItem('incercari', aux);
            }
            else {
              document.getElementById("username").readOnly = true;
              document.getElementById("password").readOnly = true;
              setTimeout(function() {
                document.getElementById("username").readOnly = false;
                document.getElementById("password").readOnly = false;
                localStorage.setItem('incercari', 0);
              },
               5000);
            }
          }
          eroare.innerHTML = "Numele sau parola sunt incorecte.";
        }
    });
  })
}

function register() {
  if (localStorage.getItem('inregistrat'))
  {
    eroare.style.color = 'red';
    eroare.innerHTML = "S-a găsit un cont înregistrat pe acest browser.";
    return ;
  }

  if (verify(user, pass))
  {
    console.log("CEVA");
    eroare.style.color = 'red';
    eroare.innerHTML = "Numele și parola sunt invalide (conțin spații).";
    return ;
  }

  var newUser = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  }

  fetch('http://localhost:3000/users', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  }).then(function(response) {
    if (response.status == 409) {
      eroare.style.color = 'red';
      eroare.innerHTML = "Există deja un cont cu numele acesta.";
    }
    else if (response.status == 200)
    {
      localStorage.setItem('inregistrat', true);
      eroare.innerHTML = "Contul a fost creat cu succes.";
      eroare.style.color = 'green';
    }
  })
}

window.onload = function() {
  eroare = document.getElementById('eroare');
  if (localStorage.getItem('inregistrat'))
  {
    eroare.style.color = 'red';
    eroare.innerHTML = "S-a găsit un cont înregistrat pe acest browser.";
  }

  document.getElementById("login").addEventListener("click", () => {
      try_login();
  });

  document.getElementById("register").addEventListener("click", () => {
      register();
  });
}
