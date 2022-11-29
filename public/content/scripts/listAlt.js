window.addEventListener("load",()=>{
    var activeDate = document.getElementsByClassName("activeDate");
    var expiryDate = document.getElementsByClassName("expiryDate");
    var surveyExpired = false;

    for(var i = 0; i<activeDate.length; i++){
        if(new Date(activeDate[i].innerText) > new Date(expiryDate[i].innerText)){
            surveyExpired = true;
        }    
    }

    if(surveyExpired){
        alert("Heads up! Some of your surveys have expired! Please take a moment to delete them.");
    }
})


function confirmEdit(id) {
    var confirmed = confirm("Heads up! If you edit your survey, you will all previous responses for this survey. Click OK to proceed.");
    if (confirmed) {
        window.location.href = `../surveys/edit/${id}`;
    } 
}
