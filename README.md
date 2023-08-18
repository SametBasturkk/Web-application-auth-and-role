
## Description

Welcome to the **User Management System**! This project is designed to manage user information, registration, login, banning, and removal operations. It provides a backend API service using Node.js and PostgreSQL to handle these functionalities.

## Endpoints

The User Management System offers the following API endpoints:

1.  `GET /users`: Fetches a list of users with their details.
2.  `POST /register`: Registers a new user with a username, password, and sets the ban status to "no".
3.  `POST /login`: Allows a user to log in with a username and password. Updates the last login date.
4.  `POST /usercheck`: Checks if a user exists and is not banned.
5.  `POST /ban`: Bans user(s) by changing their ban status to "yes".
6.  `POST /unban`: Unbans user(s) by changing their ban status to "no".
7.  `POST /remove`: Removes user(s) from the system.
