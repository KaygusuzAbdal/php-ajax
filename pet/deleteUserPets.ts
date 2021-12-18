function deleteUserPets(items: any): void{ 
    for (let i = 0; i < items.length; i++) { //This method sends all items coming from parameter 
        deletePet(items[i]);                   // to the  ' deletePet' method with a for loop.
    }
}