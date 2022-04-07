//Хубаво е класът UserStorage да бъде капсулиран, защото в момента е видим навсякъде, и всеки
//може да си прави UserStorag-и, както си иска, затова ще го набутаме в едно IIFE
//След като е в IIFE е скрито, ама никой не може да го ползва, така че IIFE-то трябва да връща нещо
//затова return new UserStorage();

//правим си променлива, която веднага присвоява резултата от едно IIFE
//!това се нарича module design pattern - създадохме модул, който е капсулиран/скрит
//!никой не може да види класът UserStorage и съответно да прави UserStorage извън тази ф-я
//!обаче всеки ще може да ползва методите вътре през променливата userStorage

let userManager = (function () {

    // тук ще имаме функции за добавяне, редакция и изтриване на данни
    class UserManager {

        constructor() {

            if (localStorage.getItem("users")) { //ако има сетнати юзъри в localStorage - вземи ги 
                this.users = JSON.parse(localStorage.getItem("users"));

            } else { //ако няма - направи тези двамата 
                let users = [
                    new User('krasi', '123'),
                    new User('pesho', '1234')
                ];

                localStorage.setItem("users", JSON.stringify(users)); //и ги сетни в localStorage
            }

        }

        // това ще го викаме при регистрация
        addUser(username, password) {
            if (!this.existsUser(username)) { //ако не съществува, регистрирай го
                this.users.push(new User(username, password));
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

    }

    return new UserManager();
})();