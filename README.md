## To-Do App (Authentication & User Management)

A **Node.js & Express** application with authentication, user registration, and JWT-based authorization.
Built with **TypeScript**, **MongoDB**, and **Zod** for validation.

## Features

-  **User Authentication** (Register, Login)
-  **JWT-Based Authorization**
-  **Password Hashing** (bcrypt)
-  **Validation** with Zod
-  **Secure Environment Variables** (dotenv)

## Task Management
- **Create Tasks** with title, description, and due date
- **Update Tasks** (modify title, description, or status)
- **Mark Tasks as Completed**
- **Delete Tasks**
- **Retrieve All User Tasks**

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Security:** JWT, bcrypt, dotenv

# API Routes Documentation
## Authentication Routes

### Register a new user
**Endpoint:** `POST /register`

**Description:** Registers a new user.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

### Login a user
**Endpoint:** `POST /login`

**Description:** Authenticates a user and returns a token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "string"
}
```

---
## Task Management Routes

### Create a new task
**Endpoint:** `POST /`

**Authentication Required:** Yes

**Description:** Creates a new task.

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "dueDate": "string"
}
```

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": "string",
    "title": "string",
    "description": "string",
    "dueDate": "string"
  }
}
```

### Get all tasks
**Endpoint:** `GET /`

**Authentication Required:** Yes

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "dueDate": "string"
  }
]
```

### Get a specific task
**Endpoint:** `GET /:id`

**Authentication Required:** Yes

**Response:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "dueDate": "string"
}
```

### Update a task
**Endpoint:** `PUT /:id`

**Authentication Required:** Yes

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "dueDate": "string"
}
```

**Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": "string",
    "title": "string",
    "description": "string",
    "dueDate": "string"
  }
}
```

### Delete a task
**Endpoint:** `DELETE /:id`

**Authentication Required:** Yes

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

### Get deleted tasks
**Endpoint:** `GET /deleted`

**Authentication Required:** Yes

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "dueDate": "string"
  }
]
```

