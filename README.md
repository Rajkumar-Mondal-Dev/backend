# User Management Backend API

A backend service using **Node.js v22.16.0**, **Express**, and **MongoDB** to manage user data.

![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

---

## 🛠 Tech Stack

**Server:** Node.js (v22.16.0), Express, MongoDB, Mongoose  
**CI/CD:** GitHub Actions

---

## 🚀 Features

- Full CRUD operations
- MongoDB validation (e.g., unique `emailId`)
- Centralized error handling
- Environment variable support

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/backend.git
cd backend
npm install
```

Create a `.env` file and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Start the server:

```bash
npm run start
```

---

## 📘 API Reference

### Signup User

```http
POST /signup
```

**Body:**

```json
{
  "emailId": "user@example.com",
  "name": "John Doe",
  "password": "securepassword"
}
```

---

### Get User by Email

```http
GET /user
```

**Body:**

```json
{
  "emailId": "user@example.com"
}
```

---

### Update User by ID

```http
PATCH /user
```

**Body:**

```json
{
  "userId": "mongodb_object_id",
  "name": "Updated Name"
}
```

---

### Delete User by ID

```http
DELETE /user
```

**Body:**

```json
{
  "userId": "mongodb_object_id"
}
```

---

## 🧪 Running Tests

To run tests:

```bash
npm run test
```

---

## ⚙️ Environment Variables

To run this project, add the following variables in your `.env` file:

```env
MONGODB_URI=your_mongodb_uri
PORT=5000
```

---

## 🚚 Deployment

To deploy this project:

```bash
npm run deploy
```

---

## ✅ GitHub Actions CI

GitHub Actions workflow is triggered on every push and pull request to the `develop` branch:

```yaml
name: Node.js CI

on:
  push:
    branches: ["develop"]
  pull_request:
    branches: ["develop"]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [22.x]
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm run build --if-present
      - run: npm test
```

---

## ⚡ Optimizations

- Async/await for improved readability
- Proper HTTP status codes (e.g., `409` for duplicate email)
- Centralized MongoDB connection and error handling

---

## 🧠 Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

_(Update this section with your personal experience)_

---

## 📷 Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

---

## 🧩 Related

- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [How to write a Good Readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

---

## 💬 Feedback

If you have any feedback, please contact:  
📧 [rajkumar.mondal.dev@gmail.com](mailto:rajkumar.mondal.dev@gmail.com)

---

## 📝 License

[MIT License](https://choosealicense.com/licenses/mit/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-v22.16.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Express-green)](https://mongodb.com)