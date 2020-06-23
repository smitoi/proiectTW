function title(titlu_text)
{
  console.log('a');
  let titlu = document.getElementById("titlu");
  let text = titlu.innerHTML;
  let dim = text.length / 2;
  text = text.slice(0, dim) + titlu_text[0 + dim] + titlu_text[titlu_text.length - dim - 1] + text.slice(dim, dim.length);
  titlu.innerHTML = text;
  if (text.length != titlu_text.length)
    setTimeout(function() {
        title(titlu_text)
    }, 1000);
}

window.onload = function() {
  title("Școala Best Auto");
}
