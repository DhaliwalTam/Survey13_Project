window.addEventListener("load",()=>{   
    var surveyStartButtons = document.getElementsByClassName("surveyStart");
    var activeDate = document.getElementsByClassName("activeDate");
    
    for(var i = 0; i<activeDate.length; i++){
        if(new Date(document.getElementsByClassName("activeDate")[i].innerText) > new Date()){
            surveyStartButtons[i].addEventListener("click",()=>{
                alert("This survey is not active yet. Please try again later!");
            })
        }    
    }
})