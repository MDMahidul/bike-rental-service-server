# Bike Rental Backend Server

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [User](#user)
  - [Bikes](#bikes)
  - [Rentals](#rentals)
- [Error Handling](#error-handling)
- [Live Link](#live-link)

## Introduction
This project is a backend server for a bike rental application. It provides RESTful API endpoints for managing users, bikes, and rentals. The server handles user authentication, bike availability, rental creation, and rental return processes.

## Features
- User authentication (signup, login)
- Role-based access control (admin, user)
- CRUD operations for bikes (admin only)
- Rental management
  - Create a rental
  - Return a bike and calculate the rental cost
- Middleware for authentication and authorization
- Error handling

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript
- JWT (JSON Web Tokens) for authentication
- Zod for data validation
- HTTP Status for status code
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation
#### 1. Clone the repository:
   ```bash
   git clone https://github.com/MDMahidul/bike-rental-service-server
   cd bike-rental-service-server
   ```

#### 2. Install dependencies:
```bash 
npm install
```
### Configuration
Create a .env file in the root directory and add the following environment variables:
```bash
NODE_ENV = choose_development_or_production
PORT= 5000
DATABASE_URL= MongoDB_URL
BCRYPT_SALT_ROUNDS= 12
JWT_ACCESS_SECRET= jwt_secret
JWT_ACCESS_EXPIRES_IN= expire_time

```
### Running the server
To start the server in development mode:
```bash
npm run start:dev
```

To start the server in production mode:
```bash
npm run start:prod
```

## API Endpoints
### User Routes:
-  **Sign Up**
    - **Route**: /api/auth/signup (POST)
    - **Request Body**:
        
        ```json
        {
          "name": "John Doe",
          "email": "john@example.com",
          "password": "password123",
          "phone": "1234567890",
          "address": "123 Main St, Anytown",
          "role" : "admin"
        }
        
        ```
    - **Response**:
        
        ```json
        {
          "success": true,
          "statusCode": 201,
          "message": "User registered successfully",
          "data": {
            "_id": "60d9c4e4f3b4b544b8b8d1f5",
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "1234567890",
            "address": "123 Main St, Anytown",
            "role" : "admin",
            "createdAt": "2024-06-10T13:26:51.289Z",
            "updatedAt": "2024-06-10T13:26:51.289Z",
            "__v": 0
          }
        }
        
        ```

- **User Login**
    - **Route**: /api/auth/login (POST)
    - **Request Body**:
        
        ```json
        {
          "email": "john@example.com",
          "password": "password123"
        }
        
        ```
    - **Response**: jwt token will be generate after successfully login
        
        ```json
        {
          "success": true,
          "statusCode": 200,
          "message": "User logged in successfully",
          "token": "jwt_token",
          "data": {
            "_id": "60d9c4e4f3b4b544b8b8d1c3",
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "1234567890",
            "address": "123 Main St, Anytown",
            "role" : "admin"
          }
        }
        ```
- **Get Profile**
    - **Route**: /api/users/me (GET)
    - **Request Headers**: Authorization: Bearer jwt_token
    - **Response**:
        
        ```json
        {
          "success": true,
          "statusCode": 200,
          "message": "User profile retrieved successfully",
          "data": {
              "_id": "6666ff917181b8e5ffe04f91",
              "name": "admin",
              "email": "admin@gmail.com",
              "phone": "1234567890",
              "address": "123 Main St, Anytown",
              "role": "admin",
              "createdAt": "2024-06-10T13:28:49.260Z",
              "updatedAt": "2024-06-10T13:28:49.260Z",
              "__v": 0
          }
        }
        
        ```
        
- **Update Profile**
    - **Route**: /api/users/me (PUT)
    - **Request Headers**: Authorization: Bearer jwt_token
    - **Request Body**:
        
        ```json
        {
          "name": "John Updated",
          "phone": "0987654321"
        }
        
        ```
    - **Response**:
        
        ```json
        {
          "success": true,
          "statusCode": 200,
          "message": "Profile updated successfully",
          "data": {
            "_id": "60d9c4e4f3b4b544b8b8d1c5",
            "name": "John Updated",
            "email": "john@example.com",
            "phone": "0987654321",
            "address": "123 Main St, Anytown",
            "role" : "admin"
          }
        }
        ```
### Bike Routes:

- **Create Bike (Admin Only)**
    - **Route**: /api/bikes (POST)
    - **Request Headers**: Authorization: Bearer jwt_token
    - **Request Body**:
        
        ```json
        {
          "name": "Mountain Bike",
          "description": "A durable mountain bike for rough terrains.",
          "pricePerHour": 15,
          "cc": 250,
          "year": 2022,
          "model": "X1",
          "brand": "Yamaha"
        }
        
        ```
        
    - **Response**:
        
        ```json
        {
          "success": true,
          "statusCode": 200,
          "message": "Bike added successfully",
          "data": {
            "_id": "60d9c4e4f3b4b544b8b8d1c4",
            "name": "Mountain Bike",
            "description": "A durable mountain bike for rough terrains.",
            "pricePerHour": 15,
            "isAvailable": true,
            "cc": 250,
            "year": 2022,
            "model": "X1",
            "brand": "Yamaha"
          }
        }
        
        ```
        
- **Get All Bikes**
    - **Route**: /api/bikes (GET)
    - **Response**:
        
        ```json
        {
          "success": true,
          "statusCode": 200,
          "message": "Bikes retrieved successfully",
          "data": [
            {
              "_id": "bike_id",
              "name": "Mountain Bike",
              "description": "A durable mountain bike for rough terrains.",
              "pricePerHour": 15,
              "isAvailable": true,
              "cc": 250,
              "year": 2022,
              "model": "X1",
              "brand": "Yamaha"
            },
            ...other bikes...
          ]
        }
        
        ```
        
- **Update Bike (Admin Only)**
    - **Route**: /api/bikes/:id (PUT)
    - **Request Headers**: Authorization: Bearer jwt_token
    - **Request Body**:
        
        ```json
        {
          "pricePerHour": 20
        }
        
        ```
        
    - **Response**:
        
        ```json
        {
          "success": true,
          "statusCode": 200,
          "message": "Bike updated successfully",
          "data": {
            "_id": "bike_id",
            "name": "Mountain Bike",
            "description": "A durable mountain bike for rough terrains.",
            "pricePerHour": 20, // Updated price per hour
            "isAvailable": true,
            "cc": 250,
            "year": 2022,
            "model": "X1",
            "brand": "Yamaha"
          }
        }
        
        ```
        
- **Delete Bike (Admin Only)**
    - **Route**: /api/bikes/:id (DELETE)
    - **Request Headers**: Authorization: Bearer jwt_token
    - **Response**:
        
        ```json
        {
          "success": true,
          "statusCode": 200,
          "message": "Bike deleted successfully",
          "data": {
            "_id": "bike_id",
            "name": "Mountain Bike",
            "description": "A durable mountain bike for rough terrains.",
            "pricePerHour": 20,
            "isAvailable": false,
            "cc": 250,
            "year": 2022,
            "model": "X1",
            "brand": "Yamaha"
          }
        }
        
        ```

    ### Rental Routes:

- **Create Rental**
    - **Route**: /api/rentals (POST)
    - **Request Headers**: Authorization: Bearer jwt_token
    - User information will be extracted from the token
    - Bike's availability status will be updated to false
    - **Request Body**:
        
        ```json
        {
          "bikeId": "60d9c4e4f3b4b544b8b8d1c4",
          "startTime": "2024-06-10T09:00:00Z"
        }
        
        ```
        
    - **Response**:
        
        ```json
        {
          "success": true,
          "statusCode": 200,
          "message": "Rental created successfully",
          "data": {
            "_id": "60d9c4e4f3b4b544b8b8d1c4",
            "userId": "60d9c4e4f3b4b544b8b8d1c3",
            "bikeId": "60d9c4e4f3b4b544b8b8d1c4",
            "startTime": "2024-06-10T09:00:00Z",
            "returnTime": null,
            "totalCost": 0,
            "isReturned": false
          }
        }
        ```



- **Return Bike (Admin Only)**
    - **Route**: /api/rentals/:id/return (PUT)
    - **Request Headers**: Authorization: Bearer jwt_token
    - **Request Body**: Not needed
    - Bike's availability status will be updated to true
    - **Response**:
        
        ```json
        {
          "success": true,
          "statusCode": 200,
          "message": "Bike returned successfully",
          "data": {
            "_id": "60d9c4e4f3b4b544b8b8d1c4",
            "userId": "60d9c4e4f3b4b544b8b8d1c3",
            "bikeId": "60d9c4e4f3b4b544b8b8d1c4",
            "startTime": "2024-06-10T09:00:00Z",
            "returnTime": "2024-06-10T18:00:00Z",// Current time when returning the bike
            "totalCost": 135, // Calculated based on rental duration
            "isReturned": true
          }
        }
        
        ```
        
- **Get All Rentals for User (My rentals)**
    - **Route**: /api/rentals (GET)
    - **Request Headers**: Authorization: Bearer jwt_token
    - **Response**:
        
        ```json
        {
          "success": true,
          "statusCode": 200,
          "message": "Rentals retrieved successfully",
          "data": [
            {
              "_id": "60d9c4e4f3b4b544b8b8d1c4",
              "userId": "60d9c4e4f3b4b544b8b8d1c3",
              "bikeId": "60d9c4e4f3b4b544b8b8d1c4",
              "startTime": "2024-06-10T09:00:00Z",
              "returnTime": "2024-06-10T18:00:00Z",
              "totalCost": 135,
              "isReturned": true
            },
            ...other rentals...
          ]
        }
        
        ```

## Error Handling
Errors are handled using custom error classes and middleware. Common errors include:

- **Not Found Route**:
    - Implemented a global "Not Found" handler for unmatched routes. When a route is not found, it will respond with a generic message: "Not Found."
    - **Response**:
            
            ```json
            {
              "success": false,
              "statusCode": 404,
              "message": "Not Found"
            }
            ```
- **Authentication Middleware:**

    - Implemented an Authentication Middleware to authenticate the application. Ensured that only user  and admin can access their own accessible routes.
    - **Response**

        ```json
        {
        "success": false,
        "statusCode": 401,
        "message": "You have no access to this route",
        }
        ```


- **Error Handling**:
    - Implemented error handling throughout the application. Used global error handling middleware to catch and handle errors, providing appropriate error responses  error messages.
            
            
    - **Sample Error Response**:
            
        ```json
        {
            "success": false,
            "message": "Duplicate Data found!",
            "errorMessages": [
                {
                    "path": "",
                    "message": "mahi@example.com is already exist"
                }
            ],
            "stack": "error stack"
        }
        
        ```

- **No Data Found**:
    - When finding data, if the database collection is empty or does not match any data, returned a generic message: "No data found."
    - **Response**:
            
        ```json
        {
            "success": false,
            "message": "No Data Found",
            "errorMessages": [
                {
                    "path": "_id",
                    "message": "Cast to ObjectId failed for value \"666db45e50a08e33c557db7\" (type string) at path \"_id\" for model \"Bike\""
                }
            ],
            "stack": "error stack"
        }
        
        ```

### Live Link
Click here: [Bike Rental Service](https://bike-rental-service-server-puce.vercel.app/)
            
        
        
