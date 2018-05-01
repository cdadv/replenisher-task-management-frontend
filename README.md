# replenisher-task-management-frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.4.

## How to use:
**I deployed backend and frontend to AWS server.** You can try the app by using ip address and port number http://54.213.41.232:4200/ (I am aslo planning to setup DNS domain mapping for this ip address use Nginx in my AWS server. But use ip address to access for now.)   

Running unit tests:    
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Running end-to-end tests:   
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

I pre-setup some demo account for logging in and play around in http://54.213.41.232:4200/:     

- Admin account: 
	- id:1 - admin_user:admin_password     

- Manager account: 
	- id:5 - manager_user_1:manager_password_1 
	- id:6 - manager_user_2:manager_password_2    

- User account: 
	- id:2 - staff_user_1:staff_password_1
	- id:3 - staff_user_2:staff_password_2 
	- id:4 - staff_user_3:staff_password_3    

## Tech stack I used:
- For Backend:
	- **Java** with **Spring** framework
	- **MySql** for main data storage
	- **Redis** for token with expiration date storage 
- For Frontend:
	- **TypeScript** with **Angular 5** framework
	- **Angular Metrial Design** for styling and UI design
	
## Project goal illustration:
I listed all the requirements from the spec sheet I got from WalmartLabs and demostrated how did I achieved these features.

1. "individuals to create independent tasks to be added to their personalized task list.":   

I implemented user-role based oauth authentication in backend. All CRUD services for Task and TaskTemplate is 
Different individual will be able to see different tasks for them or related to them. Which means a manager will be able to see all their staff's task, a staff can only see their own project and won't be able to see other staff's tasks.

2. "it should also be exposed as so that other tasks can be created on behalf of the user.":

All the endpoints are exposed. If you have a proper access_token you will be able to request CRUD services for tasks and task templates.

3. "Keep in mind the desire to capture metrics and usage patterns to drive future enhancements"

I created global expcetion handler in backend to handle all expected and unexpected expections and in the future if I have more time I may store all the exceptions along with user log in and operation event to database.

4. "management of template tasks by experienced group, and assignment of these templates as recurring tasks to individuals.  "

I created endpoints and services for managing task and task templates separately. Task Template have the ability to create Task periodically. User can select if the template will recurringly create a task and use cron job expression to setup recurring periods.

5. "Display sorted list of pending tasks":

I finished this by created an endpoints in backend for sorting using the "Rank" algorithm mentioned in the Specs. And the basic sort for string and date are done in frontend.

## How to deploy: 
(I am also planning to improve deployment steps of this project with Docker if I have more time...)

### [Ubuntu] frontend
1. Install npm

`cd ~`	

`curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh`	

`sudo bash nodesource_setup.sh`	

`sudo apt-get install nodejs`	


2. Install angular cli

`npm install -g @angular `	

## How to build:
### [Ubuntu] frontend
cd to frontend director and run `npm install` command.
To run the application use command `ng serve --host 0.0.0.0` Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

