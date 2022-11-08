document.getElementById("emailData").addEventListener("click", surveyData);


function surveyData(){
    const numberOfRespondents = document.getElementById("numberRespondents").innerHTML; 
    const surveyTitle = document.getElementById("surveyTitle").innerHTML;
    let questionSet = document.getElementsByClassName("questions");
    let answerSet = document.getElementsByClassName("answers");
    let questions = "";
    let percentChosen = "";

    for(let i=0; i<questionSet.length; i++){
        questions += `${questionSet[i].innerText}\n`;
        percentChosen += `${answerSet[i].innerText}\n`;
    }

    fetch('/surveys/stats/:id',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({numberOfRespondents: numberOfRespondents, questions: questions, percentChosen: percentChosen, surveyTitle: surveyTitle})
    });

    alert("Data emailed successfully!");
}