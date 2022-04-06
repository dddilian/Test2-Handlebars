(function () {

    let allRecepiesEl = document.getElementById("allRecepies");
    let favRecepies = document.getElementById("favRecepies");
    let createRecepie = document.getElementById("createRecepie");
    let myProfile = document.getElementById("myProfile");
    let errorPage = document.getElementById("errorPage");

    let selectEl = document.getElementById("selectEl");
    selectEl.addEventListener('change', filterByIngredient);
    // let allIngrediensOptions = []; //! това реално може да се ползва set
    let allIngrediensOptions = new Set();

    let searchNameInput = document.getElementById('searchNameInput');
    searchNameInput.addEventListener("keyup", filterByName);

    let searchDiv = document.getElementById("searchDiv");

    let profileSubmitButton = document.getElementById('profileSubmitBtn');

    let createNewRecepieButton = document.getElementById("addRecepieBtn");

    //!Create and add new recepie to recepiesManager all recepies
    createNewRecepieButton.addEventListener('click', function (e) {
        e.preventDefault();
        let inputs = Array.from(document.querySelectorAll(".newRecInput")).map(el => el.value); //взимаме наведнъж всички инпут+text area елементи от формата
        // console.log(inputs);

        let newRecepie = new Recepie(...inputs);
        recepiesManager.add(newRecepie);

        //зачистване на полетата след създаване на нова рецепта

        Array.from(document.querySelectorAll(".newRecInput")).forEach(input => {
            input.value = '';
        })
    })

    //!Change profile info
    profileSubmitButton.addEventListener('click', function (e) {
        e.preventDefault();

        let usernameNew = document.getElementById("username").value;
        let userAgeNew = document.getElementById("userAge").value;
        let userAddressNew = document.getElementById("userAddress").value;
        let userProfilePicNewSrc = document.getElementById("profileImage").value;

        if (!usernameNew || !userAgeNew || !userAddressNew || !userProfilePicNewSrc) {
            let errorDiv = document.getElementById("alertDiv");
            // console.log(errorDiv);
            errorDiv.style.display = "block";
            setTimeout(() => {
                errorDiv.style.display = "none";
            }, 3000);
            return;
        }

        user.name = document.getElementById("username").value;
        userAgeEl = document.getElementById("userAge").value;
        userAddressEl = document.getElementById("userAddress").value;

        document.getElementById("profilePic").src = document.getElementById("profileImage").value;
    })

    window.addEventListener("load", showPage);
    window.addEventListener("hashchange", showPage);

    //!create new user
    let user = new User();

    //!create recepiesManager
    let recepiesManager = new RecepiesManager();

    //!fill recepie manager with recepies form data source
    recepies.forEach(rece => {

        let recepie = new Recepie(...Object.values(rece));

        recepiesManager.add(recepie); //!add recepie to recepiesManager

        //!fill the select options set with unique ingredients
        let receIngredients = recepie.ingredients.split(", ");
        for (let i = 0; i < receIngredients.length; i++) {
            allIngrediensOptions.add(receIngredients[i]); //вкарваме ingredients в set-а, с уникални стойности
        }

    });

    //!Make array from ingregients SET. Traverse the all ingredients array to create option element and append it to select element
    Array.from(allIngrediensOptions).forEach(ingredient => {
        let option = document.createElement('option');
        option.innerText = ingredient;
        selectEl.appendChild(option);
    })

    //!Show Page
    function showPage(e) {
        //при първоначално зареждане, когато hash реално ни е празен стринг ''
        if (location.hash == '') {
            location.hash = "#allRecepies";
        }

        let hash = location.hash.slice(1);

        switch (hash) {
            case "allRecepies":
                allRecepiesEl.style.display = "flex";
                favRecepies.style.display = "none";
                createRecepie.style.display = "none";
                myProfile.style.display = "none";
                errorPage.style.display = "none";
                searchDiv.style.display = "flex";
                printElements(recepiesManager.allRecepies, allRecepiesEl);
                break;
            case "favRecepies":
                allRecepiesEl.style.display = "none";
                favRecepies.style.display = "flex";
                createRecepie.style.display = "none";
                myProfile.style.display = "none";
                errorPage.style.display = "none";
                searchDiv.style.display = "flex";
                printElements(user.favoriteRecepies, favRecepies);
                break;
            case "createRecepie":
                allRecepiesEl.style.display = "none";
                favRecepies.style.display = "none";
                createRecepie.style.display = "flex";
                myProfile.style.display = "none";
                errorPage.style.display = "none";
                searchDiv.style.display = "none";
                break;
            case "myProfile":
                allRecepiesEl.style.display = "none";
                favRecepies.style.display = "none";
                createRecepie.style.display = "none";
                myProfile.style.display = "flex";
                errorPage.style.display = "none";
                searchDiv.style.display = "none";
                showCoockedRecepies(user.coockedRecepies);
                break;
            default:
                allRecepiesEl.style.display = "none";
                favRecepies.style.display = "none";
                createRecepie.style.display = "none";
                myProfile.style.display = "none";
                errorPage.style.display = "flex";
                searchDiv.style.display = "none";
                errorMessage();
                break;
        }

    }

    //!Print elements (recepies)
    function printElements(elements, container) {
        //!Преди всяко викане контейнерът трябва да се зачисти, иначе става дуплициране на съдържание
        container.innerHTML = '';

        //!Създаване на темплейта
        let templateSource = document.getElementById("recepie-template").innerHTML;
        let template = Handlebars.compile(templateSource);

        //!пълнене на съдържание, чрез темплейт
        elements.forEach(el => {
            let newEl = {
                isLiked: user.recepieIsLiked(el.id),
                ...el
            }
            let recepieHTML = template(newEl);
            container.innerHTML += recepieHTML;
        });

        let allFavBtns = document.querySelectorAll(".addFavBtn"); //!бутоните за любими са с брой, равен броя на елементите и би трябвало да са в същата поредност
        let allCookBtns = document.querySelectorAll(".cookBtn"); //!бутоните зя сготви са с брой, равен на броя ня елементите и би трябвало да са в същата поредност



        allFavBtns.forEach(addToFavBtn => {
            addToFavBtn.addEventListener("click", function (e) {
                let clickedRecepieId = e.currentTarget.dataset.id; //!Ползваме поленце data-id от темплейта, в което е вкарано id-то на рецептата, по което я намираме
                //console.log(e.currentTarget.dataset.id);

                if (!user.recepieIsLiked(clickedRecepieId)) { //ако рецептата не е в любими
                    //find recepie in all recepies by id
                    let recepie = recepiesManager.allRecepies.find(rec => rec.id == clickedRecepieId);
                    user.addToFavorites(recepie);
                    e.currentTarget.textContent = 'Премахни от любими';
                } else {
                    user.removeFromFavorites(clickedRecepieId); //remove from user favorite recepies arr
                    e.currentTarget.textContent = "Добави в любими";
                    if (location.hash == "#favRecepies") {
                        e.target.parentElement.parentElement.remove(); //remove the DOM element from favRecepies page
                    }
                }
            })
        });

        allCookBtns.forEach(cookBtn => {
            cookBtn.addEventListener("click", function (e) {
                let clickedRecepieId = e.currentTarget.dataset.id;
                let cookedRecepie = recepiesManager.allRecepies.find(rec => rec.id == clickedRecepieId);
                user.addToCookedRecepies(cookedRecepie);
            })
        });

    };


    //!Filter by ingredient function
    function filterByIngredient(e) {
        // console.log(e.target.value);
        let filteredRecepies = recepiesManager.filterIngredient(e.target.value);
        if (location.hash === "#allRecepies") {
            printElements(filteredRecepies, allRecepiesEl);
        } else if (location.hash === "#favRecepies") {
            printElements(filteredRecepies, favRecepies);
        }

    }

    //!Filter by name function
    function filterByName(e) {
        // console.log(e.target.value);
        let filteredRecepies = recepiesManager.filterName(e.target.value);
        if (location.hash === "#allRecepies") {
            printElements(filteredRecepies, allRecepiesEl);
        } else if (location.hash === "#favRecepies") {
            printElements(filteredRecepies, favRecepies);
        }
    }

    //!Error page redirect after 5 seconds
    function errorMessage() {

        let timeEl = document.getElementById("timeEl");
        timeEl.textContent = '';
        timeEl.style.color = "white";
        let seconds = 5;

        let time = setInterval(takeTime, 1000);

        function takeTime() {
            timeEl.textContent = `${seconds}`;
            seconds--;
            if (seconds == 0) {
                clearInterval(time);
                location.hash = "#allRecepies";
            }

        }
    }


    //!Зареди сготвените рецепти и също така, попълни полетата за промяна на данните на юзъра с текущите данни
    function showCoockedRecepies(coockedRecepies) {
        let usernameEl = document.getElementById("username");
        let userAgeEl = document.getElementById("userAge");
        let userAddressEl = document.getElementById("userAddress");
        let profileImageEl = document.getElementById("profileImage");

        usernameEl.value = user.name;
        userAgeEl.value = user.age;
        userAddressEl.value = user.address;

        let table = document.getElementById("coockedRecepiesTable");
        table.innerHTML = "";

        for (const recepieTitle in coockedRecepies) {
            let tr = document.createElement("tr");

            let td1 = document.createElement('td');
            let td2 = document.createElement('td');

            td1.textContent = recepieTitle;
            td2.textContent = coockedRecepies[recepieTitle];

            tr.append(td1, td2);
            table.appendChild(tr)
        }
    }


})();