# Simple TODO API 

This Repository created for Backend Developer Internship Selection in https://www.dot.co.id/.

## Design Pattern 

This Project used Model-View Controller(MVC) design pattern. Why use MVC? Because it helps keep things organized:  where each part has its role (Model for data, View for presentation, Controller for managing), MVC keeps your software organized and easier to manage such as maintability, reusability, and debugging.

## API Structure

This README provides a comprehensive explanation of the API structure for our application, implemented using Express.js and Mongoose. The API offers endpoints for managing users and todos. allowing users to perform CRUD operations efficiently.

### Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Database Structure](#database-structure)
4. [API Endpoints](#api-endpoints)
    - [1. GET /api/users](#1-get-users)
    - [2. POST /api/users](#2-post-users)
    - [3. GET /api/users/:id](#3-get-usersid)
    - [4. GET /api/todos](#4-get-todos)
    - [5. POST /api/todos](#5-post-todos)
    - [6. PUT /api/todos/:id](#6-update-todosid)
    - [7. DELETE /api/todos/:id](#7-delete-todosid)

### Prerequisites

Before running the API, ensure you have the following installed:

- Node.js (v12 or above)
- MongoDB (configured and running)
- npm (Node Package Manager)

### Getting Started

To set up and run the API, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Configure the MongoDB connection URL in .env
4. Start your MongoDB server and make sure it is running.
5. Run the API using `npm start` or Run the test using `npm test`.


## Database Structure

The API utilizes MongoDB as the database. It consists of three main schemas:

### User Schema

The `userSchema` represents users in the system. Each user is associated with a unique `_id`, represented as a `String` type. The schema includes the following properties:

- **_id**: A unique identifier for the user (String).
- **name**: The name of the user (String, required).
- **usename**: The username of the user (String, required).
- **password**: The password of the user (String, required).

Example:

```json
{
  "_id": "6152f0f5a7b6d3f582ed85da",
  "name": "John Doe",
  "username": "johndoe",
  "password": "johnjohn"
}
```

### Todo Schema

The `todoSchema` represents todos associated with users in the system. Each todo is associated with a unique `_id`, represented as a `String` type. The schema includes the following properties:

- **_id**: A unique identifier for the todo (String).
- **title**: The title of the todo (String, required).
- **description**: The description of the todo (String).
- **date**: The date of the todo (Date). 
- **userId**: The `_id` of the user who created the todo (Reference to `User`, required).

Example:

```json
{
  "_id": "6152f0f5a7b6d3f582ed85d0",
  "title": "Video 1",
  "description": "To conduct something better",
  "date": "2023-09-29T03:53:26.309Z",
  "userId": "6152f0f5a7b6d3f582ed85da"
}
```


### API Endpoints

The API offers the following endpoints for managing users and todos:


### 1. GET /api/users

- **Description**: This endpoint retrieves a list of all users available in the database.

- **HTTP Method**: GET
- **Authorization**: To access this endpoint, you must include a valid bearer token in the Authorization header of your request. The bearer token should be obtained through the authentication process. Unauthorized access will result in a 401 Unauthorized response.

- **Response**: The response will be an array of user objects, each containing `_id`, `name`, and `username`.

- **Example Success Response**:
- Status Code: 200
```json
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "_id": "6152f0f5a7b6d3f582ed85da",
    "name": "John Doe",
    "username": "johndoe"
  },
  {
    "_id": "6152f0f5a7b6d3f582ed85db",
    "name": "Jane Smith",
    "username": "janesmith",
  },
  // More users...
]
```
- **Error Response**
  - Status Code: 401 Unauthorized
    - Content: Problem on token
  - Status Code: 404 Not Found
    - Content: `{message: 'Users not found'}`
  - Status Code: 500 Internal Server Error
    - Content: `{ message: 'Error retrieving users', error: error message from catching the failure }`

### 2. POST /api/users

- **Description**: This endpoint allows creating a new user in the system.

- **HTTP Method**: POST

- **Request Body**: The request body should include the following properties:
  - `name` (required): The name of the user (String).
  - `username`: The username of the user (String).
  - `password`: The password of the user (String)

- **Response**: The response will be the newly created user object, including its assigned `_id`.

- **Example Request**:
```json
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "password": "johnjohn"
}
```

- **Example Success Response**:
- Status Code: 201
```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "_id": "6152f0f5a7b6d3f582ed85da",
  "name": "John Doe",
  "username": "johnjohn",
  "password": "$2b$10$DIv8llBcMGldI9ZA1kDbbeNBkiTZ/YmLdkVNC6cbfII0HIrZNfica"
}
```
- **Error Response**
  - Status Code: 500 Internal Server Error
    - Content: `{ message: 'Error creating user', error: error message from catching the failure }`


### 3. GET /api/users/:id

- **Description**: This endpoint retrieves a specific user by their unique ID.

- **HTTP Method**: GET

- **URL Parameter**: The `id` parameter in the URL represents the `_id` of the user to retrieve.

- **Authorization**: To access this endpoint, you must include a valid bearer token in the Authorization header of your request. The bearer token should be obtained through the authentication process. Unauthorized access will result in a 401 Unauthorized response.

- **Response**: The response will be the user object with the matching ID, including `_id`, `name`, and `username`.

- **Example Request**: GET /users/6152f0f5a7b6d3f582ed85da

- **Example Success Response**:
- Status Code: 200
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "6152f0f5a7b6d3f582ed85da",
  "name": "John Doe",
  "username": "johnjohn"
}
```

- **Error Response**
  - Status Code: 401 Unauthorized
    - Content: Problem on token
  - Status Code: 404 Not Found
    - Content: `{ message: "User with id '6152f0f5a7b6d3f582ed85da' not found" }`
  - Status Code: 500 Internal Server Error
    - Content: `{ message: 'Error retrieving user', error: error message from catching the failure }`



### 4. GET /api/todos

- **Description**: Retrieve a list of todo items based on a specific userId available in the database.

- **HTTP Method**: GET

- **Authorization**: To access this endpoint, you must include a valid bearer token in the Authorization header of your request. The bearer token should be obtained through the authentication process. Unauthorized access will result in a 401 Unauthorized response.


- **Response**: An array of todo objects, each containing `_id`, `title`, `description`, `date`, and `userId`.

- **Example Success Response**:

- Status Code: 200 OK
```json
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "_id": "6152f0f5a7b6d3f582ed85da",
    "title": "Task 1",
    "description": "Complete task 1",
    "date": "2023-09-20T10:00:00.000Z",
    "userId": "6152f0f5a7b6d3f582ed85db"
  },
  {
    "_id": "6152f0f5a7b6d3f582ed85db",
    "title": "Task 2",
    "description": "Complete task 2",
    "date": "2023-09-21T12:00:00.000Z",
    "userId": "6152f0f5a7b6d3f582ed85db"
  },
  // More todo items...
]
```

- **Error Response**
  - Status Code: 401 Unauthorized
    - Content: Problem on token
  - Status Code: 404 Not Found
    - Content: `{ message: "Todos not found" }`
  - Status Code: 500 Internal Server Error
    - Content: `{ "message": "Error retrieving todos", "error": "error message from catching the failure" }`


### 5. POST /api/todos

- **Description**: Create a new todo item in the system.

- **HTTP Method**: POST

- **Request Body**: The request body should include the following properties:
  - `title` (required): The title of the todo item (String).
  - `description`: The description of the todo item (String).
  - `date`: The due date of the todo item (Date).
  - `userId` (required): The user ID associated with the todo item (String).

- **Authorization**: To access this endpoint, you must include a valid bearer token in the Authorization header of your request. The bearer token should be obtained through the authentication process. Unauthorized access will result in a 401 Unauthorized response.


- **Response**: The newly created todo item object, including its assigned `_id`.

- **Example Request**:
```json
POST /api/todos
Content-Type: application/json
```json
{
  "title": "Task 1",
  "description": "Complete task 1",
  "date": "2023-09-20T10:00:00.000Z",
  "userId": "6152f0f5a7b6d3f582ed85db"
}
```

- **Example Success Response**:
- Status Code: 201
```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "_id": "6152f0f5a7b6d3f582ed85da",
  "title": "Task 1",
  "description": "Complete task 1",
  "date": "2023-09-20T10:00:00.000Z",
  "userId": "6152f0f5a7b6d3f582ed85db"
}
```

- **Error Response**
  - Status Code: 401 Unauthorized
    - Content: Problem on token
  - Status Code: 500 Internal Server Error
    - Content: `{ message: 'Error creating todo', error: error message from catching the failure }`


### 6. PUT /api/todos/:id

- **Description**: Update an existing todo item by its `_id`.

- **HTTP Method**: PUT

- **URL Parameter**: The `id` parameter in the URL represents the `_id` of the todo item to update.

- **Request Body**: The request body should include the fields you want to update, such as `title`, `description`, `date`, and `userId`.

- **Authorization**: To access this endpoint, you must include a valid bearer token in the Authorization header of your request. The bearer token should be obtained through the authentication process. Unauthorized access will result in a 401 Unauthorized response.


- **Response**: The updated todo item object.

- **Example Request**:
```json
PUT /api/todos/6152f0f5a7b6d3f582ed85da
Content-Type: application/json

{
  "title": "Updated Task 1",
  "description": "Updated description",
  "date": "2023-09-22T14:00:00.000Z",
  "userId": "6152f0f5a7b6d3f582ed85db"
}
```

- **Example Success Response**:
- Status Code: 200
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "6152f0f5a7b6d3f582ed85da",
  "title": "Updated Task 1",
  "description": "Updated description",
  "date": "2023-09-22T14:00:00.000Z",
  "userId": "6152f0f5a7b6d3f582ed85db"
}
```

- **Error Response**
  - Status Code: 401 Unauthorized
    - Content: Problem on token
  - Status Code: 404 Not Found
    - Content: `{ "message": "Todo with id '6152f0f5a7b6d3f582ed85da' not found" }`
  - Status Code: 500 Internal Server Error
    - Content: `{ message: 'Error updating todo', error: error message from catching the failure }`


### 7. DELETE /api/todos/:id

- **Description**: Delete an existing todo item by its `_id`.

- **HTTP Method**: DELETE

- **URL Parameter**: The `id` parameter in the URL represents the `_id` of the todo item to delete.

- **Authorization**: To access this endpoint, you must include a valid bearer token in the Authorization header of your request. The bearer token should be obtained through the authentication process. Unauthorized access will result in a 401 Unauthorized response.


- **Response**: A success message indicating the deletion.

- **Example Request**: GET /users/6152f0f5a7b6d3f582ed85da


- **Example Success Response**
- Status Code: 200
```json
HTTP/1.1 200 OK
Content-Type: application/json

{ "message": "Todo deleted successfully" }
```

- **Error Response**
  - Status Code: 401 Unauthorized
    - Content: Problem on token
  - Status Code: 404 Not Found
    - Content: `{ "message": "Todo with id '6152f0f5a7b6d3f582ed85da' not found" }`
  - Status Code: 500 Internal Server Error
    - Content: `{ message: 'Error deleting todo', error: error message from catching the failure }`


Please note that the examples provided above are for illustrative purposes and the actual data may vary depending on your specific application and database. Also, ensure to replace `'DATABASE_URL'` with the actual URL to your MongoDB server.


