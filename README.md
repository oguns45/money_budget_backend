# Budget Management API

This API provides a backend service for a budget management application, allowing users to track income, expenses, budgets, and spending trends over time. It also includes user authentication, enabling secure access to personal budget data.

## Features

- **User Authentication**: 
  - Users can register and log in.
  - JWT-based authentication for secure user sessions.

- **Income and Expense Management**:
  - Users can log income and expenses with details like date, amount, category, and description.
  - Options to edit or delete entries.

- **Budgeting**:
  - Set monthly or category-specific budgets.
  - Track spending within budget categories.

- **Spending Analysis**:
  - Monthly and yearly summaries of income and expenses.
  - Detailed breakdown by category.

- **Data Visualization Support**:
  - Aggregate data available for visual representation of spending trends.

## Tech Stack

- **Node.js**: Server-side JavaScript runtime
- **Express**: Web framework for building API routes
- **MongoDB**: Database for storing user, budget, and expense data
- **Mongoose**: MongoDB ORM for schema and model definition
- **JWT**: JSON Web Token for secure user authentication
- **Bcrypt**: Password hashing for secure storage

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/budget-management-api.git
   cd budget-management-api
