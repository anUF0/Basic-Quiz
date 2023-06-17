//Docement selector variables
var timerElement = document.getElementById("timer-count");
const questionElement = document.getElementById("question");
const answerBtnElement = document.getElementById("answer-btn");
const nextBtnElement = document.getElementById("next-btn");

var currentQuestionIndex = 0;
var score = 0;
var completed= false;
var timerVal;
var timerCount = 5;


//Function for intial confirm
function init(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtnElement.innerHTML= "Next Question";
    completed= false;
    timerVal = setInterval(countdown, 1000);
    showQuestion();
    countdown();
};

function countdown(){
    timerCount--;
    timerElement.textContent = timerCount;
    if(timerCount <= 0)
    showScore();
}

//Storage of the displayed questions
var questionList = [
    {question:"What armament does a Vindicator Seige Tank have?",
    answers: [
        {text: "Demolister Cannon", correct: true},
        {text: "Heavy Stubber", correct: false},
        {text: "Beam Rifle", correct: false},
        {text: "Pink Programming Socks", correct: false},
    ]   
}, {question:"What main armament does a Predator Annhilator have?",
answers: [
    {text: "Magetsu Railgun", correct: false},
    {text: "Multi-Melta", correct: false},
    {text: "Twin-linked Lascannon", correct: true},
    {text: "Pink Programing Socks", correct: false},
]
}, {question:"What armament does a Vindicator Seige Tank have?",
answers: [
    {text: "Demolister Cannon", correct: true},
    {text: "Heavy Stubber", correct: false},
    {text: "Beam Rifle", correct: false},
    {text: "Vulkan Bolter", correct: false},
]
},{question:"What main armament does a Predator Annhilator have?",
answers: [
    {text: "Magetsu Railgun", correct: false},
    {text: "Multi-Melta", correct: false},
    {text: "Twin-linked Lascannon", correct: true},
    {text: "Pink Programing Socks", correct: false},
]
},
];


//Displays questions from above list
function showQuestion(){
    resetFields()
    var currentQuestion = questionList[currentQuestionIndex];
    var questionNum = currentQuestion +1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

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
    nextBtnElement.style.display ="block";
}

//TODO FIX TIMEOUT timerElement is not being stored as a number
function showScore(){
    resetFields();
    clearInterval(timerVal)
    timerVal = timerElement.value; 
    if(timerVal = 0){
        questionElement.innerHTML = "TIMED OUT! You scored "+ score + " out of 4"
    }else
    {questionElement.innerHTML = "You scored "+ score + " out of 4 in " + timerVal + "!";}
    nextBtnElement.innerHTML = "Try again?";
    nextBtnElement.style.display = "block";
}



function handleNextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questionList.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtnElement.addEventListener('click', ()=>{
    if(currentQuestionIndex < questionList.length){
        handleNextbutton();
    }else{
        init()
    }
})

//Calling Initialisation
init();