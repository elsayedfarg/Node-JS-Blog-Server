# Production-Ready Blog Server API

This project is a production-ready Blog REST API built with Node.js, Express, and MongoDB following the MVC architecture pattern.

It includes advanced backend features such as authentication, nested comments, likes system, notifications, email integration, file uploads with ImageKit, password reset flow, and additional blog enhancements.

This project was developed as the final course project for the Node.js backend development track.

---

## Features

### Authentication and Users
- User registration and login with JWT authentication
- Password hashing using bcrypt
- Secure password reset flow with email verification
- Change password for authenticated users

### Posts System
- Full CRUD operations for blog posts
- Post drafts and publishing support
- Search functionality with MongoDB text indexes
- View count tracking

### Comments System
- Create comments on posts
- Nested replies support (parentCommentId)
- Edit and delete comments with ownership validation
- Pagination and filtering

### Likes System
- Like/unlike posts and comments
- Unique like per user per target
- Like count endpoints

### Notifications System
- Notifications for:
  - New comments
  - Likes on posts or comments
  - Follow actions
- Mark notification as read
- Mark all notifications as read

### Email Integration
- Welcome email after registration
- Password reset email with secure token
- Password reset confirmation email
- Comment notification emails

### File Uploads
- Upload profile pictures
- Upload post images
- Image hosting using ImageKit
- Multer middleware for validation and upload handling

### Security Enhancements
- Rate limiting
- HTTP parameter pollution protection
- XSS sanitization
- Helmet security headers

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Joi Validation
- Nodemailer (Email Service)
- Multer (File Upload)
- ImageKit (Image Hosting)
- Security Middleware (Helmet, HPP, Rate Limit)

---

## Project Structure
src/
┣ controllers/
┣ models/
┣ routes/
┣ services/
┣ middlewares/
┣ schemas/
┣ templates/
┣ utils/
index.js
app.js


The project follows the MVC pattern:
- Models handle database schemas
- Services contain business logic
- Controllers manage request/response
- Routes define API endpoints
- Schemas validate input data

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/elsayedfarg/Node-JS-Blog-Server.git
cd Node-JS-Blog-Server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Server
```bash
npm run dev
```


API Testing with Postman

This project includes Postman files for testing all endpoints.

Included Files

Postman Collection: postman/BlogAPI.postman_collection.json

Postman Environment: postman/BlogAPI.postman_environment.json

How to Use

Open Postman

Click Import

Import both JSON files from the postman/ folder

Select the environment from the top-right dropdown

Start testing endpoints

