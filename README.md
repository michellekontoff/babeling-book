<p align='center'>
  <img src='./react-app/src/assets/images/logo.png' height='200px'>
</p>

# Babeling Book
Babeling Book is a blogging app designed to language-learners who want to practice their writing skills while writing things they care about. In addition to commenting on the contents of a post, users are encouraged to help each other grow linguistically by offering corrections and suggestions.

* Live site: <a href='https://babelingbook.herokuapp.com/'>Babeling Book on Heroku</a>

* Reference to the Babeling Book <a href='https://www.github.com/michellekontoff/babelingbook/wiki'>Wiki Docs</a>

| Table of Contents |
| ----------------- |
| 1. [Features](#features) |
| 2. [Installation](#installation) |
| 3. [Technical Implementation Details](#technical-implementation-details) |
| 4. [Future Features](#future-features) |
| 5. [Contact](#contact) |
| 6. [Special Thanks](#special-thanks) |


## Technologies
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=333333" /></a>
* <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL&logoColor=white" /></a>
* <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white"></a>
* <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"></a>
* <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white"></a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3" /></a>
* <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" /></a>
* <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white" /></a>
* <a href="https://www.heroku.com/home"><img src="https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=white" /></a>


## Features

### Log In and Sign Up
![Sign Up](./readme-assets/images/signup.jpg)
![Login](./readme-assets/images/login.jpg)
Log in as a demo user, or create your own account to see what Babeling Book has to offer.

### Posts
Babeling Book view all the posts you've made by selecting 'Your Posts' in the navbar.
Or view the most recent posts on the Latest Post's page.
![Feed Page](./readme-assets/images/feed.jpg)

### View Post
See the full contents of a single post
![{resource-1} Page](./readme-assets/images/{resource-1}-page.jpg)

### Add Post
Add a new Post to the database
![Add Post](./readme-assets/images/{resource-1}-add.jpg)

### Edit or Delete Post
Edit or delete a post to change the title, contents, or language, or remove it from the database.
![Edit Post]()

### Create, Read, Update, Delete {resource-1} {resource-2-plural}
View a comments for a post on that post's page.
![{resource-2-plural}](./readme-assets/images/{resource-2-plural}.png)
Add comments, edit them, or delete them.
![Edit {resource-2-plural}](./readme-assets/images/{resource-2-plural}-edit.png)
![Add {resource-2-plural}](./readme-assets/images/{resource-2-plural}-add.png)


## Installation
To build/run project locally, please follow these steps:

1. Clone this repository

```shell
git clone https://github.com/michellekontoff/babelingbook.git
```

2. Inside root '/' directory, install Pipfile dependencies and create the virtual environment
```shell
pipenv install
```

2. Navigate to `/react-app` and install npm dependencies

```shell
cd react-app
npm install
```

3. In the `/` root directory, create a `.env` based on the `.env.example` with proper settings

4. Setup your PostgreSQL user, password and database and ensure it matches your `.env` file

5. Before running any flask commands, confirm you are in the pipenv virtual env. If not, make sure you're in the root directory '/' and run the command:
```shell
pipenv shell
```

5. In the root folder, create the database by running in the terminal:
```shell
flask db create
```

6. In the root folder, migrate tables to the database by running in the terminal:
```shell
flask db migrate
```

7. In the root folder, seed the database by running in the terminal:
```shell
flask seed all
```

8. Start the flask backend in the `/` root directory
```shell
flask run
```

9. Start the frontend by navigating to `/react-app` directory and running

```javascript
npm start
```


## Technical Implementation Details

### {Detail 1}
Description 1

Part of code is shown below:

```python
print('add code snippet 1 here')
```

Description 2

```javascript
print('add code snippet 2 here')
```

### {Detail 2}
Description 1

Code snippet is shown here:

```javascript
print('add code snippet 1 here')
```


## Future Features

1. __Search__ - search {resource-1-plural}

2. __Second Feature__ - second feature details


## Contact

### {Your Name}
<a href="https://www.linkedin.com/in/{linkedin-handle}/"><img src="./readme-assets/logos/linkedin-logo.png" height="28" align="middle" /></a>
<a href="https://angel.co/u/{angel-list-handle}"><img src="./readme-assets/logos/angellist-logo.png" height="28" align="middle" /></a>
<a href="https://github.com/{github-handle}"><img src="./readme-assets/logos/github-logo.png" height="38" align="middle" /></a>

{email}


## Special Thanks
* Fellow peers who have given me support and community: [Andrew](https://github.com/andru17urdna), [Henry](https://github.com/hnrywltn), [Pierre](https://github.com/TheGuilbotine), [Lema](https://github.com/lemlooma), [Meagan](https://github.com/meagan13), [Simon](https://github.com/Simonvargas), [Michelle](https://github.com/michellekontoff), [Nico](https://github.com/nicopierson), [John](https://github.com/Jomix-13), [Manna](https://github.com/makon57), and [Monte](https://github.com/theflaggship)
* Mentors who have given me their time and effort: [Zach](https://github.com/zdwatts), [Olivia](https://github.com/OByrnes), [Ed](https://github.com/edherm), and [Javier](https://github.com/javiermortiz) 
