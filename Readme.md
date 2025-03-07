# Secure Authentication and Authorization System

## Overview
This project is a secure user authentication and authorization system built with **Express.js**. It provides user registration, login, role-based access control, password reset, and security features to protect against common vulnerabilities.

## Features
- **User Authentication**: Secure user registration and login with JWT-based authentication.
- **Role-Based Access Control (RBAC)**: Access control for different user roles (`user`, `admin`).
- **Protected Routes**: Middleware to restrict access to authorized users.
- **Password Reset**: Secure email-based password reset feature.
- **Logging**: Tracks user activities and security events using the file system.
- **Testing**: Unit tests for authentication and security features.

## Project Structure
```
secure-auth-system/
│── node_modules/          
│── src/
│   ├── config/
│   │   ├── db.js          # Database connection
│   │   ├── auth.js        # JWT Authentication configuration
│   ├── controllers/
│   │   ├── authController.js     # Handles user authentication (register, login, logout)
│   │   ├── userController.js     # Handles user-related operations
│   │   ├── adminController.js    # Admin-specific routes and logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification middleware
│   │   ├── roleMiddleware.js     # Role-based access control middleware
│   ├── models/
│   │   ├── User.js        # User schema and model
│   ├── routes/
│   │   ├── authRoutes.js  # Routes for authentication
│   │   ├── userRoutes.js  # Routes for user operations
│   │   ├── adminRoutes.js # Routes restricted to admin users
│   ├── services/
│   │   ├── emailService.js    # Handles password reset email
│   ├── utils/
│   │   ├── logger.js      # Logger using file system
│   ├── app.js            # Main Express app setup
│── .env                  # Environment variables
│── .gitignore            # Git ignore file
│── package.json          # Dependencies and scripts
│── README.md             # Project documentation
```

## Installation

### Prerequisites
- **Node.js** (>=14.x recommended)
- **MongoDB** (Local or Cloud-based)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Ayushjha298/backend-secure-system.git
   cd secure-auth-system
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     PORT=5000
     FRONTEND_URL=http://localhost:3000
     ```

4. Start the application:
   ```sh
   npm start
   ```

5. The API will be available at `http://localhost:5000`.

## API Endpoints

### Authentication
#### Register User
```http
POST /api/auth/register
```
Registers a new user.

#### Login User
```http
POST /api/auth/login
```
Logs in a user and returns a JWT token.

#### Logout User
```http
POST /api/auth/logout
```
Logs out the user.

#### Request Password Reset
```http
POST /api/auth/request-password-reset
```
Sends a password reset email.

#### Reset Password
```http
POST /api/auth/reset-password
```
Resets the user's password using a token.

### User Routes
#### Get User Profile
```http
GET /api/users/profile
```
Retrieves the profile of the authenticated user.

### Admin Routes
#### Get All Users (Admin Only)
```http
GET /api/admin/users
```
Retrieves all users (admin access required).

## Security Measures Implemented
- **Password Hashing**: Uses `bcrypt` for secure password storage.
- **JWT Authentication**: Secure token-based authentication.

## Logging
- Logs security-related events and user activities using the file system.


## Postman Collection
You can find the Postman collection to test all APIs [here](https://drive.google.com/file/d/102S4OGa7rhlAmvs1jNFsqqdUmf64i4bw/view?usp=sharing).


