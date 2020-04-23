var file;
var questions_total;
var questions_submitted;
var questions_submitted_arr;
var questions_remaining;
var questions_corect;
var questions_wrong;
var question_index;
var answers_selected;
var maxim_wrong;
var delayMs;
var contor;
var timp;
var minute;
var secunde;

function prepare_quiz(optiune) {
    questions = [
      ['Întrebare 1', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1]],
      ['Întrebare 2', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [2]],
      ['Întrebare 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [3], '../images/street1.jpg'],
      ['Întrebare 1 2', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1, 2]],
      ['Întrebare 1 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1, 3]],
      ['Întrebare 2 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [2, 3]],
      ['Întrebare 1 2 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1, 2, 3]],
      ['Întrebare 1', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1]],
      ['Întrebare 2', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [2]],
      ['Întrebare 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [3]],
      ['Întrebare 1 2', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1, 2]],
      ['Întrebare 1 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1, 3]],
      ['Întrebare 2 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [2, 3]],
      ['Întrebare 1 2 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1, 2, 3]],
      ['Întrebare 1', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1], '../images/street2.jpg'],
      ['Întrebare 2', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [2]],
      ['Întrebare 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [3]],
      ['Întrebare 1 2', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1, 2]],
      ['Întrebare 1 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1, 3]],
      ['Întrebare 2 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [2, 3]],
      ['Întrebare 1 2 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1, 2, 3]],
      ['Întrebare 1', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1]],
      ['Întrebare 2', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [2]],
      ['Întrebare 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [3]],
      ['Întrebare 1 2', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1, 2]],
      ['Întrebare 1 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1, 3]],
      ['Întrebare 2 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [2, 3]],
      ['Întrebare 1 2 3', 'Răspuns 1', 'Răspuns 2', 'Răspuns 3', [1, 2, 3]]
  ];

  if (optiune == 1)
  {
    maxim_wrong = 4;
    questions_total = 20;
    delayMs = 1800000;
    minute = 30;
    secunde = 0;
  }
  else if (optiune == 2)
  {
    questions_total = 26;
    maxim_wrong = 5;
    delayMs = 1800000;
    minute = 30;
    secunde = 0;
  }
  else if (optiune == 3)
  {
    questions_total = 5;
    maxim_wrong = 1;
    delayMs = 10000;
    minute = 0;
    secunde = 10;
  }

  contor = setTimeout(function(){ end_quiz("time") }, delayMs);
  timer();
  timp = setInterval(function(){ timer(); }, 1000);

  questions_remaining = questions_total;
  questions_submitted_arr = [];
  questions_submitted = 0;
  questions_corect = 0;
  questions_wrong = 0;
  question_index = 1;
  answers_selected = [];

  var butoane = document.getElementsByClassName("quiz-prepare");
  butoane[0].style.display = "none";
  var butoane = document.getElementsByClassName("rezultat");
  butoane[0].style.display = "none";
  var butoane = document.getElementsByClassName("quiz");
  butoane[0].style.display = "block";
  document.getElementById("RQ").innerHTML = questions_remaining;
  document.getElementById("CQ").innerHTML = questions_corect;
  document.getElementById("WQ").innerHTML = questions_wrong;
  load_question();
}

function timer()
{
  document.getElementById("RT").innerHTML = "";
  if (minute < 10)
    document.getElementById("RT").innerHTML += "0" + minute;
  else
    document.getElementById("RT").innerHTML += minute;

  document.getElementById("RT").innerHTML += ":";

  if (secunde < 10)
    document.getElementById("RT").innerHTML += "0" + secunde;
  else
    document.getElementById("RT").innerHTML += secunde;

  secunde -= 1;
  if (secunde < 0)
    if (minute != 0)
    {
      minute -= 1;
      secunde = 59;
    }
}

function mark_question(optiune)
{
  document.getElementById(optiune).style.color = "white";
  document.getElementById(optiune).style.backgroundColor = "#40476d";

  if (optiune == "buton1")
    if (answers_selected.includes(1) == false)
      answers_selected.push(1);
  if (optiune == "buton2")
    if (answers_selected.includes(2) == false)
      answers_selected.push(2);
  if (optiune == "buton3")
    if (answers_selected.includes(3) == false)
      answers_selected.push(3);
}

function end_quiz(why)
{
  let rezultat = document.getElementsByClassName("rezultat")[0];
  rezultat.style.display = "block";
  if (why == "time")
  {
    rezultat.style.color = "#940f0f";
    rezultat.innerHTML = "REZULTAT: Timpul a expirat, ai picat!";
    alert("Timpul a expirat!");
  }
  else {
    clearTimeout(contor);
    if (questions_wrong >= maxim_wrong)
    {
      rezultat.style.color = "#940f0f";
      rezultat.innerHTML = "REZULTAT: Ai picat cu " + questions_corect + '/' + questions_total + '.';
      alert("Ai picat cu " + questions_corect + '/' + questions_total + '.');

    }
    else if (questions_remaining == 0)
    {
      rezultat.style.color = "#0f9442";
      rezultat.innerHTML = "REZULTAT: Ai luat sala cu " + questions_corect + '/' + questions_total + '.';
      alert("Ai luat sala cu " + questions_corect + '/' + questions_total + '.');
    }
  }
  clearInterval(timp);
  clearTimeout(contor);
  var butoane = document.getElementsByClassName("quiz-prepare");
  butoane[0].style.display = "flex";
  var butoane = document.getElementsByClassName("quiz");
  butoane[0].style.display = "none";
}

function load_question()
{
  delete_answers();
  document.getElementById("RQ").innerHTML = questions_remaining;
  document.getElementById("CQ").innerHTML = questions_corect;
  document.getElementById("WQ").innerHTML = questions_wrong;
  if (questions[question_index - 1].length == 6)
  {
    var mq = window.matchMedia( "(max-width: 768px)" );
    document.getElementsByClassName("quiz-image")[0].style.display = "block";

    if (mq.matches) {
      document.getElementsByClassName("quiz-buttons")[0].style.width = "100%";
      document.getElementsByClassName("quiz-buttons")[0].style.justifyContent = "space-around";
      document.getElementsByClassName("quiz-image")[0].style.width = "100%";
      document.getElementsByClassName("quiz-image")[0].style.marginTop = "4%";
    }
    else {
      document.getElementsByClassName("quiz-buttons")[0].style.width = "60%";
      document.getElementsByClassName("quiz-buttons")[0].style.justifyContent = "flex-start";
      document.getElementsByClassName("quiz-image")[0].style.width = "30%";
    }
    document.getElementById("qimage").src = "images/" + questions[question_index - 1][5];
  }
  else {
    document.getElementsByClassName("quiz-buttons")[0].style.width = "100%";
    document.getElementsByClassName("quiz-image")[0].style.display = "none";
    document.getElementById("qimage").src = "";
  }
  document.getElementById("question").innerHTML = question_index + ". " + questions[question_index - 1][0];
  document.getElementById("buton1").innerHTML = questions[question_index - 1][1];
  document.getElementById("buton2").innerHTML = questions[question_index - 1][2];
  document.getElementById("buton3").innerHTML = questions[question_index - 1][3];
}

function verify_answers()
{
  if (answers_selected.length != 0)
  {
    questions_remaining -= 1;
    if (JSON.stringify(answers_selected.sort()) == JSON.stringify(questions[question_index - 1][4].sort()))
    {
      questions_corect += 1;
      questions_submitted_arr.push(question_index);
    }
    else
    {
      questions_wrong += 1;
      questions_submitted_arr.push(question_index);
    }
    if (questions_remaining == 0 || questions_wrong >= maxim_wrong)
    {
      load_question();
      setTimeout(end_quiz(""), 1000);
    }

    else
      skip_question();
  }
}

function delete_answers()
{
  optiuni = ["buton1", "buton2", "buton3"]
  for (optiune of optiuni)
  {
    document.getElementById(optiune).style.color = "#40476d";
    document.getElementById(optiune).style.backgroundColor = "white";
  }
  answers_selected = [];
}

function skip_question()
{
  question_index += 1;
  if (question_index > questions_total)
    question_index = question_index % questions_total;
  while (questions_submitted_arr.includes(question_index))
  {
    question_index += 1;
    if (question_index > questions_total)
      question_index = question_index % questions_total;
  }
  load_question();
}

window.onload = function () {
  var butoane = document.getElementsByClassName("quiz");
  butoane[0].style.display = "none";
  document.getElementById("skip_intrebare").addEventListener("click", () => {
      skip_question();
  });
  document.getElementById("buton1").addEventListener("click", () => {
    mark_question("buton1");
  });
  document.getElementById("buton2").addEventListener("click", () => {
    mark_question("buton2");
  });
  document.getElementById("buton3").addEventListener("click", () => {
    mark_question("buton3");
  });
  document.getElementById("sterge_rasp").addEventListener("click", () => {
    delete_answers();
  });
  document.getElementById("trimite_rasp").addEventListener("click", () => {
    verify_answers();
  });
}
