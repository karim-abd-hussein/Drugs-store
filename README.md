
# Drug Store RESTful API

This is a Node.js backend application for managing a drug store using **Express.js**, **Socket.IO**, **JWT (JSON Web Tokens)**, and RESTful API architecture. The application allows secure user authentication and real-time updates while providing a scalable and efficient backend for the drug store's operations.

## Features

- **Authentication and Authorization**  
  Secure login and role-based access using **JWT**.
  
- **Real-time Updates**  
  Notifications and updates using **Socket.IO**.

- **RESTful Endpoints**  
  Standardized CRUD operations for drugs, users, and orders.

- **Error Handling**  
  Centralized error-handling middleware.

- **Secure API**  
  Protected routes with JWT middleware.

---

## Usage


### Production Server

Run the application in production mode:
```bash
npm start
```

### API Endpoints

#### Authentication
- `POST /auth/login` - User login with JWT token response.
- `POST /auth/signup` - User registration.

#### Drugs
- `GET /drugs/browsebycategory` - Get all drugs.
- `POST /drugs/insert` - Add a new drug (Admin only).
- `GET /drugs/searchbyitem` - Get drug details (Admin and druggist).
- `DELETE /drugs/:id` - Delete a drug (Admin only).(not found yet)

#### Orders
- `GET /orders/status` - Get all my orders.
- `GET /orders/bystatus` - Get all orders by status.
- `POST /orders/createorder` - Place a new order.
- `PUT /orders/changestatus` - Update order status.

#### Real-time Updates
- The server emits real-time notifications (e.g., new orders or stock updates) to connected clients via **Socket.IO**.

---

## Folder Structure

```

| app.js
├── controllers/     # Route controllers
├── models/          # Database models
├── routes/          # API route definitions
├── services/         # Socket.IO setup and handlers
├── .env                 # Environment variables
├── .gitignore           # Files and directories to ignore in Git
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

---

## Dependencies

- **Express.js**: Web framework for Node.js.
- **Socket.IO**: Real-time communication.
- **jsonwebtoken**: Authentication with JWT.
- **bcryptjs**: Password hashing.
- **dotenv**: Environment variable management.

