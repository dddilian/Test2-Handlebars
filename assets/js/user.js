class User {

    constructor() {
        this.name = "John Doe";
        this.age = 30;
        this.address = "USA, New York, Nowhere str. 10";
        this.img = "";
        this.favoriteRecepies = [];
        this.coockedRecepies = {};
    }

    addToFavorites(recepie) {
        if (this.favoriteRecepies.indexOf(recepie) === -1) { //ако не се съдържа
            this.favoriteRecepies.push(recepie);
        }
    }

    removeFromFavorites(id) {
        let idx = this.favoriteRecepies.findIndex(rec => rec.id == id);
        this.favoriteRecepies.splice(idx, 1);
    }

    recepieIsLiked(id) {
        return this.favoriteRecepies.some(recepie => recepie.id === id)
    }

    addToCookedRecepies(recepie) {
        //this.cookedRecepies e обект
        if (this.coockedRecepies[recepie.title]) {
            this.coockedRecepies[recepie.title]++;
        } else {
            this.coockedRecepies[recepie.title] = 1;
        }
    }





}