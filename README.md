# Build a CRUD for the Nave Back End test.

I'll be using:
* postgres for the database
* sequelize for migrations, seeds and queries
* express.js for routes and rendering

## Full Stack Check List for Navedex:

### Full system:
* [X] follow MVC patterns;
* [X] create user with email and password;
* [X] once loged, the user may have access for data like: name, birthdate, role in the company, years in the company, admission date, projects that he/she took part in; 
* [] entities of USERS, NAVERS and PROJECTS must have relations with each other;
* [] MUST: be possible to see wich project a NAVER is assigned to and vice-versa, based on the users request;

### What must be delivered:
* [] a RESTful API in node.js;
* [] a proper documentation of how the API can be tested - Insomnia shall sufice;

### Funcionalities:
-- User
* [X] Authentication: signup - receive an e-mail and password to create a new entry in the DB;
* [X] Authentication: login - must be in a JWT token;
* [X] the following routes must NOT be accessible by users that don't have the token;

-- Navers
* [] Navers: route index by => *years of work in the company*, *name* and *role*;
* [] Navers: route show => returns only one;
* [X] Navers: route store => creates a Naver;
* [] Navers: route update;
* [] Navers: route delete *an user can only delete it's own Naver*;

-- Projects
* [] Projects: route filter by *name of the user*;
* [] Projects: route detail a project (showing the Navers that participate in it);
* [X] Projects: route create - return an object;
* [] Projects: route update project *by id*, and *only the user can delete his/her projects*;

-- Must
* [] All responses must be in JSON format.

-- Showoff bonus
* [] Front-end with a simple Bootstrap UI;

### Database model:
![](https://app.lucidchart.com/publicSegments/view/efcdfa64-443d-4c3e-afe1-a909581c604f/image.png)

## Useful hints / documentation

  When creating an user with Insomnia, instead of *email and password*, use *email and passcode*.
  This will generate the hash with bcrypt.
  
### Done:
  create server folder;

  generate express app;
  
  create git repo and sync;

  create postgres database via docker;
  
  create database: "navers", "user", "project";

  create models: "navers", "user", "project";

  create initial interaction and validation of the post functionality of "navers", "user", "project";

  md5encryption: testebackendnave => 52bf70d79d5da983c1b9327439b8f8e4

  still needs work: get users can't return passwords.
  update project must change name.