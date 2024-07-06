# Task Management API
Welcome to the Task Management API documentation. This document provides detailed information on how to use the API, including the available endpoints, request and response formats, and examples. 
### (render deploy link:  https://task-manager-backend-sobk.onrender.com)

## Table of Contents
1. Introduction
2. Authentication
    Register a New User
    Login a User
3. Task Management
    Create a Task
    Get All Tasks
    Get a Task by ID
    Update a Task
    Delete a Task
4. Running Tests
5. Error Handling
6. Running the Project
7. Database Configuration

## Introduction
The Task Management API allows users to manage their tasks efficiently. It provides endpoints for user registration, authentication, and CRUD operations for tasks. Each task can have a title, description, due date, and priority.

## Authentication

### Register a New User
### Endpoint: POST /api/auth/register

Request Body:

    {
        "username": "string",
        "email": "string",
        "password": "string"
    }

Response:

201 Created:

    {
        "userId": "string"
    }

400 Bad Request: If the input data is invalid.

Example:

code: 
    curl -X POST http://localhost:5000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{
        "username": "testuser",
        "email": "test@example.com",
        "password": "password"
    }'

### Login a User
### Endpoint: POST /api/auth/login

Request Body:

    {
        "email": "string",
        "password": "string"
    }

Response:

200 OK:
    {
        "token": "string"
    }
401 Unauthorized: If login credentials are incorrect.

Example:

code: 
    curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{
        "email": "test@example.com",
        "password": "password"
    }'

## Task Management

### Create a Task
### Endpoint: POST /api/tasks

Request Body:

    {
        "title": "string",
        "description": "string",
        "dueDate": "date",
        "priority": "string"
    }

Response:

201 Created:
    {
        "_id": "string",
        "title": "string",
        "description": "string",
        "dueDate": "date",
        "priority": "string"
    }
400 Bad Request: If the input data is invalid.

Example:

code:
    curl -X POST http://localhost:5000/api/tasks \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    -d '{
        "title": "Sample Task",
        "description": "This is a sample task.",
        "dueDate": "2024-07-10",
        "priority": "High"
    }'

### Get All Tasks
### Endpoint: GET /api/tasks

Response:

200 OK:
    [
        {
            "_id": "string",
            "title": "string",
            "description": "string",
            "dueDate": "date",
            "priority": "string"
        },
        ...
    ]

Example:

code: 
    curl -X GET http://localhost:5000/api/tasks \
    -H "Authorization: Bearer <token>"

### Get a Task by ID
### Endpoint: GET /api/tasks/:taskId

Response:

200 OK:

    {
        "_id": "string",
        "title": "string",
        "description": "string",
        "dueDate": "date",
        "priority": "string"
    }

404 Not Found: If the task with the given ID does not exist.

Example:

code: 
    curl -X GET http://localhost:5000/api/tasks/<taskId> \
    -H "Authorization: Bearer <token>"

### Update a Task
### Endpoint: PUT /api/tasks/:taskId

Request Body:

    {
        "title": "string",
        "description": "string",
        "dueDate": "date",
        "priority": "string"
    }
Response:

200 OK:
    {
        "_id": "string",
        "title": "string",
        "description": "string",
        "dueDate": "date",
        "priority": "string"
    }
400 Bad Request: If the input data is invalid.

404 Not Found: If the task with the given ID does not exist.

Example:

code: 
    curl -X PUT http://localhost:5000/api/tasks/<taskId> \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    -d '{
        "title": "Updated Task Title"
    }'

### Delete a Task
### Endpoint: DELETE /api/tasks/:taskId

Response:

200 OK

Example:
bash code
    curl -X DELETE http://localhost:5000/api/tasks/<taskId> \
    -H "Authorization: Bearer <token>"

## Running Tests
To run tests for the API, use the following command:

code:  npm test

## Error Handling
The API handles errors gracefully and returns appropriate HTTP status codes along with error messages in JSON format.

## Running the Project
To run the project locally, follow these steps:

### Install dependencies:
npm install
### Start the server:
npm start

## Database Configuration
The API uses MongoDB for data storage. Ensure you have MongoDB installed locally or configure the MONGODB_URI environment variable to point to your MongoDB instance.