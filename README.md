# Billing System Node.js Server

This is a Node.js server for a simple billing system that provides APIs to handle billing operations for a company. The server exposes various endpoints based on REST principles to manage user accounts, products, services, and cart functionalities. The server also calculates taxes based on product and service prices as per the provided rules.

## Prerequisites

Before running the server, make sure you have the following software installed on your system:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

## Getting Started

1. Clone the repository to your local machine:

```bash
git clone https://github.com/BhaveyM/billing-system.git
cd billing-system
```

2. Install the dependencies using npm:

```bash
npm install
```

3. MongoDB connection:

   - Provided my personal mongodb atlas uri with open access. (with dummy data)
   - Can replace with your-mongodb-atlas-connection-string (optional)

4. Start the server:

```bash
npm start
```

The server should now be running and connected to your MongoDB database.


## API Endpoints

The server exposes the following API endpoints:

- `POST /users`: Create a new user account.

  Sample Request Body:
  ```json
  {
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- `GET /products`: Fetch all products information with their prices.

  Sample Request: (No request body required)

- `GET /services`: Fetch all services information with their prices.

  Sample Request: (No request body required)

- `POST /users/:userId/cart`: Add a product or service to the user's cart.

  Sample Request Body for Adding a Product:
  ```json
  {
    "itemId": "product_id_here",
    "itemType": "product"
  }
  ```

  Sample Request Body for Adding a Service:
  ```json
  {
    "itemId": "service_id_here",
    "itemType": "service"
  }
  ```

- `DELETE /users/:userId/cart/:cartItemId`: Remove a product or service from the user's cart.

  Sample Request: (No request body required)

- `DELETE /users/:userId/cart`: Clear the user's cart.

  Sample Request: (No request body required)

- `GET /users/:userId/total-bill`: View the total bill including taxes and quantities of items in the user's cart.

  Sample Request: (No request body required)

- `POST /users/:userId/confirm-order`: Confirm the order and get order details.

  Sample Request: (No request body required)

- `GET /admin/orders`: Get all orders (Admin API). (only accessible through admin account secret username)

  Sample Request: (No request body required)

- `GET /users/username/:username`: Get a user by username.

  Sample Request: (No request body required)


## Usage

You can test the API endpoints using Postman or any other API testing tool. The server will return responses based on the provided requests.

---
