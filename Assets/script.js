//Docement selector variables
var timerElement = document.querySelector(".timer-count");
var timer;
var timerCount;
var questionElement = document.getElementById("question");
var answerBtnElement = document.getElementById("answer-btn");
var nextBtnElement = document.getElementById("next-btn");
var currentQuestionIndex = 0;
var score = 0;
var timeFinal = 'Error';


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

//Function for intial confirm
function init(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtnElement.innerHTML= "Next";
    showQuestion();
}

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

//Timer
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
    }, 1000);
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

function showScore(){
    resetFields();
    questionElement.innerHTML = 'You scored ${score} out of 4!';
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