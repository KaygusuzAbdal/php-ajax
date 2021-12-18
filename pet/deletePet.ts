function deletePet(target: HTMLElement) {
    
    const pkey: string = target.dataset.pkey; //Define pet key
    $.ajax({ //database transaction request
        url: "pet/delete-pet.php", //PHP file
        type: "POST",
        data: {
            pkey: pkey //send data to PHP file
        },
        cache: false,
        success: function(dataResult: any){
            dataResult = JSON.parse(dataResult); //results are turned into JSON
            if(dataResult.statusCode==200){ //if it is successful,
                renderList("pets"); //render pets list
            }
            else if(dataResult.statusCode==404){ //if there is no pet with the data,
                document.getElementById("petError").style.display="block"; //show error message
                document.getElementById("petError").innerHTML = "An error occurred while deleting the pet! Pet not found."; }
        }
    });
}