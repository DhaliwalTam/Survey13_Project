window.addEventListener("load",()=>{
    document.getElementById("correctEmail").style.visibility = "hidden";
});

document.getElementById("survEmail").addEventListener("focus",()=>{
    document.getElementById("correctEmail").style.visibility = "visible";
});

document.getElementById("survEmail").addEventListener("blur",()=>{
    document.getElementById("correctEmail").style.visibility = "hidden";
});


document.getElementById("mainSurvey").addEventListener("submit",(e)=>{
    e.preventDefault();
});

document.getElementById("cancelButton").addEventListener("click",()=>{
    
    
    var confirmLeave = confirm("Are you sure you want to leave this survey?");
    if(confirmLeave){
        window.location.href = "../list";
    }
});


document.getElementById("submitSurvey").addEventListener("click",()=>{
    var mainSurvey = document.getElementById("mainSurvey");

    if(mainSurvey.checkValidity()){
        alert("Your survey has been successfully submitted! Thank you for choosing to do this survey!");
        mainSurvey.submit();
    }

    else if(!mainSurvey.checkValidity()){
        alert("Oops! We were unable to submit your survey! Maybe check to make sure you have answered all the questions?");
    }

    else{
        alert("Oops! An error has occurred. Please try again!");
    }
});







    
    
    

