//https://opentdb.com/api.php?amount=
//https://opentdb.com/api_category.php
let container = document.getElementById("container")
let form_container = document.getElementById("form-container")
let form = document.getElementById("form")
let score = document.getElementById("score")
const categoria = document.getElementById("categoria")
let question;
let q = 0 ;
let s = 0;
let correctAnswer;


//Categorias


const categoriasUrl = async () => {
    try {
        const res = await fetch("https://opentdb.com/api_category.php");
        const r1= await res.json();
        const url = r1.trivia_categories
        categoriasPush(url);
        
    } catch (error) {
        console.log(error);
    } 
}

const categoriasPush = url => {
for (const key in url) {
        categoria.innerHTML+= `<option value="${key}">${url[key].name}</option>`;
    }
}



//Obtener preguntas


const ApiUrl = e =>{
    e.preventDefault();
    const dificultad = document.getElementById("dificultad").value;
    let dificultad2 = ""
    tipo = document.getElementById("tipo").value
    let tipo2 = ""
    let cat = ""
    let questions = document.getElementById("questions").value;
    if (dificultad != 0) {
        dificultad2 = "&difficulty=" + dificultad ; 
    } 
    if (categoria.value != "x") {
        cat = "&category=" + categoria.value 
    }
    if (tipo != 0) {
        tipo2 = "&type=" + tipo ;
    }
    let url = `https://opentdb.com/api.php?amount=${questions}${cat}${dificultad2}${tipo2}`
    console.log(url)
    fetchUrl(url);
}
const fetchUrl = async url =>{  
    try {
    const res = await fetch(url);
    const r1 = await res.json();
    middle(r1.results);    
    } catch (error) {
        console.log(error);
    }
}
const middle = questionsApi => {
    questions = questionsApi;
    fill();
}
const fill = () => {
    correctAnswer = questions[q].correct_answer;

    if (questions[q].incorrect_answers.length > 1) {
        console.log(questions[q])
        let r1 = questions[q].correct_answer;
        let r2 = questions[q].incorrect_answers[0]
        let r3 = questions[q].incorrect_answers[1]
        let r4 = questions[q].incorrect_answers[2]
        let respuestas = [r1, r2, r3, r4]
        var i,j,k;
        for (i = respuestas.length; i; i--) {
            j = Math.floor(Math.random() * i);
            k = respuestas[i - 1];
            respuestas[i - 1] = respuestas[j];
            respuestas[j] = k;
        }
      form_container.innerHTML = `
      <div>
        <h4>${questions[q].question}</h4>
        <ul>
          <li><button onClick="handleCheckAnswer(this)">${
            respuestas[0]
          }</button></li>
          <li><button onClick="handleCheckAnswer(this)"> ${
            respuestas[1]
          }</button></li>
          <li><button onClick="handleCheckAnswer(this)">${
            respuestas[2]
          }</button></li>
          <li><button onClick="handleCheckAnswer(this)">${
            respuestas[3]
          }</button></li>
  
      </ul>
      </div>
    `;
    } else {
        let r1 = questions[q].correct_answer;
        let r2 = questions[q].incorrect_answers[0];
        if (r1 === "True") {
            form_container.innerHTML = `
            <div>
              <h4>${questions[q].question}</h4>
              <ul>
                <li><button onClick="handleCheckAnswer(this)">${
                  r1
                }</button></li>
                <li><button onClick="handleCheckAnswer(this)"> ${
                  r2
                }</button></li>
            </ul>
            </div>
          `;
        } else {
            form_container.innerHTML = `
            <div>
              <h4>${questions[q].question}</h4>
              <ul>
                <li><button onClick="handleCheckAnswer(this)">${
                  r2
                }</button></li>
                <li><button onClick="handleCheckAnswer(this)"> ${
                  r1
                }</button></li>
            </ul>
            </div>
          `;
        }
    }
  };
  
  const handleCheckAnswer = button => {
    if (button.innerText === correctAnswer) {
      s++;
      score.innerText = s
      console.log("Correcto");
    } else {
      console.log("Incorrecto");
    }
    console.log(questions)
    if (questions.length - 1 !== q) {
      q++;
      console.log(q)
      fill();
    } else {
        form_container.innerHTML = 
        `<h3>Juego terminado</h3>
        <h2>Puntuación: ${s}</h2>`
    }
}

//

form.onsubmit = ApiUrl
document.addEventListener("DOMContentLoaded", categoriasUrl);