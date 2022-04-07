let userManager = (function () {

    class UserManager {
        constructor() {}

        register(user) {
            userStorage.addUser(...Object.values(user))
        }

        login(username, password) {
            if (userStorage.validUser(username, password)) {
                let user = userStorage.getUser(username);
                localStorage.setItem("currentUser", JSON.stringify(user));
                return user;
            }
        }

        logout() {
            //презапиши всички юзъри в localStorage, заедно с последно модифицирания, за да може да се запази актуалното му състояние
            localStorage.setItem('users', JSON.stringify(userStorage.users));
            //след това разкарай юзъра, с който последно е работено
            localStorage.removeItem("currentUser");
        }


    }


    return new UserManager();
})();