> # **COUNTRIES 🌍** | Individual Project

<br>

> ## **DESCRIPTION**

-    This project was developed for the individual project of _`the Henry Bootcamp`_.
-    The Front-End was built using ReactJS, React Redux, Redux Toolkit, React Router Dom, Typescript, Sweetalert2, FontAwesome.
-    The Back-End was built using Express, Sequelize, Axios, Cors, Dotenv, Concurrently, JSON Server, npm-run-all, pg.
-    The Database was created using PostgreSQL.

<br>

---

<br>

> ## **FUNCTIONING**

-    Display a list of countries.
-    Display details of each country.
-    Display a list of created tourist activities.
-    Display details of each created tourist activity.
-    Search for countries by name.
-    Filter countries by tourist activity and by continent.
-    Sort in ascending and descending order by initial of name, area, and population.
-    Create a tourist activity.
-    Create an account and log in.
-    Includes pagination.

<br>

---

<br>

> ## **DATABASE**

-    It has a database called _`db_countries`_.
-    It consists of 3 tables: _`Users`_, _`Countries`_ y _`Activities`_.

> ### **MODELS 📍**

#### _📍 Users_

-    ID\*.
-    Name\*.
-    Surname\*.
-    Email\*.
-    Password\*.

#### _📍 Countries_

-    ID\*.
-    Name\*.
-    Flag\*.
-    Continent\*.
-    Capital\*.
-    Subregion\*.
-    Area\*.
-    Population\*.

#### _📍 Activities_

-    ID\*.
-    Name\*.
-    Difficulty\*.
-    Duration\*.
-    Season\*.

<br>

---

<br>

> ## **BACK-END**

-    The data is fetched from the _`db.json`_ file, which is used to generate a json-server.

> ### **📌 ROUTE TO USE**

-    **GET** _http://localhost:5000/countries_

> ### **📌 CREATED ROUTES**

-    **GET** _http://localhost:4001/user_
-    **GET** _http://localhost:4001/user/:idUser_
-    **POST** _http://localhost:4001/user_
-    **GET** _http://localhost:4001/countries_
-    **GET** _http://localhost:4001/countries?=name_
-    **GET** _http://localhost:4001/countries/:idCountry_
-    **GET** _http://localhost:4001/activities_
-    **GET** _http://localhost:4001/activities/:idActivity_
-    **POST** _http://localhost:4001/activities_

<br>

---

<br>

> ## **FRONT-END**

> ### **PAGES OR ROUTES 🗃**

-    `Home` - Show the countries in cards.
-    `Activity` - Display the listed tourist activities.
-    `Country Detail` - Display the detail of a specific country.
-    `Activity Detail` - Display the detail of a specific tourist activity.
-    `Create Activity` - Here it displays a form to create a new tourist activity.
-    `Sign In` - Displays a login form.
-    `Sign Up` - Displays a registration form.
-    `Not Found` - It will be displayed if you navigate to a non-existent route.

> ### **HIGHLIGHTED COMPONENTS ⚙**

-    `Navbar` - Allows navigation between different pages.
-    `Searchbar` - Allows searching for a country by name.
-    `Filters` - Fulfills the function of filtering countries.
-    `Pagination Country` - Serves for page pagination.
-    `Pagination Activity` - Serves for page pagination.

<br>

---

<br>

<img src="https://wallpaperaccess.com/full/1989883.jpg" />
