# Finance Dashboard Backend API

## 🚀 Overview
This project is a backend system for a finance dashboard that supports user role management, financial records handling, and summary analytics.

## 🧠 Features
- User authentication (JWT)
- Role-based access control (Admin, Analyst, Viewer)
- Financial transaction CRUD operations
- Filtering (type, category, date)
- Dashboard analytics (income, expense, balance, recent activity)

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

## ⚙️ Setup Instructions

1. Clone the repository
2. Install dependencies:
   npm install

3. Create a `.env` file:
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret

4. Run the server:
   npm run dev

---

## 🔐 Roles & Permissions

| Role    | Permissions |
|---------|------------|
| Admin   | Full access (users + transactions) |
| Analyst | View transactions + analytics |
| Viewer  | View only |

---

## 📡 API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Users (Admin only)
- GET /api/users
- PATCH /api/users/:id/role
- PATCH /api/users/:id/status

### Transactions
- POST /api/transactions (Admin)
- GET /api/transactions (All roles)
- PUT /api/transactions/:id (Admin)
- DELETE /api/transactions/:id (Admin)

### Dashboard
- GET /api/dashboard/summary
- GET /api/dashboard/category
- GET /api/dashboard/recent

---

## 📌 Assumptions
- Authentication is token-based using JWT
- Email verification is not implemented for simplicity
- All financial data is stored in MongoDB

---

## ✨ Author
Sanjay
