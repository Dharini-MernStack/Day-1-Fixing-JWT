# MERN Authentication Project 🔐

A secure and modern authentication system built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This project addresses common security vulnerabilities and includes best practices for safe user authentication.

---

## ✅ Features

- Secure user registration and login
- Passwords hashed with **bcrypt**
- JWT authentication using **secret from `.env`**
- Input validation for user data
- Clear and specific error messages
- MongoDB connection using environment variables

---

## 🛠️ Technologies Used

- MongoDB + Mongoose
- Express.js
- Node.js
- React.js
- bcrypt for password hashing
- JSON Web Tokens (JWT)
- dotenv for environment variables
- Postman for API testing

---

## 🔐 Security Fixes Implemented

| Issue | Fix |
|------|-----|
| MongoDB not connected | Connected using `MONGO_URI` from `.env` |
| Password stored in plain text | Used **bcrypt** to hash passwords before saving |
| Hardcoded JWT secret | Moved to **`.env`** file |
| Plain text password comparison | Used `bcrypt.compare()` to verify hashed passwords |
| No input validation | Added validation for empty/invalid username & password |
| Generic error messages | Improved clarity of login errors |

---