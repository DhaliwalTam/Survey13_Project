document.getElementById("mainSurvey").addEventListener("submit",(e)=>{
    e.preventDefault();
})

document.getElementById("submitSurvey").addEventListener("click",()=>{
    var mainSurvey = document.getElementById("mainSurvey");

    if(mainSurvey.checkValidity()){
        alert("Your survey has been successfully submitted! Thank you for choosing to do this survey!");
        mainSurvey.submit();
    }

    else{
        alert("Oops! An error has occurred! Please try again!");
    }
})

document.getElementById("cancelButton").addEventListener("click",()=>{
    var confirmLeave = confirm("Are you sure you want to leave this survey?");
    if(confirmLeave){
        window.location.href = "../list";
    }
})





    
    
    

