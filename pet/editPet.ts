function editPet(event: Event){
    event.preventDefault();

    const formData: FormData = new FormData(petEdit); //Retrieve data from petEdit form
    
    //Definitions of pet name, new pet name, pet type, pet key, new pet key & username: 
    const pName: string = document.getElementById("petEditName").dataset.pname;
    const pNewName: string = formData.get("petname").toString().trim();
    const pType: string = formData.get("pettype").toString().trim();
    const uName: string = petEdit.dataset.uname;
    const pkey: string = uName+"_"+pName;
    const newPkey: string = uName+"_"+pNewName;

    //If new pet name or pet type values aren't undefined,do the database operations:
    if (pNewName.length != 0 || pType.length != 0) {
        
        $.ajax({ //database transaction request
            url: "pet/edit-pet.php",   //PHP file
            type: "POST",
            data: {
                pNewName: pNewName,         //Defined data
                pType: pType,               //are sent
                pkey: pkey,                 //to the
                uName: uName,               //PHP file
                newPkey: newPkey
            },
            cache: false,
            success: function(dataResult: any){
                dataResult = JSON.parse(dataResult); //results are turned into JSON
                if(dataResult.statusCode==200){ //If it is successful,
                    petEdit.reset(); //reset petEdit form,

                    //Important info that retrieved from database is written into input fields in form,
                    petEdit.dataset.uname = uName;
                    petEdit.dataset.pname = pNewName;
                    editPetModal.style.display = "none"; //pet edit part is hidden
                  
                    renderList("pets");   //pets table is rendered again
                }
            }
        });
    }
}