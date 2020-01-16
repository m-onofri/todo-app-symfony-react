# Simple Todo App with Symfony 5 and React

In this personal project I created a simple Todo App.
Users can define a list of projects, and for each project can define a list of activities required to complete the project.
The back-end of the project is based on the Symfony 5 framework and mySQL database, while the front-end of the project is based on the React library.

## How to clone the app locally

Clone the git repository in the folder of your choice:
```
git clone https://github.com/m-onofri/todo-app-symfony-react.git
```

Install the packages:
```
cd todo-app-symfony-react/back_end
composer install
```
```
cd todo-app-symfony-react/front_end
npm install
```

Run the back-end server:
```
symfony server:start
```

Run the front-end server:
```
npm start
```

In your browser, go to http://localhost:3000/, and have a look at the app.


## Main features

* Users can define a list of projects.
* When a project is completed, the app allows the user to set the project as completed.
* For each project users can define a list of activities that are required to complete the project.
* Activities exist in three diffent states:
    * "Todo": the activity was just defined, but the user didn't start it yet;
    * "In Progress": the user has started the activity but didn't finish it yet;
    * "Completed": the activity was completed.
* User can update the name of the projects and the activities (exept when they are completed), and they can also delete projects and activities.

## Cross-browser consistency 

The project was checked on MacOS in Chrome, Firefox, Opera and Safari, and on these browsers it works properly.