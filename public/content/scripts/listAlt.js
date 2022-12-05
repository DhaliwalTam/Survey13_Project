function confirmEdit(id) {
    var confirmed = confirm("Heads up! Editing any options for this survey will reset its statistics. Click OK to proceed.");
    if (confirmed) {
        window.location.href = `../surveys/edit/${id}`;
    } 
}

function confirmDelete(id){
    var confirmed = confirm("Are you sure you want to delete this survey and all associated data? This cannot be undone.");
    if (confirmed) {
        window.location.href = `/survey-delete/${id}`;
    }  
}