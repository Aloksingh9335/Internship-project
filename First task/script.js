const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Python", correct: false },
      { text: "C", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Java", correct: false }
    ]
  },
  {
    question: "Who is the founder of Microsoft?",
    answers: [
      { text: "Steve Jobs", correct: false },
      { text: "Bill Gates", correct: true },
      { text: "Mark Zuckerberg", correct: false },
      { text: "Elon Musk", correct: false }
    ]
  }
];

const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextBtn.style.display = "inline-block";
}

function showScore() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.innerText = `${score} / ${questions.length}`;
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

restartBtn.addEventListener("click", startQuiz);

startQuiz();
