class RecepiesManager {
    constructor() {
        this.allRecepies = [];
    }

    add(recepie) {
        if (recepie instanceof Recepie) {
            recepie.id = this.nextId();
            this.allRecepies.push(recepie);
        }
    }

    filterIngredient(ingredient) {
        return this.allRecepies.filter(rec => rec.ingredients.includes(ingredient));
    }

    filterName(text) {
        return this.allRecepies.filter(rec => rec.title.toLowerCase().includes(text.toLowerCase()));
    }

    nextId() {
        //console.log(this.allRecepies);
        let id;

        while (true) {
            //връткаме цикъла, за да не се получи повторение на id-та в базата данни
            //Math.random() връща случайно число от 0 до 1 включително
            //умножаваме го по 99 милиона
            //побитово делене на 0 го прави цяло число. Може да се направи и с Math.floor();
            //на резултата викаме toString(16), което ще го обърне в шестнадесетично число
            //понеже може да се падне и число с 1 цифра,а ние искаме винаги Id-тата да са с еднаква дължина, закрепяме отпред 8 нули
            //а после със slice(-8) взимаме последните 8 символа, за да сме сигурни, че взетото ще е с една и съща дължина винаги
            //няма значение това (Math.random() * 99999999 | 0) число с колко символа ще генерира, след като ние се подсигуряваме
            id = ("00000000" + ((Math.random() * 99999999) | 0).toString(16)).slice(-8);
            if (this.allRecepies.find(recepie => recepie.id == id) == undefined) { //ако няма рецепта с такова id, върни това id, за да бъде сложено на рецептата, която се вкарва в момента
                return id;
            }
        }


    }

}