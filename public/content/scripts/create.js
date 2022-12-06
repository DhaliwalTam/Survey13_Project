var questionNumber = 1;
var today = new Date();
var questionArray = [];
var optionsArray = [];
var options = [];
var optionType = [];
var optionTypeArray = [];

document.getElementById("createSurvey").addEventListener("submit", preventSubmit);
document.getElementById("expire").addEventListener("blur",validateDate);
document.getElementById("submitButton").addEventListener("click", formConfirmation);
document.getElementById("saveQuestionandOptions").addEventListener("click",addQuestion);
document.getElementById("addOptionButton").addEventListener("click",addOptions);
document.getElementById("questionFormat").addEventListener("change",addDefaultOptions);
document.getElementById("cancelBtn").addEventListener("click",confirmCancel);
document.getElementById('textboxOption').addEventListener("change", () => {
    document.getElementById(`optionInput`).style.visibility = "hidden";
});

document.getElementById('radioOption').addEventListener("change", () => {
    document.getElementById(`optionInput`).style.visibility = "visible";
});

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

    for(var i = 0; i < document.getElementsByClassName("hiddenDiv").length; i++){
        document.getElementsByClassName("hiddenDiv")[i].style.visibility = "hidden";
    }
});

function createArrow(){
    var flashArrow = document.createElement("I");
    flashArrow.className = "fa-solid fa-arrow-right fa-beat-fade fa-2x";
    flashArrow.id = "missingArrow";
    return flashArrow;
}


function addQuestion(){
    if(document.getElementById("questionFormat").selectedIndex == "-1"){
        alert("Please select a question format!");
        document.getElementById("questionFormatLabel").before(createArrow(), document.getElementById("questionFormatLabel"));
       
    }
    
    else if(document.getElementById("optionList").value ==="" && (document.getElementById('radioOption').checked )){
        alert("Please add some options before saving!");
        document.getElementById("optionInput").style.borderColor = "red"; 
    }
    
    else if(document.getElementById("questionInput").value !== ""){
        questionArray.push(document.getElementById("questionInput").value);
        document.getElementById("questionList").value = questionArray;
        document.getElementById("questionInput").value = "";
        optionsArray.push(options);
        
        questionNumber++;
        document.getElementById(`q`).innerHTML = "";
        document.getElementById("optionList").value = "";
        
        optionType = [];
        options = [];
        document.getElementById("questionInput").placeholder = `Enter question ${questionNumber}`;
        document.getElementById("optionInput").placeholder = `Enter an option for question ${questionNumber}`;
        addDefaultOptions();
        alert("Question saved successfully!");
        document.getElementById("optionInput").style.borderColor = "";
        document.getElementById("questionInput").style.borderColor = "";
        if(document.getElementById("chooseFormatDiv").contains(document.getElementById('missingArrow'))){
            document.getElementById("chooseFormatDiv").removeChild(document.getElementById("missingArrow"));
        }
    }
    
    else{
        alert("Please enter a question!");
        document.getElementById("questionInput").style.borderColor = "red"; 
    }


}

function addDefaultOptions(){
    if(document.getElementById("questionFormat").value === "yesNo" && options.length == 0){
        for(var i = 0; i < 2; i++){
            document.getElementById(`q`).innerHTML += `<label id="option${i}"></label>`;
        }
 
        document.getElementById("option0").innerHTML = `<input type="radio" id="radio0" name="answers${questionNumber-1}" value="Yes">Yes`;
        document.getElementById("option1").innerHTML = `<input type="radio" id="radio1" name="answers${questionNumber-1}" value="No">No`;
        
        for(var i = 0; i < 1; i++){
            document.getElementById(`option${i}`).outerHTML += "<br>";
        }
        
        for(var i = 0; i < 2; i++){
            options.push(document.getElementById(`radio${i}`).value);
            optionType.push("radio");
        }
    
        
        document.getElementById("optionList").value = options; 
        document.getElementById(`q`).innerHTML += "<br>";
    }


   else if(document.getElementById("questionFormat").value === "yesNo" && options.length >= 1){
        var confirmChange = confirm("If you change the question format, you will lose all your existing options for this question. OK to proceed?");
        if(confirmChange){
            options = [];
            optionType = [];
            document.getElementById("q").innerHTML = "";
            for(var i = 0; i < 2; i++){
            document.getElementById(`q`).innerHTML += `<label id="option${i}"></label>`;
        }
 
        document.getElementById("option0").innerHTML = `<input type="radio" id="radio0" name="answers${questionNumber-1}" value="Yes">Yes`;
        document.getElementById("option1").innerHTML = `<input type="radio" id="radio1" name="answers${questionNumber-1}" value="No">No`;
        
        for(var i = 0; i < 1; i++){
            document.getElementById(`option${i}`).outerHTML += "<br>";
        }
        
        for(var i = 0; i < 2; i++){
            options.push(document.getElementById(`radio${i}`).value);
            optionType.push("radio");
        }
    
       
        document.getElementById("optionList").value = options; 
        document.getElementById(`q`).innerHTML += "<br>";
        }

        else if(!confirmChange){
            if(options[0] == "Agree"){
                document.getElementById("questionFormat").selectedIndex = "3"; 
            }
            
            else if(options[0] == "True"){
                document.getElementById("questionFormat").selectedIndex = "1"; 
            }

            else if(options[0] == "1"){
                document.getElementById("questionFormat").selectedIndex = "4"; 
            }

            else{
                document.getElementById("questionFormat").selectedIndex = "0"; 
            }
        }
    }


    else if(document.getElementById("questionFormat").value === "trueFalse" && options.length == 0){
        for(var i = 0; i < 2; i++){
            document.getElementById(`q`).innerHTML += `<label id="option${i}"></label>`;
        }
 
        document.getElementById("option0").innerHTML = `<input type="radio" id="radio0" name="answers${questionNumber-1}" value="True">True`;
        document.getElementById("option1").innerHTML = `<input type="radio" id="radio1" name="answers${questionNumber-1}" value="False">False`;
        
        for(var i = 0; i < 1; i++){
            document.getElementById(`option${i}`).outerHTML += "<br>";
        }
        
        for(var i = 0; i < 2; i++){
            options.push(document.getElementById(`radio${i}`).value);
            optionType.push("radio");
        }
    
       
        document.getElementById("optionList").value = options; 
        document.getElementById(`q`).innerHTML += "<br>";
    }
        
    else if(document.getElementById("questionFormat").value === "trueFalse" && options.length >= 1){
            var confirmChange = confirm("If you change the question format, you will lose all your existing options for this question. OK to proceed?");
            if(confirmChange){
                options = [];
                optionType = [];
                document.getElementById("q").innerHTML = "";
                for(var i = 0; i < 2; i++){
                    document.getElementById(`q`).innerHTML += `<label id="option${i}"></label>`;
                }
         
                document.getElementById("option0").innerHTML = `<input type="radio" id="radio0" name="answers${questionNumber-1}" value="True">True`;
                document.getElementById("option1").innerHTML = `<input type="radio" id="radio1" name="answers${questionNumber-1}" value="False">False`;
                
                for(var i = 0; i < 1; i++){
                    document.getElementById(`option${i}`).outerHTML += "<br>";
                }
                
                for(var i = 0; i < 2; i++){
                    options.push(document.getElementById(`radio${i}`).value);
                    optionType.push("radio");
                }
            
                
                document.getElementById("optionList").value = options; 
                document.getElementById(`q`).innerHTML += "<br>";
            }

            else if(!confirmChange){
                if(options[0] == "Agree"){
                    document.getElementById("questionFormat").selectedIndex = "3"; 
                }
                
                else if(options[0] == "Yes"){
                    document.getElementById("questionFormat").selectedIndex = "2"; 
                }
    
                else if(options[0] == "1"){
                    document.getElementById("questionFormat").selectedIndex = "4"; 
                }
    
                else{
                    document.getElementById("questionFormat").selectedIndex = "0"; 
                }
            }
        
        }
        
    else if(document.getElementById("questionFormat").value === "multipleChoice" && options.length >= 1 ){
        var confirmChange = confirm("If you change the question format, you will lose all your existing options for this question. OK to proceed?");
        if(confirmChange){
            options = [];
            optionType = [];
            document.getElementById("q").innerHTML = "";
           
            document.getElementById("optionList").value = options; 
        }

        else if(!confirmChange){
            document.getElementById("questionFormat").selectedIndex = "-1";
        }
    }

    else if(document.getElementById("questionFormat").value === "agreeDisagree" && options.length == 0){
        for(var i = 0; i < 4; i++){
            document.getElementById(`q`).innerHTML += `<label id="option${i}"></label>`;
        }
 
        document.getElementById("option0").innerHTML = `<input type="radio" id="radio0" name="answers${questionNumber-1}" value="Agree">Agree`;
        document.getElementById("option1").innerHTML = `<input type="radio" id="radio1" name="answers${questionNumber-1}" value="Slightly Agree">Slightly Agree`;
        document.getElementById("option2").innerHTML = `<input type="radio" id="radio2" name="answers${questionNumber-1}" value="Disagree">Disagree`;
        document.getElementById("option3").innerHTML = `<input type="radio" id="radio3" name="answers${questionNumber-1}" value="Slightly Disagree">Slightly Disagree`;

        for(var i = 0; i < 3; i++){
            document.getElementById(`option${i}`).outerHTML += "<br>";
        }
        
        for(var i = 0; i < 4; i++){
            options.push(document.getElementById(`radio${i}`).value);
            optionType.push("radio");
        }
    
        
        document.getElementById("optionList").value = options; 
        document.getElementById(`q`).innerHTML += "<br>";
    }

    else if(document.getElementById("questionFormat").value === "agreeDisagree" && options.length >= 1){
        var confirmChange = confirm("If you change the question format, you will lose all your existing options for this question. OK to proceed?");
        if(confirmChange){
            options = [];
            optionType = [];
            document.getElementById("q").innerHTML = "";
            for(var i = 0; i < 4; i++){
                document.getElementById(`q`).innerHTML += `<label id="option${i}"></label>`;
            }
     
            document.getElementById("option0").innerHTML = `<input type="radio" id="radio0" name="answers${questionNumber-1}" value="Agree">Agree`;
            document.getElementById("option1").innerHTML = `<input type="radio" id="radio1" name="answers${questionNumber-1}" value="Slightly Agree">Slightly Agree`;
            document.getElementById("option2").innerHTML = `<input type="radio" id="radio2" name="answers${questionNumber-1}" value="Disagree">Disagree`;
            document.getElementById("option3").innerHTML = `<input type="radio" id="radio3" name="answers${questionNumber-1}" value="Slightly Disagree">Slightly Disagree`;
    
            for(var i = 0; i < 3; i++){
                document.getElementById(`option${i}`).outerHTML += "<br>";
            }
            
            for(var i = 0; i < 4; i++){
                options.push(document.getElementById(`radio${i}`).value);
                optionType.push("radio");
            }
    
            
            document.getElementById("optionList").value = options; 
            document.getElementById(`q`).innerHTML += "<br>";
        }

        else if(!confirmChange){
            if(options[0] == "Yes"){
                document.getElementById("questionFormat").selectedIndex = "2"; 
            }
            
            else if(options[0] == "True"){
                document.getElementById("questionFormat").selectedIndex = "1"; 
            }

            else if(options[0] == "1"){
                document.getElementById("questionFormat").selectedIndex = "4"; 
            }

            else{
                document.getElementById("questionFormat").selectedIndex = "0"; 
            }
        }
    }

    else if(document.getElementById("questionFormat").value === "scale" && options.length == 0){
        for(var i = 0; i < 5; i++){
            document.getElementById(`q`).innerHTML += `<label id="option${i}"></label>`;
        }
 
        document.getElementById("option0").innerHTML = `<input type="radio" id="radio0" name="answers${questionNumber-1}" value="1">1`;
        document.getElementById("option1").innerHTML = `<input type="radio" id="radio1" name="answers${questionNumber-1}" value="2">2`;
        document.getElementById("option2").innerHTML = `<input type="radio" id="radio2" name="answers${questionNumber-1}" value="3">3`;
        document.getElementById("option3").innerHTML = `<input type="radio" id="radio3" name="answers${questionNumber-1}" value="4">4`;
        document.getElementById("option4").innerHTML = `<input type="radio" id="radio4" name="answers${questionNumber-1}" value="5">5`;

        for(var i = 0; i < 4; i++){
            document.getElementById(`option${i}`).outerHTML += "<br>";
        }
        
        for(var i = 0; i < 5; i++){
            options.push(document.getElementById(`radio${i}`).value);
            optionType.push("radio");
        }
    
        document.getElementById("optionList").value = options; 
        document.getElementById(`q`).innerHTML += "<br>";
    }

    else if(document.getElementById("questionFormat").value === "scale" && options.length >= 1){
        var confirmChange = confirm("If you change the question format, you will lose all your existing options for this question. OK to proceed?");
        if(confirmChange){
            options = [];
            optionType = [];
            document.getElementById("q").innerHTML = "";
            for(var i = 0; i < 5; i++){
                document.getElementById(`q`).innerHTML += `<label id="option${i}"></label>`;
            }
     
            document.getElementById("option0").innerHTML = `<input type="radio" id="radio0" name="answers${questionNumber-1}" value="1">1`;
            document.getElementById("option1").innerHTML = `<input type="radio" id="radio1" name="answers${questionNumber-1}" value="2">2`;
            document.getElementById("option2").innerHTML = `<input type="radio" id="radio2" name="answers${questionNumber-1}" value="3">3`;
            document.getElementById("option3").innerHTML = `<input type="radio" id="radio3" name="answers${questionNumber-1}" value="4">4`;
            document.getElementById("option4").innerHTML = `<input type="radio" id="radio4" name="answers${questionNumber-1}" value="5">5`;
    
            for(var i = 0; i < 4; i++){
                document.getElementById(`option${i}`).outerHTML += "<br>";
            }
            
            for(var i = 0; i < 5; i++){
                options.push(document.getElementById(`radio${i}`).value);
                optionType.push("radio");
            }
    
            document.getElementById("optionList").value = options; 
            document.getElementById(`q`).innerHTML += "<br>";
        }

        else if(!confirmChange){
            if(options[0] == "Yes"){
                document.getElementById("questionFormat").selectedIndex = "2"; 
            }
            
            else if(options[0] == "True"){
                document.getElementById("questionFormat").selectedIndex = "1"; 
            }

            else if(options[0] == "Agree"){
                document.getElementById("questionFormat").selectedIndex = "3"; 
            }

            else{
                document.getElementById("questionFormat").selectedIndex = "0"; 
            }
        }
    }

    document.getElementById("enterQuestionDiv").style.visibility = "visible";
    if(document.getElementById("chooseFormatDiv").contains(document.getElementById('missingArrow'))){
        document.getElementById("chooseFormatDiv").removeChild(document.getElementById("missingArrow"));
    }
}

function addOptions(){
    if(document.getElementById("questionFormat").selectedIndex == "-1"){
        alert("Please select a question format!");
        document.getElementById(`optionInput`).value = "";
        document.getElementById("questionFormatLabel").before(createArrow(), document.getElementById("questionFormatLabel"));
    }
    
    else if(document.getElementById(`optionInput`).value == "" && !document.getElementById('textboxOption').checked ){
        alert("You cannot add a blank option. Please try again!");
        document.getElementById("optionInput").style.borderColor = "red"; 
    }

    else if(document.getElementById("questionInput").value !== "" && document.getElementById('radioOption').checked){
        var radio = document.createElement("input");
        var label = document.createElement("label");

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
        document.getElementById("saveDiv").style.visibility = "visible";
        document.getElementById("optionInput").style.borderColor = "";
        document.getElementById("questionInput").style.borderColor = "";
        if(document.getElementById("chooseFormatDiv").contains(document.getElementById('missingArrow'))){
            document.getElementById("chooseFormatDiv").removeChild(document.getElementById("missingArrow"));
        }
        
        if(document.getElementById("enterQuestionDiv").contains(document.getElementById('missingArrow'))){
            document.getElementById("enterQuestionDiv").removeChild(document.getElementById("missingArrow"));
        }
    }

    else if(document.getElementById("questionInput").value !== "" && document.getElementById('textboxOption').checked){
        var textbox = document.createElement("textarea");
        textbox.name = `answers${questionNumber-1}`;
        textbox.id = `question${questionNumber-1}`;
        textbox.className = "customTextbox";
        document.getElementById(`q`).appendChild(textbox);
        document.getElementById("q").innerHTML += "<br>"
        options.push("");
        optionType.push("textarea");
        document.getElementById(`optionInput`).value = "";
        document.getElementById("saveDiv").style.visibility = "visible";
        document.getElementById("optionInput").style.borderColor = "";
        document.getElementById("questionInput").style.borderColor = "";
        if(document.getElementById("chooseFormatDiv").contains(document.getElementById('missingArrow'))){
            document.getElementById("chooseFormatDiv").removeChild(document.getElementById("missingArrow"));
        }

        if(document.getElementById("enterQuestionDiv").contains(document.getElementById('missingArrow'))){
            document.getElementById("enterQuestionDiv").removeChild(document.getElementById("missingArrow"));
        }
    }

    else if(document.getElementById("questionInput").value === ""){
        alert("Please add a question before adding options!");
        document.getElementById("questionInput").style.borderColor = "red";
    }

    else{
        alert("Please select the type of option you want to add!");
        document.getElementById("optionTypeLabel").before(createArrow(), document.getElementById("optionTypeLabel"));
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


function confirmCancel(){
    var confirmCancel = confirm("Are you sure you want to leave this page? All survey questions and options will be lost!");
    if(confirmCancel){
        window.location.href = "../surveys/list";
    }
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