import {renderList} from '../config/renderList.js';

function editPet(event) {
    event.preventDefault();
    const formData = new FormData(petEdit); //Retrieve data from petEdit form
    //Definitions of pet name, new pet name, pet type, pet key, new pet key & username: 
    const pName = document.getElementById("petEditName").dataset.pname;
    const pNewName = formData.get("petname").toString().trim();
    const pType = formData.get("pettype").toString().trim();
    const uName = petEdit.dataset.uname;
    const pkey = uName + "_" + pName;
    const newPkey = uName + "_" + pNewName;
    //If new pet name or pet type values aren't undefined,do the database operations:
    if (pNewName.length != 0 || pType.length != 0) {

        const ajax = new XMLHttpRequest(); //database transaction request
        const method = "PUT";
        const url = "pet/pets.php/?pkey=" + pkey + "&pName=" + pNewName + "&pType=" + pType+"&newPkey="+newPkey; //PHP file
        const asynchronous = true;
        ajax.open(method, url, asynchronous);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                petEdit.reset(); //reset petEdit form,
                //Important info that retrieved from database is written into input fields in form,
                petEdit.dataset.uname = uName;
                petEdit.dataset.pname = pNewName;
                editPetModal.style.display = "none"; //pet edit part is hidden
                renderList("pets"); //pets table is rendered again

            }
        };
    }
}
export {editPet};