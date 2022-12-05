document.getElementById("emailData").addEventListener("click", surveyData);

function surveyData() {
    const numberOfRespondents = document.getElementById("numberRespondents").innerHTML;
    const surveyTitle = document.getElementById("surveyTitle").innerHTML;
    var questionSet = document.getElementsByClassName("questions");
    var answerSet = document.getElementsByClassName("answers");
    var element = document.querySelectorAll('h5');
    var freeTextExist = false;
    var disabledCounter = 30;
    var freeTextResponses = [];
    var questions = "";
    var percentChosen = "";


    for (var i = 0; i < element.length; i++) {
        if (element[i].classList.contains("freeTextResponses")) {
            freeTextExist = true;
        } else {
            freeTextExist = false;
        }
    }

    if (freeTextExist) {
        for (var i = 0; i < document.getElementsByClassName("freeTextResponses").length; i++) {
            freeTextResponses.push(document.getElementsByClassName("freeTextResponses")[i].innerText);
        }
    }

    for (var i = 0; i < questionSet.length; i++) {
        questions += `${questionSet[i].innerText}\n`;
        percentChosen += `${answerSet[i].innerText}\n`;
    }


    fetch('/surveys/stats/:id', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            numberOfRespondents: numberOfRespondents,
            questions: questions,
            percentChosen: percentChosen,
            surveyTitle: surveyTitle,
            freeTextExist: freeTextExist,
            freeTextResponses: freeTextResponses
        })
    });

    alert("Data emailed successfully!");
    document.getElementById("emailData").disabled = true;
   
    var disableInterval = setInterval(()=>{
        disabledCounter--;
        document.getElementById("emailData").innerHTML = `<i class="fa-solid fa-envelope"></i> Email Statistics(${disabledCounter})`;
    },1000)

    setTimeout(() => {
        clearInterval(disableInterval);
        document.getElementById("emailData").innerHTML = `<i class="fa-solid fa-envelope"></i> Email Statistics`;
        document.getElementById("emailData").disabled = false;
    }, 30000);
}
