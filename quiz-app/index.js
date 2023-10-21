let questions = [];

const questionElem = document.getElementById("question");
const answers = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

var currQuesIndex = 0;
let score = 0;


function resetState() {
    nextButton.style.display = "none";
    while(answers.firstChild){
        answers.removeChild(answers.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;  // increment score counter
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answers.children).forEach(answer => {
        if(answer.dataset.correct === "true")
            answer.classList.add("correct");
        answer.disabled = true;
    });

    nextButton.style.display = "block";
    
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currQuesIndex];
    let questionNo = currQuesIndex + 1;
    questionElem.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        answers.appendChild(button);
    })

}

function nextQuestion(){
    if(nextButton.innerHTML === "Next"){
        if(++currQuesIndex < questions.length){
            nextButton.innerHTML = "Next";
            showQuestion();
        }
        else{
            while(answers.firstChild){
                answers.removeChild(answers.firstChild);
            }
            questionElem.innerHTML = `You scored ${score} out of ${questions.length}!`
            nextButton.innerHTML = "Restart Quiz";
        }
    }else if(nextButton.innerHTML === "Restart Quiz"){
        startQuiz();
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function startQuiz(){
    fetch(`https://opentdb.com/api.php?amount=4`)
    .then(response => response.json())
    .then(data => {
        questions = data.results.map(question => {
            const answers = [
              {
                text: question.correct_answer,
                correct: true,
              },
              ...question.incorrect_answers.map(incorrectAnswer => ({
                text: incorrectAnswer,
                correct: false,
              })),
            ];
          
            return {
              question: question.question,
              answers: shuffleArray(answers),
            };
          });
          
        currQuesIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    })
}



startQuiz();