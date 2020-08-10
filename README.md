# Build a CRUD for the Nave Back End test.

For this test, I used:
* postgres for the database
* sequelize for migrations and queries (and it was a pain)
* express.js for routes and rendering
* insomnia for debug and real time results
* dbeaver for database interface
* vscode for development
* eslint and prettier set with airbnb standards

## Full Stack Check List for Navedex:

### Full system:
* [X] follow MVC patterns;
* [X] create user with email and password;
* [X] once loged, the user may have access for data like: name, birthdate, role in the company, years in the company, admission date, projects that he/she took part in;
* [X] entities of USERS, NAVERS and PROJECTS must have relations with each other;
* [X] MUST: be possible to see wich project a NAVER is assigned to and vice-versa, based on the users request;

### What must be delivered:
* [X] a RESTful API in Node.JS;
* [X] a proper documentation - all code is documented inside of it - Insomnia shall sufice - ***inside the folder 'Assets' I've included a file with all queries that I used and a Postgres dump file with the database used***;

### Funcionalities:
-- User
* [X] Authentication: signup - receive an e-mail and password to create a new entry in the DB;
* [X] Authentication: login - must be in a JWT token;
* [X] the following routes must NOT be accessible by users that don't have the token;
* [X] Index by users own Navers

-- Navers
* [X] Navers: route index by => 
    [F] *years of work in the company*, 
    [X] *user*;
    [X] *name*; 
    [X] *role*;
* [X] Navers: route show => returns only one;
* [X] Navers: route store => creates a Naver;
* [X] Navers: route update;
* [X] Navers: route delete *an user can only delete it's own Naver*;

-- Projects
* [X] Projects: route filter by *user*;
* [X] Projects: route detail a project (showing the Navers that participate in it);
* [X] Projects: route create - return an object;
* [X] Projects: route update project *by id*,
* [X] Projects: *only the user can delete his/her projects*;

-- Must
* [X] All responses must be in JSON format.

### Database model:
![](https://app.lucidchart.com/publicSegments/view/00a9616b-92ab-40f6-9858-ee027c8edfb4/image.png)

## Useful hints / extra documentation
 * When creating an user with Insomnia, instead of *email and password*, use *email and passcode*.
 * This will generate the hash with bcrypt.
 * When you create your user, you should 1st authenticate and then change the environment variable "token" with your new JWT token received in the authenticate json resposne, so you can access the routes and test the code.

### BUGS FOUND:
 * Can't get why the Naver delete method goes through, but stays in the Insomnina request loop until it's canceled. (but the Naver is deleted from DB)