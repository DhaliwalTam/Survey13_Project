var questionNumber = 1;
var today = new Date();
var questionArray = [];
var optionsArray = [];
var options = [];

document.getElementById("createSurvey").addEventListener("submit", preventSubmit);
document.getElementById("expire").addEventListener("blur",validateDate);
document.getElementById("submitButton").addEventListener("click", formConfirmation);
document.getElementById("saveQuestionandOptions").addEventListener("click",addQuestion);
document.getElementById("addOptionButton").addEventListener("click",addOptions);
window.addEventListener("load",function(){
   
    if(today.getMonth()+1 < 10 && today.getDate() < 10){
        document.getElementById("active").setAttribute("min",`${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()}`);
    }

    else if(today.getMonth()+1 < 10 && today.getDate() >= 10){
        document.getElementById("active").setAttribute("min",`${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}`);
    }

    else if(today.getMonth()+1 >= 10 && today.getDate() < 10 ){
        document.getElementById("active").setAttribute("min",`${today.getFullYear()}-${today.getMonth()+1}-0${today.getDate()}`);
    }

    else if(today.getMonth()+1 >= 10 && today.getDate() >= 10 ){
        document.getElementById("active").setAttribute("min",`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
    }

    
    
    if(today.getMonth()+1 < 10 && today.getDate() < 10){
        document.getElementById("expire").setAttribute("min",`${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()}`);
    }

    else if(today.getMonth()+1 < 10 && today.getDate() >= 10){
        document.getElementById("expire").setAttribute("min",`${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}`);
    }

    else if(today.getMonth()+1 >= 10 && today.getDate() < 10 ){
        document.getElementById("expire").setAttribute("min",`${today.getFullYear()}-${today.getMonth()+1}-0${today.getDate()}`);
    }

    else if(today.getMonth()+1 >= 10 && today.getDate() >= 10 ){
        document.getElementById("expire").setAttribute("min",`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
    }


})


function addQuestion(){
    if(document.getElementById("questionInput").value !== ""){
        questionArray.push(document.getElementById("questionInput").value);
        document.getElementById("questionList").value = questionArray;
        document.getElementById("questionInput").value = "";
        optionsArray.push(options);
        questionNumber++;
        document.getElementById(`q`).innerHTML = "";
        document.getElementById("optionList").value = "";
        options = [];
        document.getElementById("questionInput").placeholder = `Enter question ${questionNumber}`;
        document.getElementById("optionInput").placeholder = `Option for question ${questionNumber}`;
    }
    
    else{
        alert("Please enter a question!");
    }
}

function addOptions(){
    var radio = document.createElement("input");
    var label = document.createElement("label");

    if(document.getElementById("questionInput").value !== ""){
        radio.type = "radio";
        radio.name = `answers${questionNumber-1}`;
        radio.id = `question${questionNumber-1}`;
        radio.value = document.getElementById(`optionInput`).value;
        label.innerHTML = `${document.getElementById(`optionInput`).value}`;
        document.getElementById(`q`).appendChild(radio);
        document.getElementById(`q`).appendChild(label);
        document.getElementById(`optionInput`).value = "";
        options.push(label.innerHTML);
        document.getElementById("optionList").value = options; 
        document.getElementById(`q`).innerHTML += "<br>";
    }
    
    else{
        alert("You must add a question before adding options!")
    }

}


function validateDate(){
    const activeDate = new Date(document.getElementById("active").value);
    const expiryDate = new Date(document.getElementById("expire").value);

    if(activeDate > expiryDate){
        alert("Invalid expiry date selected!");
        document.getElementById("expire").value = "";
    }

}

function preventSubmit(e){
    e.preventDefault();
}


function formConfirmation() {
    var title = document.getElementById("surveyTitle").value;
    var active = document.getElementById("active").value;
    var expire = document.getElementById("expire").value;

    if (questionNumber > 2 && title !== "" && active !== "" && expire !== "") {
        fetch('/surveys/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                questionArray: questionArray,
                optionsArray: optionsArray,
                title: title,
                active: active,
                expire: expire
            })
        });

        alert("Your survey has been successfully created!");
        window.location.href = "../surveys/list";

    } else if (questionNumber < 2) {
        alert("You must have at least 2 questions!");
    }

    else if(title == "" || active == "" || expire == ""){
        alert("One or more fields are empty. Please try again!");
    }
}