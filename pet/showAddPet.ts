function showAddPet(){
    //User name is written on the username input part in 'Add Pet' part
    (document.getElementById("uNameForPet") as HTMLFormElement).value = document.getElementById("navbarUname").dataset.uname;
    document.getElementById("petModal").style.display = "block";
}