const question=[
    {
        question: "مساحة على الطريق رسمت بداخلها خطوط بيضاء مائلة على صورة جزيرة سير تعني ",
        aswers:[
            {text:"أنك تقترب من مفترق طرق",correct:false},
            {text:"مساحة ممنوع المركبات السير عليها",correct:true},
            {text:"موقف خاص للمركبات",correct:false},
            {text:"ممر مخصص لعبور المشاة",correct:false},
        ]
    },
    {
        question: "يجب التاكد من مستوى الماء المقطر في البطارية",
        aswers:[
            {text:"كل يوم",correct:false},
            {text:"مرة في الشهر",correct:false},
            {text:"مرة في الاسبوع",correct:true},
            {text:"عند تشحيم المركبة",correct:false},
        ]
    },
   
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("NextBtn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
     currentQuestionIndex=0;
     score=0;
     nextButton.innerHTML="Next";
     showQuestion();
}
function showQuestion(){
    resetState();
        let currentQuestion=question[currentQuestionIndex]
        let questionNo=currentQuestionIndex+1;
        questionElement.innerHTML=questionNo+". "+currentQuestion.question;

        currentQuestion.aswers.forEach(answer=>{
            const button=document.createElement("button");
            button.innerHTML=answer.text;
            button.classList.add("btn1");
            answerButtons.appendChild(button);
            if(answer.correct){
                button.dataset.correct= answer.correct;
            }
            button.addEventListener("click",selectAnswer);
        });

}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    })
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML= `your score ${score} out of ${question.length}!`;
    nextButton.innerHTML="again"
    nextButton.style.display="block"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();

