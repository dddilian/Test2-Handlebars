//Хубаво е класът UserManager да бъде капсулиран, защото в момента е видим навсякъде, и всеки
//може да си прави UserStorag-и, както си иска, затова ще го набутаме в едно IIFE
//След като е в IIFE е скрито, ама никой не може да го ползва, така че IIFE-то трябва да връща нещо
//затова return new UserStorage();

//правим си променлива, която веднага присвоява резултата от едно IIFE
//!това се нарича module design pattern - създадохме модул, който е капсулиран/скрит
//!никой не може да види класът UserManager и съответно да прави UserManager извън тази ф-я
//!обаче всеки ще може да ползва методите вътре през променливата userManager



let userStorage = (function () {

    // тук ще имаме функции за добавяне, редакция и изтриване на данни
    class UserStorage {

        constructor() {
            this.users = [];

            if (!localStorage.getItem("users")) { //ако няма юзъри в localStorage
                let startUsers = [];
                defaultUsers.forEach(user => {
                    let newUser = new User(...Object.values(user));
                    startUsers.push(newUser);
                    // console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(newUser)));
                });

                //!Преди сериализация - инстанция на User, имат функции, всичко работи.
                // startUsers.forEach(user => {
                //     console.log(user instanceof User);
                // })

                localStorage.setItem("users", JSON.stringify(startUsers)); //и ги сетни в localStorage
            }
            this.users = JSON.parse(localStorage.getItem("users"));

            //!След десериализация....вече не са инстанция на User, нямат функции, нямат нищо....загубени 2 часа...
            // this.users.forEach(user => {
            //     console.log(user instanceof User);
            // })

        }

        // това ще го викаме при регистрация
        addUser(username, password, age, address, imgUrl) {
            if (!this.existsUser(username)) { //ако не съществува, регистрирай го
                this.users.push(new User(username, password, age, address, imgUrl));
                //понеже сме създали нов юзър и сме го бутнали в this.users, трябва в localStorage, на същия ключ, да вкараме новия вид на this.users
                //точно, както в map, където ако добавим на съществуващ ключ нова стойност, тя ще презапише старата
                localStorage.setItem('users', JSON.stringify(this.users));
            }
        }

        existsUser(username) {
            return this.users.some(user => user.username === username);
        }

        validUser(username, password) {
            return this.users.some(user => user.username === username && user.password == password);
        }

        getUser(username) {
            return this.users.find(user => user.username === username);
        }

    }

    return new UserStorage();
})();