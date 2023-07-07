# Login and Signup Page

This is a login and signup page implemented using HTML, CSS, Node.js, Express.js, and MySQL. It allows users to sign up, stores their signup details in a MySQL database, and enables them to log in if their account exists.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js: You can download it from the official website - [Node.js](https://nodejs.org)
- MySQL: You can download it from the official website - [MySQL](https://www.mysql.com/)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/login-signup-page.git
   ```

2. Navigate to the project directory:

   ```bash
   cd login-signup-page
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the MySQL database:

   - Open the MySQL command-line interface or any MySQL GUI tool.
   - Create a new database:

     ```sql
     CREATE DATABASE login_signup;
     ```

   - Switch to the newly created database:

     ```sql
     USE login_signup;
     ```

   - Create a table to store user details:

     ```sql
     CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
     );
     ```

   - Modify the MySQL connection settings in the `config.js` file located in the project's root directory, if necessary.

5. Start the application:

   ```bash
   node app.js
   ```

6. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the login and signup page.

## Usage

- Sign Up: Fill in the required details (username and password) and click the "Sign Up" button. If the username is unique and the password meets the specified requirements, a new account will be created in the database.

- Log In: Enter your username and password and click the "Log In" button. If the provided credentials match an existing user in the database, you will be redirected to a success page. Otherwise, an error message will be displayed.

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvement, please create a new issue or submit a pull request.
## Acknowledgments

- [Node.js](https://nodejs.org)
- [Express.js](https://expressjs.com)
- [MySQL](https://www.mysql.com/)
.
