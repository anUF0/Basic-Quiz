//Docement selector variables
var timerElement = document.getElementById("timer-count");
const questionElement = document.getElementById("question");
const answerBtnElement = document.getElementById("answer-btn");
const nextBtnElement = document.getElementById("next-btn");

var currentQuestionIndex;
var score = 0;
var completed= false;
var timerVal;
var timerCount;
var initials;


//Function for intial confirm
function init(){
    currentQuestionIndex = 0;
    timerCount= 15;
    score = 0;
    console.log('garland')
};


function startQuiz(){
completed= false;
timerVal = setInterval(countdown, 1000);
showQuestion();
countdown();
}

function countdown(){
    timerCount--;
    timerElement.textContent = timerCount;
    if(timerCount <= 0){
    timeOut()
    }
    console.log('cherry')
}

//Storage of the displayed questions
const questionList = [
    {question:"Q.1 What style should one's Programmer socks be?",
    answers: [
        {text: "Striped Cotton", correct: true},
        {text: "Nylon", correct: false},
        {text: "Lace", correct: false},
        {text: "Plain Cotton", correct: false},
    ]   
}, {question:"Q.2 Where on the leg shoule one's Programmer socks come up to?",
answers: [
    {text: "Ankle", correct: false},
    {text: "Calf", correct: false},
    {text: "Knee", correct: true},
    {text: "Mid-Thigh", correct: false},
]
}, {question:" Q.3 Which Coding Language is best learned in the comfort of programming socks?",
answers: [
    {text: "javascript", correct: false},
    {text: "C++", correct: true},
    {text: "Python", correct: false},
    {text: "html", correct: false},
]
},{question:"Q.4 What is the best colour for comfortable programming socks?",
answers: [
    {text: "Cyan", correct: false},
    {text: "Pink", correct: true},
    {text: "RGB", correct: false},
    {text: "Black", correct: false},
]
},
];


//Displays questions from above list
function showQuestion(){
    resetFields()
    var currentQuestion = questionList[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtnElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
//Clears previous question and intial placeholder buttons
function resetFields(){
    nextBtnElement.style.display = "none";
    while(answerBtnElement.firstChild){
        answerBtnElement.removeChild(answerBtnElement.firstChild);
    }
}

//Answer Checker
function selectAnswer(event){
    var selectedBtn = event.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtnElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    //Makes the "next" button reappear
    nextBtnElement.innerHTML = "Next Question";
    nextBtnElement.style.display ="block";
}

//TODO FIX TIMEOUT timerElement is not being stored as a number
function showScore(){
    resetFields();
    clearInterval(timerVal);
    let initials = "P.v.R"
    questionElement.innerHTML = "You scored "+ score + " out of 4";
    nextBtnElement.innerHTML = "Reckon you can do better?";
    nextBtnElement.style.display = "block";
    localStorage.setItem("High score", [initials + " got " + score + " out of 4"])
}

function timeOut(){
    resetFields();
    let initials = "P.v.R"
    clearInterval(timerVal)
    currentQuestionIndex = questionList.length
    questionElement.innerHTML = "TIMED OUT! But you got "+ score + " out of 4 correct!"
    nextBtnElement.innerHTML = "Try again?";
    nextBtnElement.style.display = "block";
    localStorage.setItem("Times Out", [initials + " ran out of time"])
}

function handleNextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questionList.length){
        showQuestion();
    }
    else{
        showScore();
    }

}

nextBtnElement.addEventListener('click', ()=>{
    if(nextBtnElement.innerHTML === 'Click here to start'){
    startQuiz()
    }
    else if(currentQuestionIndex < questionList.length){
    handleNextbutton();
    }
    else{
        location.reload();
    }
})

//Calling Initialisation
init();