document.getElementById("changePasswordButton").addEventListener("click",()=>{
    const username = document.getElementById("username").value;
    const oldPass = document.getElementById("oldPass").value;
    const newPass = document.getElementById("newPass").value;
    const id = document.getElementById("userID").value;
    
    if(newPass == ""){
        alert("Please enter your new password!");
    }
    
    else{
        fetch('/password/:id',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({username:username, old:oldPass, new:newPass, id:id})
        });
    
        alert("Password changed successfully! Please login using your new password.");
        window.location.href = "../logout";
    }
});