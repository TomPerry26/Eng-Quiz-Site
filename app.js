const quizData = [
  {
    id: "daily-routines",
    title: "Daily Routines",
    level: "A1",
    description: "Basic present simple actions.",
    questions: [
      {
        prompt: "Which sentence is correct?",
        options: [
          "He go to school every day.",
          "He goes to school every day.",
          "He going to school every day.",
          "He gone to school every day.",
        ],
        answer: 1,
        explanation:
          "For he/she/it in present simple, add -s: 'He goes to school every day.'",
      },
      {
        prompt: "Choose the best answer: 'I ___ breakfast at 7:00.'",
        options: ["have", "has", "having", "am have"],
        answer: 0,
        explanation:
          "Use the base verb 'have' with I/you/we/they in present simple.",
      },
    ],
  },
  {
    id: "food-vocabulary",
    title: "Food & Vocabulary",
    level: "A2",
    description: "Words for meals, drinks, and snacks.",
    questions: [
      {
        prompt: "Which is a countable noun?",
        options: ["water", "rice", "apple", "bread"],
        answer: 2,
        explanation:
          "'Apple' is countable (one apple, two apples). The others are usually uncountable.",
      },
      {
        prompt: "Choose the correct sentence.",
        options: [
          "I need many bread.",
          "I need some bread.",
          "I need a breads.",
          "I need an bread.",
        ],
        answer: 1,
        explanation:
          "Use 'some' with uncountable nouns like bread. We usually do not say 'many bread'.",
      },
    ],
  },
  {
    id: "workplace-english",
    title: "Workplace English",
    level: "B1",
    description: "Useful phrases for meetings and email.",
    questions: [
      {
        prompt: "Pick the most polite phrase.",
        options: [
          "Send me the file now.",
          "Could you send me the file, please?",
          "You must send me the file.",
          "Give file.",
        ],
        answer: 1,
        explanation:
          "'Could you...please?' is a polite form commonly used in professional communication.",
      },
    ],
  },
  {
    id: "mixed-grammar",
    title: "Mixed Grammar Challenge",
    level: "B2",
    description: "Advanced grammar choices in context.",
    questions: [
      {
        prompt: "Complete the sentence: 'By the time we arrived, the film ___.'",
        options: ["started", "has started", "had started", "was starting"],
        answer: 2,
        explanation:
          "Past perfect ('had started') shows the film started before another past action.",
      },
    ],
  },
];

const carousel = document.getElementById("quiz-carousel");
const quizTitle = document.getElementById("quiz-title");
const quizLevel = document.getElementById("quiz-level");
const questionCounter = document.getElementById("question-counter");
const questionText = document.getElementById("question-text");
const optionList = document.getElementById("option-list");
const feedbackBox = document.getElementById("feedback-box");
const resultText = document.getElementById("result-text");
const explanationText = document.getElementById("explanation-text");
const nextButton = document.getElementById("next-question");
const backHomeButton = document.getElementById("back-home");

let activeQuiz = null;
let questionIndex = 0;

function navigateTo(pageId) {
  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active-page"));
  document.getElementById(pageId).classList.add("active-page");

  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.target === pageId);
  });
}

function renderCarousel() {
  carousel.innerHTML = "";

  quizData.forEach((quiz) => {
    const card = document.createElement("article");
    card.className = "quiz-card";
    card.innerHTML = `
      <span class="level-pill">${quiz.level}</span>
      <h3>${quiz.title}</h3>
      <p>${quiz.description}</p>
    `;
    card.addEventListener("click", () => startQuiz(quiz.id));
    carousel.appendChild(card);
  });
}

function startQuiz(quizId) {
  activeQuiz = quizData.find((quiz) => quiz.id === quizId);
  questionIndex = 0;
  navigateTo("quiz-play");
  showQuestion();
}

function showQuestion() {
  if (!activeQuiz) return;

  const question = activeQuiz.questions[questionIndex];
  quizTitle.textContent = activeQuiz.title;
  quizLevel.textContent = activeQuiz.level;
  questionCounter.textContent = `Question ${questionIndex + 1} of ${activeQuiz.questions.length}`;
  questionText.textContent = question.prompt;
  feedbackBox.className = "feedback-box hidden";

  optionList.innerHTML = "";

  question.options.forEach((option, idx) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(idx));
    optionList.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  const question = activeQuiz.questions[questionIndex];
  const optionButtons = [...document.querySelectorAll(".option-button")];

  optionButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === question.answer) {
      btn.classList.add("correct");
    }
  });

  const isCorrect = selectedIndex === question.answer;
  if (!isCorrect) {
    optionButtons[selectedIndex].classList.add("incorrect");
  }

  feedbackBox.className = `feedback-box ${isCorrect ? "correct" : "incorrect"}`;
  resultText.textContent = isCorrect ? "✅ Correct" : "❌ Incorrect";
  explanationText.textContent = question.explanation;

  nextButton.textContent =
    questionIndex === activeQuiz.questions.length - 1 ? "Restart Quiz" : "Next Question";
}

nextButton.addEventListener("click", () => {
  if (!activeQuiz) return;

  if (questionIndex === activeQuiz.questions.length - 1) {
    questionIndex = 0;
  } else {
    questionIndex += 1;
  }

  showQuestion();
});

backHomeButton.addEventListener("click", () => navigateTo("home"));

document.querySelectorAll(".menu-item").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    navigateTo(targetId);
  });
});

document.getElementById("carousel-left").addEventListener("click", () => {
  carousel.scrollBy({ left: -260, behavior: "smooth" });
});

document.getElementById("carousel-right").addEventListener("click", () => {
  carousel.scrollBy({ left: 260, behavior: "smooth" });
});

renderCarousel();
