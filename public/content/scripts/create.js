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
document.getElementById("questionFormat").addEventListener("change",addDefaultOptions);
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

    document.getElementById("questionFormat").selectedIndex = "-1";

})


function addQuestion(){
    if(document.getElementById("questionFormat").selectedIndex == "-1"){
        alert("Please select a question format!");
    }
    
    
    else if(document.getElementById("questionInput").value !== ""){
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
        addDefaultOptions();
    }
    
    else{
        alert("Please enter a question!");
    }
}

function addDefaultOptions(){
    if(document.getElementById("questionFormat").value === "yesNo" && options.length == 0){
        var radioYes,radioNo;
        radioYes = radioNo = document.createElement("input");
        var labelYes, labelNo
        labelYes = labelNo = document.createElement("label");

        radioYes.type = radioNo.type = "radio";
        radioYes.name = radioNo.name = `answers${questionNumber-1}`;
        radioYes.id = radioNo.id = `question${questionNumber-1}`;
        radioYes.value = "Yes";
        labelYes.innerHTML = `Yes`;
        document.getElementById(`q`).appendChild(radioYes);
        document.getElementById(`q`).appendChild(labelYes);
        document.getElementById(`optionInput`).value = "";
        options.push(labelYes.innerHTML);
        document.getElementById("optionList").value = options; 
        document.getElementById(`q`).innerHTML += "<br>";
        radioNo.value = "No";
        labelNo.innerHTML = `No`;
        document.getElementById(`q`).appendChild(radioNo);
        document.getElementById(`q`).appendChild(labelNo);
        document.getElementById(`optionInput`).value = "";
        options.push(labelNo.innerHTML);
        document.getElementById("optionList").value = options; 
        document.getElementById(`q`).innerHTML += "<br>";
    }


   else if(document.getElementById("questionFormat").value === "yesNo" && options.length >= 1){
        var confirmChange = confirm("If you change the question format, you will lose all your existing options for this question. OK to proceed?");
        if(confirmChange){
            options = [];
            document.getElementById("q").innerHTML = "";
            var radioYes,radioNo;
            radioYes = radioNo = document.createElement("input");
            var labelYes, labelNo
            labelYes = labelNo = document.createElement("label");

            radioYes.type = radioNo.type = "radio";
            radioYes.name = radioNo.name = `answers${questionNumber-1}`;
            radioYes.id = radioNo.id = `question${questionNumber-1}`;
            radioYes.value = "Yes";
            labelYes.innerHTML = `Yes`;
            document.getElementById(`q`).appendChild(radioYes);
            document.getElementById(`q`).appendChild(labelYes);
            document.getElementById(`optionInput`).value = "";
            options.push(labelYes.innerHTML);
            document.getElementById("optionList").value = options; 
            document.getElementById(`q`).innerHTML += "<br>";
            radioNo.value = "No";
            labelNo.innerHTML = `No`;
            document.getElementById(`q`).appendChild(radioNo);
            document.getElementById(`q`).appendChild(labelNo);
            document.getElementById(`optionInput`).value = "";
            options.push(labelNo.innerHTML);
            document.getElementById("optionList").value = options; 
            document.getElementById(`q`).innerHTML += "<br>";
        }

        else if(!confirmChange){
            document.getElementById("questionFormat").selectedIndex = "1";
        }
    }


    else if(document.getElementById("questionFormat").value === "trueFalse" && options.length == 0){
        var radioTrue,radioFalse;
        radioTrue = radioFalse = document.createElement("input");
        var labelTrue, labelFalse
        labelTrue = labelFalse = document.createElement("label");
    
        radioTrue.type = radioFalse.type = "radio";
        radioTrue.name = radioFalse.name = `answers${questionNumber-1}`;
        radioTrue.id = radioFalse.id = `question${questionNumber-1}`;
        
        radioTrue.value = "True";
        labelTrue.innerHTML = `True`;
        document.getElementById(`q`).appendChild(radioTrue);
        document.getElementById(`q`).appendChild(labelTrue);
        document.getElementById(`optionInput`).value = "";
        options.push(labelTrue.innerHTML);
        document.getElementById("optionList").value = options; 
        document.getElementById(`q`).innerHTML += "<br>";
        
        radioFalse.value = "False";
        labelFalse.innerHTML = `False`;
        document.getElementById(`q`).appendChild(radioFalse);
        document.getElementById(`q`).appendChild(labelFalse);
        document.getElementById(`optionInput`).value = "";
        options.push(labelFalse.innerHTML);
        document.getElementById("optionList").value = options; 
        document.getElementById(`q`).innerHTML += "<br>";
    }
        
    else if(document.getElementById("questionFormat").value === "trueFalse" && options.length >= 1){
            var confirmChange = confirm("If you change the question format, you will lose all your existing options for this question. OK to proceed?");
            if(confirmChange){
                options = [];
                document.getElementById("q").innerHTML = "";
                var radioTrue,radioFalse;
                radioTrue = radioFalse = document.createElement("input");
                var labelTrue, labelFalse
                labelTrue = labelFalse = document.createElement("label");
            
                radioTrue.type = radioFalse.type = "radio";
                radioTrue.name = radioFalse.name = `answers${questionNumber-1}`;
                radioTrue.id = radioFalse.id = `question${questionNumber-1}`;
                
                radioTrue.value = "True";
                labelTrue.innerHTML = `True`;
                document.getElementById(`q`).appendChild(radioTrue);
                document.getElementById(`q`).appendChild(labelTrue);
                document.getElementById(`optionInput`).value = "";
                options.push(labelTrue.innerHTML);
                document.getElementById("optionList").value = options; 
                document.getElementById(`q`).innerHTML += "<br>";
                
                radioFalse.value = "False";
                labelFalse.innerHTML = `False`;
                document.getElementById(`q`).appendChild(radioFalse);
                document.getElementById(`q`).appendChild(labelFalse);
                document.getElementById(`optionInput`).value = "";
                options.push(labelFalse.innerHTML);
                document.getElementById("optionList").value = options; 
                document.getElementById(`q`).innerHTML += "<br>";
            }

            else if(!confirmChange){
                document.getElementById("questionFormat").selectedIndex = "2";
            }
        
        }
        
    else if(document.getElementById("questionFormat").value === "multipleChoice" && options.length >= 1 ){
        var confirmChange = confirm("If you change the question format, you will lose all your existing options for this question. OK to proceed?");
        if(confirmChange){
            options = [];
            document.getElementById("q").innerHTML = "";
            document.getElementById("optionList").value = options; 
        }

        else if(!confirmChange){
            document.getElementById("questionFormat").selectedIndex = "-1";
        }
    }
}

function addOptions(){
    var radio = document.createElement("input");
    var label = document.createElement("label");

    if(document.getElementById("questionFormat").selectedIndex == "-1"){
        alert("Please select a question format!");
        document.getElementById(`optionInput`).value = "";
    }
    
    else if(document.getElementById(`optionInput`).value == ""){
        alert("You cannot add a blank option. Please try again!");
    }

    else if(document.getElementById("questionInput").value !== ""){
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
    var createdBy = document.getElementById("createdBy").value;

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
                expire: expire,
                createdBy: createdBy
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