class User {

    constructor(username, password, age, address, img) {
        this.username = username;
        this.password = password;
        this.age = age;
        this.address = address;
        this.img = img;
        this.favoriteRecepies = [];
        this.coockedRecepies = {};
    }

    // addToFavorites(recepie) {
    //     if (!this.favoriteRecepies.some(rece => rece.id === recepie.id)) { //ако не се съдържа
    //         this.favoriteRecepies.push(recepie); //добави я в любими
    //     }
    // }

    // removeFromFavorites(id) {
    //     let idx = this.favoriteRecepies.findIndex(rec => rec.id == id);
    //     this.favoriteRecepies.splice(idx, 1);
    // }

    // recepieIsLiked(id) {
    //     return this.favoriteRecepies.some(recepie => recepie.id === id)
    // }

    // addToCookedRecepies(recepie) {
    //     //*this.cookedRecepies e обект
    //     if (this.coockedRecepies[recepie.title]) { //ако резептата е готвена поне веднъж, увеличи стойноста 
    //         this.coockedRecepies[recepie.title]++;
    //     } else {
    //         this.coockedRecepies[recepie.title] = 1; //ако резептата досега не е готвена, създай такова пръпрти със стойност 1
    //     }
    // }

}