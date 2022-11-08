var addChoicesButton = document.getElementsByClassName("addChoice");

for(var i=0; i < addChoicesButton.length; i++){
    addChoicesButton[i].addEventListener("click",createOptions);
}

function createOptions(){
    var optionInput = document.createElement("input");
    optionInput.type = "text";
    optionInput.name = `choices${this.id}`;
    document.getElementById(`optionsDiv${this.id}`).appendChild(optionInput);
}