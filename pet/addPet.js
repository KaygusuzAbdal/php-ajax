import {renderList} from '../config/renderList.js';

function addPet(event) {
    event.preventDefault();
    const form = event.target;
    //definitions for pet:
    const pType = document.getElementById('petType').value;
    const pName = document.getElementById('petName').value;
    const uName = document.getElementById('uNameForPet').value;
    //a 'pkey' value is defined for each pet. 
    const pkey = uName + "_" + pName;
    $.ajax({
        url: "pet/add-pet.php",
        type: "POST",
        data: {
            pName: pName,
            pType: pType,
            uName: uName,
            pkey: pkey
        },
        cache: false,
        success: function (dataResult) {
            //in this function, results are turned into JSON
            dataResult = JSON.parse(dataResult);
            if (dataResult.statusCode == 200) { // if it is successful,
                //reset saved info
                form.reset();
                //User name is written on the username input part in 'Add Pet' part
                document.getElementById("uNameForPet").value = uName;
                //pets table is rendered again
                renderList("pets");
                //error messages and pet edit part aren't shown anymore
                document.getElementById("addPetError").style.display = "none";
                petModal.style.display = "none";
            }
            else if (dataResult.statusCode == 409) { // if there is another pet with the same name,
                document.getElementById("addPetError").style.display = "block";
                document.getElementById("addPetError").innerHTML = "An error occurred while adding pet! You can't add a different pet with the same name. Please check your information and try again.";
            }
            else if (dataResult.statusCode == 401) { // if user tries to do this action without registering.
                document.getElementById("addPetError").style.display = "block";
                document.getElementById("addPetError").innerHTML = "Not authorized for that action! Please log in.";
            }
        }
    });
}

export {addPet};