# Tasty Delights App

This is a web application built with **React**, **Node.js**, **MySQL**, and **Sequelize**. The app allows users to create and share recipes. Users need to login to access the features of the application.

## Features

- User Registration: Users can create an account by providing their email and password.
- User Login: Registered users can log in to their accounts using their credentials.
- Recipe Creation: Logged-in users can create and share their recipes by providing details such as recipe name, ingredients, and instructions.
- Recipe Listing: Users can view a list of all the recipes shared by different users.
- Recipe Details: Clicking on a recipe will display its details, including ingredients and instructions.
- Authentication and Authorization: The app uses JSON Web Tokens (JWT) to authenticate and authorize users.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime environment for server-side development.
- MySQL: A relational database management system.
- Sequelize: An Object-Relational Mapping (ORM) tool for Node.js, used to interact with the MySQL database.
- Formik: A form library for React that helps with form handling and validation.
- JSON Web Tokens (JWT): A compact and self-contained method for securely transmitting information between parties as a JSON object.

## Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.
- MySQL: Set up a MySQL database to store the recipes and user information.

## Installation

1. Clone the repository:

```
git clone https://github.com/SathvikGitta/Tasty-Delights.git
```

2. Navigate to the project directory:

```
cd TastyDelights
```

3. Install the dependencies:

```
npm install /  yarn install 
```

4. Configure the database:

   - Create a new MySQL database.
   - Rename the `.env.example` file to `.env` and update the database credentials.

5. Start the development server:

```
npm start
```

6. Open your browser and visit `http://localhost:3000` to access the Tasty Delight App.

## Folder Structure

- `client`: Contains the React client-side code.
- `server`: Contains the Node.js server-side code.



## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Formik](https://formik.org/)
- [JSON Web Tokens (JWT)](https://jwt.io/)
