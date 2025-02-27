const questions = [
    {
        question: "Which data structure follows the LIFO principle?",
        answers: [
            {text: "Queue", correct: false},
            {text: "Stack", correct: true},
            {text: "Linked List", correct: false},
            {text: "Graph", correct: false}
        ]
    },
    {
        question: "Which normal form eliminates transitive dependency?",
        answers: [
            {text: "1NF", correct: false},
            {text: "2NF", correct: false},
            {text: "3NF", correct: true},
            {text: "BCNF", correct: false}
        ]
    },
    {
        question: "Which scheduling algorithm is preemptive?",
        answers: [
            {text: "First-Come, First-Served", correct: false},
            {text: "Round Robin", correct: true},
            {text: "Shortest Job Next", correct: false},
            {text: "Priority Scheduling", correct: false}
        ]
    },
    {
        question: "Which protocol is used for secure communication over the internet?",
        answers: [
            {text: "HTTP", correct: false},
            {text: "FTP", correct: false},
            {text: "HTTPS", correct: true},
            {text: "SMTP", correct: false}
        ]
    },
    {
        question: "Which data structure uses the FIFO principle?",
        answers: [
            {text: "Stack", correct: false},
            {text: "Queue", correct: true},
            {text: "Heap", correct: false},
            {text: "Tree", correct: false}
        ]
    },
    {
        question: "What is the worst-case time complexity of quicksort?",
        answers: [
            {text: "O(n log n)", correct: false},
            {text: "O(n^2)", correct: true},
            {text: "O(n)", correct: false},
            {text: "O(log n)", correct: false}
        ]
    },
    {
        question: "Which SQL clause is used to filter records?",
        answers: [
            {text: "ORDER BY", correct: false},
            {text: "WHERE", correct: true},
            {text: "GROUP BY", correct: false},
            {text: "HAVING", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score ++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex ++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
