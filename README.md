# 📝 Node.js Blog Server API

> A production-ready RESTful Blog API built with Node.js, Express, and MongoDB following MVC architecture pattern.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing with Postman](#testing-with-postman)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [Security Features](#security-features)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This is a **production-ready Blog REST API** developed as a final project for the Node.js backend development track. The API provides a comprehensive blogging platform with advanced features including authentication, nested comments, likes system, real-time notifications, email integration, and secure file uploads.

### Why This Project?

- ✅ **Production-Ready**: Built with security, scalability, and best practices in mind
- ✅ **Complete Feature Set**: Everything you need for a modern blogging platform
- ✅ **Clean Architecture**: MVC pattern with clear separation of concerns
- ✅ **Well-Documented**: Comprehensive documentation and Postman collection included
- ✅ **Secure by Default**: Multiple security layers and authentication mechanisms

---

## ✨ Features

### 🔐 Authentication & Authorization

- **User Registration & Login** with JWT token-based authentication
- **Password Security** with bcrypt hashing (salt rounds: 10)
- **Password Reset Flow** with secure email verification tokens
- **Password Change** for authenticated users
- **JWT Token Expiration** and refresh handling

### 📰 Posts Management

- **CRUD Operations** - Create, Read, Update, Delete blog posts
- **Draft & Publish** - Save posts as drafts before publishing
- **Search Functionality** - Full-text search using MongoDB text indexes
- **View Counter** - Track post views and engagement
- **Image Uploads** - Support for post cover images via ImageKit
- **Pagination** - Efficient data loading with pagination support

### 💬 Comments System

- **Comment Creation** on blog posts
- **Nested Replies** - Multi-level comment threading with `parentCommentId`
- **Edit & Delete** - Full ownership validation
- **Comment Pagination** - Efficient loading of comments
- **Comment Filtering** - Filter by post, user, or parent comment

### ❤️ Likes System

- **Like/Unlike** posts and comments
- **Unique Likes** - One like per user per target (post/comment)
- **Like Counts** - Aggregated like statistics
- **Like History** - Track user's liked content

### 🔔 Notifications System

- **Real-time Notifications** for:
  - New comments on your posts
  - Likes on your posts or comments
  - Follow actions from other users
- **Mark as Read** - Individual notification management
- **Bulk Operations** - Mark all notifications as read
- **Notification Preferences** - Customizable notification settings

### 📧 Email Integration

- **Welcome Emails** - Sent automatically after registration
- **Password Reset Emails** - Secure token-based reset flow
- **Password Change Confirmation** - Security notification emails
- **Comment Notifications** - Email alerts for new comments
- **Email Templates** - Beautiful HTML email templates

### 📁 File Upload System

- **Profile Pictures** - User avatar uploads
- **Post Images** - Cover images and in-post media
- **ImageKit Integration** - CDN-backed image hosting
- **File Validation** - Type and size validation via Multer
- **Automatic Optimization** - Image compression and resizing

### 🛡️ Security Features

- **Rate Limiting** - Prevent brute-force attacks
- **HPP Protection** - HTTP Parameter Pollution prevention
- **XSS Sanitization** - Cross-site scripting protection
- **Helmet Headers** - Security headers configuration
- **CORS** - Configurable cross-origin resource sharing
- **Input Validation** - Joi schema validation for all inputs
- **JWT Secret** - Secure token generation and validation

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication tokens |
| **Joi** | Data validation |
| **Nodemailer** | Email service |
| **Multer** | File upload handling |
| **ImageKit** | Image hosting & CDN |
| **bcrypt** | Password hashing |
| **Helmet** | Security headers |
| **express-rate-limit** | Rate limiting |
| **express-xss-sanitizer** | XSS protection |
| **hpp** | Parameter pollution protection |

---

## 📁 Project Structure

```
Node-JS-Blog-Server/
│
├── src/
│   ├── controllers/       # Request handlers and business logic
│   │   ├── authController.js
│   │   ├── postController.js
│   │   ├── commentController.js
│   │   ├── likeController.js
│   │   └── notificationController.js
│   │
│   ├── models/            # Mongoose schemas and models
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Comment.js
│   │   ├── Like.js
│   │   └── Notification.js
│   │
│   ├── routes/            # API route definitions
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── likeRoutes.js
│   │   └── notificationRoutes.js
│   │
│   ├── services/          # Business logic and external services
│   │   ├── emailService.js
│   │   ├── imagekitService.js
│   │   └── authService.js
│   │
│   ├── middlewares/       # Custom middleware functions
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── upload.js
│   │   └── validation.js
│   │
│   ├── schemas/           # Joi validation schemas
│   │   ├── authSchema.js
│   │   ├── postSchema.js
│   │   └── commentSchema.js
│   │
│   ├── templates/         # Email HTML templates
│   │   ├── welcome.html
│   │   ├── resetPassword.html
│   │   └── commentNotification.html
│   │
│   └── utils/             # Helper functions and utilities
│       ├── errorHandler.js
│       ├── responseHandler.js
│       └── constants.js
│
├── postman/               # Postman collection and environment
│   ├── BlogAPI.postman_collection.json
│   └── BlogAPI.postman_environment.json
│
├── uploads/               # Temporary file storage (gitignored)
│
├── .gitignore
├── config.env.example     # Environment variables template
├── index.js               # Application entry point
├── app.js                 # Express app configuration
├── package.json
└── README.md
```

### Architecture Pattern: MVC

- **Models** (`/models`) - Define database schemas and data structures
- **Services** (`/services`) - Contain reusable business logic
- **Controllers** (`/controllers`) - Handle HTTP requests and responses
- **Routes** (`/routes`) - Define API endpoints and map to controllers
- **Middlewares** (`/middlewares`) - Process requests before reaching controllers
- **Schemas** (`/schemas`) - Validate and sanitize input data

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or higher) - [Download here](https://nodejs.org/)
- **npm** (v6.x or higher) - Comes with Node.js
- **MongoDB** (v4.x or higher) - [Installation Guide](https://docs.mongodb.com/manual/installation/)
  - OR use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud database)
- **Git** - [Download here](https://git-scm.com/downloads)

### Optional but Recommended:

- **Postman** - For API testing [Download here](https://www.postman.com/downloads/)
- **MongoDB Compass** - GUI for MongoDB [Download here](https://www.mongodb.com/products/compass)

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/elsayedfarg/Node-JS-Blog-Server.git
cd Node-JS-Blog-Server
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`:

- **Production Dependencies**: Express, MongoDB, JWT, etc.
- **Development Dependencies**: Nodemon for auto-restart during development

### Step 3: Verify Installation

Check that all dependencies installed correctly:

```bash
npm list --depth=0
```

You should see a list of installed packages without any errors.

---

## ⚙️ Configuration

### Environment Variables Setup

The application uses environment variables for configuration. Follow these steps:

#### 1. Create Configuration File

Copy the example environment file:

```bash
cp config.env.example config.env
```

#### 2. Edit Configuration

Open `config.env` in your text editor and fill in the required values:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/blog-api
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-api?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=noreply@yourblog.com
FROM_NAME=Your Blog Name

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-imagekit-id

# Frontend Configuration
FRONTEND_URL=http://localhost:3000

# Security & Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 📝 Configuration Details

#### Database Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod --dbpath /path/to/data/directory

# Use in config.env:
MONGO_URI=mongodb://localhost:27017/blog-api
```

**Option B: MongoDB Atlas (Recommended)**
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string and update `config.env`

#### JWT Secret

Generate a secure random string:

```bash
# On Linux/Mac:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use any random string generator
```

#### Email Configuration (Gmail Example)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the app password in `SMTP_PASSWORD`

**For other email providers:**
- **Outlook**: `smtp-mail.outlook.com:587`
- **SendGrid**: `smtp.sendgrid.net:587`
- **Mailgun**: `smtp.mailgun.org:587`

#### ImageKit Setup

1. Sign up at [ImageKit.io](https://imagekit.io/)
2. Get your credentials from the dashboard:
   - Public Key
   - Private Key
   - URL Endpoint
3. Add them to `config.env`

---

## 🏃 Running the Application

### Development Mode (with auto-restart)

```bash
npm run dev
```

This uses **nodemon** to automatically restart the server when you make changes.

### Production Mode

```bash
npm start
```

### Verify Server is Running

You should see output like:

```
✅ Database connected successfully
🚀 Server running on port 5000 in development mode
📝 API Documentation available at http://localhost:5000/api-docs
```

Visit `http://localhost:5000` to confirm the server is running.

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Main Endpoints

| Resource | Endpoint | Methods |
|----------|----------|---------|
| **Authentication** | `/auth` | POST, PUT |
| **Users** | `/users` | GET, PUT, DELETE |
| **Posts** | `/posts` | GET, POST, PUT, DELETE |
| **Comments** | `/comments` | GET, POST, PUT, DELETE |
| **Likes** | `/likes` | POST, DELETE |
| **Notifications** | `/notifications` | GET, PUT |
| **Upload** | `/upload` | POST |

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Forgot Password
```http
POST /api/v1/auth/forgotpassword
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```http
PUT /api/v1/auth/resetpassword/:resetToken
Content-Type: application/json

{
  "password": "newSecurePassword123"
}
```

### Post Endpoints

#### Get All Posts
```http
GET /api/v1/posts?page=1&limit=10&search=nodejs
```

#### Get Single Post
```http
GET /api/v1/posts/:id
```

#### Create Post (Authenticated)
```http
POST /api/v1/posts
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Getting Started with Node.js",
  "content": "Node.js is a powerful runtime...",
  "tags": ["nodejs", "javascript", "backend"],
  "status": "published",
  "coverImage": "https://ik.imagekit.io/..."
}
```

#### Update Post (Authenticated)
```http
PUT /api/v1/posts/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Post (Authenticated)
```http
DELETE /api/v1/posts/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

### Comment Endpoints

#### Create Comment
```http
POST /api/v1/comments
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "postId": "507f1f77bcf86cd799439011",
  "content": "Great article!",
  "parentCommentId": null
}
```

#### Create Reply (Nested Comment)
```http
POST /api/v1/comments
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "postId": "507f1f77bcf86cd799439011",
  "content": "Thanks for sharing!",
  "parentCommentId": "507f1f77bcf86cd799439022"
}
```

### Like Endpoints

#### Like a Post
```http
POST /api/v1/likes
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "targetId": "507f1f77bcf86cd799439011",
  "targetType": "Post"
}
```

#### Unlike
```http
DELETE /api/v1/likes/:targetId
Authorization: Bearer YOUR_JWT_TOKEN
```

### File Upload Endpoints

#### Upload Profile Picture
```http
POST /api/v1/upload/profile
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data

image: [file]
```

#### Upload Post Image
```http
POST /api/v1/upload/post
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data

image: [file]
```

### Response Format

All API responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "data": { },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "stack": "Error stack trace (development only)"
}
```

---

## 🧪 Testing with Postman

This project includes pre-configured Postman files for comprehensive API testing.

### Setup Instructions

#### 1. Import Collection

1. Open **Postman**
2. Click **Import** button (top-left)
3. Navigate to `postman/` folder
4. Select `BlogAPI.postman_collection.json`
5. Click **Import**

#### 2. Import Environment

1. Click the gear icon ⚙️ (top-right) to manage environments
2. Click **Import**
3. Select `postman/BlogAPI.postman_environment.json`
4. Click **Import**

#### 3. Select Environment

1. From the dropdown in top-right corner
2. Select **BlogAPI Environment**

#### 4. Start Testing

The collection includes organized folders:

- 📁 **Authentication** - Register, Login, Password Reset
- 📁 **Posts** - CRUD operations, Search, Pagination
- 📁 **Comments** - Create, Reply, Edit, Delete
- 📁 **Likes** - Like/Unlike operations
- 📁 **Notifications** - View, Mark as Read
- 📁 **File Upload** - Profile & Post images

### Environment Variables

The Postman environment includes:

- `base_url` - API base URL (http://localhost:5000/api/v1)
- `token` - JWT token (auto-set after login)
- `userId` - Current user ID
- `postId` - Sample post ID for testing

### Testing Flow

1. **Start with Authentication**
   - Run "Register User" request
   - Or run "Login" request
   - Token is automatically saved to environment

2. **Create Content**
   - Create a post using "Create Post"
   - Add comments using "Create Comment"
   - Like the post using "Like Post"

3. **Test Operations**
   - Update and delete operations
   - Test pagination and filtering
   - Verify notifications

---

## 🗄️ Database Setup

### MongoDB Schema Overview

The application uses the following main collections:

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  profilePicture: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Posts Collection
```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  author: ObjectId (ref: User),
  coverImage: String,
  tags: [String],
  status: String (enum: ['draft', 'published']),
  viewCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Comments Collection
```javascript
{
  _id: ObjectId,
  content: String,
  author: ObjectId (ref: User),
  post: ObjectId (ref: Post),
  parentComment: ObjectId (ref: Comment, optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes

The application automatically creates indexes for:
- Text search on posts (title, content)
- Email uniqueness
- Author references
- Created date sorting

### Initial Data Setup (Optional)

You can seed the database with sample data for testing:

```bash
# If you create a seed script
node scripts/seedDatabase.js
```

---

## 🚢 Deployment

### Deployment Options

#### 1. Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-blog-api

# Set environment variables
heroku config:set MONGO_URI=your-mongodb-atlas-uri
heroku config:set JWT_SECRET=your-secret
# ... set other variables

# Deploy
git push heroku main

# Open app
heroku open
```

#### 2. DigitalOcean

1. Create a Droplet with Node.js
2. SSH into your server
3. Clone repository
4. Install dependencies
5. Set up environment variables
6. Use PM2 for process management:

```bash
npm install -g pm2
pm2 start index.js --name blog-api
pm2 save
pm2 startup
```

#### 3. Vercel / Netlify

These platforms work great for serverless deployment. You may need to adjust the application structure slightly.

#### 4. Docker

```dockerfile
# Example Dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t blog-api .
docker run -p 5000:5000 --env-file config.env blog-api
```

### Pre-Deployment Checklist

- [ ] Set `NODE_ENV=production` in environment variables
- [ ] Use strong JWT secret in production
- [ ] Use production-ready MongoDB (MongoDB Atlas)
- [ ] Configure proper CORS settings
- [ ] Set up SSL/TLS certificate
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy for database
- [ ] Test all API endpoints
- [ ] Update `FRONTEND_URL` to production URL

---

## 🔒 Security Features

### Implemented Security Measures

1. **Authentication**
   - JWT tokens with expiration
   - Password hashing with bcrypt (10 salt rounds)
   - HTTP-only cookies for token storage

2. **Input Validation**
   - Joi schema validation for all inputs
   - XSS sanitization
   - NoSQL injection prevention

3. **Rate Limiting**
   - 100 requests per 15 minutes per IP
   - Configurable via environment variables

4. **Security Headers**
   - Helmet.js for setting secure HTTP headers
   - Content Security Policy
   - XSS Protection headers

5. **CORS**
   - Configurable allowed origins
   - Credentials support

6. **Parameter Pollution Protection**
   - HPP middleware prevents parameter pollution attacks

7. **Error Handling**
   - No stack traces in production
   - Sanitized error messages

### Security Best Practices

- Never commit `config.env` to version control
- Rotate JWT secrets regularly in production
- Use HTTPS in production
- Keep dependencies updated: `npm audit fix`
- Implement request logging and monitoring
- Set up alerts for suspicious activities

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Database Connection Errors

**Error:** `MongoNetworkError: failed to connect to server`

**Solutions:**
- Verify MongoDB is running: `mongod --version`
- Check MongoDB connection string in `config.env`
- For MongoDB Atlas: Whitelist your IP address
- Check network connectivity

```bash
# Test MongoDB connection
mongosh "mongodb://localhost:27017/blog-api"
```

#### 2. Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 [PID]

# Or use a different port in config.env
PORT=3000
```

#### 3. JWT Token Errors

**Error:** `JsonWebTokenError: invalid token`

**Solutions:**
- Check token is properly sent in Authorization header
- Verify JWT_SECRET is set correctly
- Ensure token hasn't expired
- Format: `Authorization: Bearer YOUR_TOKEN`

#### 4. Email Not Sending

**Error:** `Error: Invalid login`

**Solutions:**
- Verify SMTP credentials
- For Gmail: Enable "Less secure app access" or use App Password
- Check SMTP host and port
- Test with: `npm install -g maildev` (development mail server)

#### 5. File Upload Issues

**Error:** `Multer error: File too large`

**Solutions:**
- Check file size limits in multer config
- Verify ImageKit credentials
- Ensure uploads directory exists and is writable
- Check file type restrictions

#### 6. Module Not Found Errors

**Error:** `Error: Cannot find module 'xyz'`

**Solutions:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
```

### Enable Debug Logging

Set debug mode for more detailed logs:

```env
NODE_ENV=development
DEBUG=express:*
```

### Still Having Issues?

1. Check the [Issues](https://github.com/elsayedfarg/Node-JS-Blog-Server/issues) page
2. Open a new issue with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)
   - Relevant code snippets

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Node-JS-Blog-Server.git
   cd Node-JS-Blog-Server
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Description of your changes"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation as needed
- Test your changes thoroughly
- One feature per pull request

### Code Style

- Use meaningful variable names
- Add comments for complex logic
- Follow JavaScript/ES6+ best practices
- Use async/await for asynchronous operations

---

## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2024 [Your Name]

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 📞 Contact & Support

### Project Links

- **Repository**: [https://github.com/elsayedfarg/Node-JS-Blog-Server](https://github.com/elsayedfarg/Node-JS-Blog-Server)
- **Issues**: [Report a Bug](https://github.com/elsayedfarg/Node-JS-Blog-Server/issues)
- **Pull Requests**: [Submit Changes](https://github.com/elsayedfarg/Node-JS-Blog-Server/pulls)

### Author

**Elsayed Farg**
- GitHub: [@elsayedfarg](https://github.com/elsayedfarg)

### Acknowledgments

- Node.js backend development course instructors
- All contributors and supporters of this project
- Open source community for amazing tools and libraries

---

## 🗺️ Roadmap

Future enhancements planned:

- [ ] GraphQL API support
- [ ] WebSocket integration for real-time notifications
- [ ] Advanced search with Elasticsearch
- [ ] Content moderation features
- [ ] Social media sharing integration
- [ ] Analytics dashboard
- [ ] API rate limiting per user
- [ ] Markdown support for posts
- [ ] Tag management system
- [ ] User follower system
- [ ] Bookmark/Save posts feature
- [ ] Admin dashboard
- [ ] Multi-language support

---

## 📸 Screenshots
<img width="1173" height="667" alt="Screenshot from 2026-04-06 15-18-10-1" src="https://github.com/user-attachments/assets/c4b8e8f1-25cb-4d65-80c4-8731a7db5c8e" />
<img width="1489" height="642" alt="Screenshot from 2026-04-06 15-17-35" src="https://github.com/user-attachments/assets/541ed05c-b329-4edc-8e4d-855bb30d1636" />
<img width="1457" height="481" alt="Screenshot from 2026-04-06 15-17-46" src="https://github.com/user-attachments/assets/de97248d-d24e-4938-96be-a66ffe59dfc9" />
<img width="1185" height="715" alt="Screenshot from 2026-04-06 15-18-03" src="https://github.com/user-attachments/assets/7e588336-d03c-4d61-aae0-074b8224e234" />
<img width="1173" height="667" alt="Screenshot from 2026-04-06 15-18-10" src="https://github.com/user-attachments/assets/24fdcbc3-6af6-4152-9b53-b68dc58857ed" />


---

**Happy Coding! 🚀**

---

*Last Updated: April 2026*
