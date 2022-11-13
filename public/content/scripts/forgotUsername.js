document.getElementById("getUsername").addEventListener("click",()=>{
    const email = document.getElementById("enterEmailField").value;
    
    fetch('/getUsername',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({email:email})
        
    });
})