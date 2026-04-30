# Complete Setup Guide - Solutechh Full-Stack Application

This guide will walk you through setting up the entire Solutechh application (Frontend + Backend).

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Configuration](#configuration)
6. [Running the Application](#running-the-application)
7. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Solutechh** is a professional healthcare infrastructure solutions platform with:

- **Frontend:** React + Vite (Modern responsive UI)
- **Backend:** Node.js + Express.js (RESTful API)
- **Database:** MongoDB (Cloud or Local)
- **Authentication:** JWT tokens
- **File Storage:** Cloudinary (Cloud images)
- **Email:** Nodemailer (Notifications)

### Project Structure
```
solutechh-react/
├── forntend/          # React Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── server/            # Node.js Backend
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── scripts/
    ├── package.json
    └── server.js
```

---

## Prerequisites

### Required Software
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **MongoDB** - [Atlas Free Tier](https://www.mongodb.com/cloud/atlas) or [Local Installation](https://docs.mongodb.com/manual/installation/)
- **Git** (for cloning repository)

### Required Accounts
- **Cloudinary** - [Free Account](https://cloudinary.com/users/register/free) (for image uploads)
- **Email Service** - Gmail with [App Password](https://myaccount.google.com/apppasswords) or [SendGrid](https://sendgrid.com/)

### Verify Installation

```bash
# Check Node.js
node --version      # Should show v14+

# Check npm
npm --version       # Should show 6+

# Check MongoDB (if installed locally)
mongod --version    # Should show version
```

---

## Backend Setup

### Step 1: Navigate to Server Directory

```bash
cd server
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (authentication)
- bcryptjs (password hashing)
- nodemailer (email service)
- multer & cloudinary (file uploads)
- And other required packages

### Step 3: Create Environment File

Create `.env` file in `/server` directory:

```bash
# Copy template
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/solutechh

# JWT Configuration
JWT_SECRET=generate_a_random_strong_key_here
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
ADMIN_EMAIL=admin@solutechh.com

# Client Configuration
CLIENT_URL=http://localhost:5173
```

### Step 4: Get Credentials

#### MongoDB URI
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster (choose Free tier)
4. Click "Connect" → "Drivers"
5. Copy connection string
6. Replace `<password>` with your password
7. Replace `myFirstDatabase` with `solutechh`

#### Cloudinary Credentials
1. Sign up at [Cloudinary](https://cloudinary.com/users/register/free)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

#### Gmail App Password
1. Enable 2-factor authentication on Gmail
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer"
4. Google will generate 16-character password
5. Use this in `EMAIL_PASS`

#### Generate JWT Secret
```bash
# On Windows PowerShell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).Guid + (New-Guid).Guid))

# On Mac/Linux
openssl rand -base64 32
```

### Step 5: Seed Database

Create initial admin user:

```bash
npm run seed
```

Output:
```
✓ Admin user created
  Email: admin@solutechh.com
  Password: Admin@123456

✓ Test user created
  Email: user@example.com
  Password: User@123456
```

**⚠️ Important:** Change these default passwords in production!

### Step 6: Start Backend Server

```bash
# Development mode (with hot reload)
npm run dev

# OR Production mode
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║   Solutechh API Server Started        ║
║   Environment: development             ║
║   Port: 5000                           ║
╚════════════════════════════════════════╝
```

**✅ Backend is ready!** Test at: http://localhost:5000/api/health

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd forntend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File (Optional)

Create `.env` in `/forntend`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Update API Configuration

Edit `/forntend/src/config/api.js` (create if doesn't exist):

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default API_BASE_URL;
```

### Step 5: Start Frontend Server

```bash
npm run dev
```

You should see:
```
VITE v4.x.x ready in xxxms

➜ Local:   http://localhost:5173/
➜ press h to show help
```

**✅ Frontend is ready!** Open: http://localhost:5173

---

## Configuration

### Frontend API Calls

Update your API service file to use the backend:

```javascript
// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Navbar Login/Signup Links

The Login and Sign Up pages are already integrated in the navbar. Users can:
1. Click "Sign In" in navbar → `/login` page
2. Click "Sign Up" in navbar → `/signup` page
3. Click "Get in Touch" in hero → Contact form modal

### Testing the Contact Form

When a user submits the contact form in the home page:

1. **Frontend:** Form submits to `/api/contact`
2. **Backend:** 
   - Validates input
   - Saves to MongoDB
   - Sends email to admin
   - Returns success response
3. **Admin:** Can view contacts in admin dashboard

---

## Running the Application

### Start Both Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd forntend
npm run dev
```

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **API Health:** http://localhost:5000/api/health

---

## User Accounts for Testing

### Admin Account
- **Email:** admin@solutechh.com
- **Password:** Admin@123456
- **Role:** Admin (can manage products and view all contacts)

### Regular User Account
- **Email:** user@example.com
- **Password:** User@123456
- **Role:** User (can only submit contact forms)

### Testing Workflow

1. **Register new user:**
   - Go to Sign Up page
   - Create account with new email

2. **Login:**
   - Go to Sign In page
   - Use credentials

3. **Submit Contact:**
   - Click "Get in Touch" button on home
   - Fill contact form
   - Submit (email sent to admin)

4. **Admin Functions:**
   - Login with admin account
   - Access admin dashboard (if implemented)
   - Manage products
   - View and respond to contacts

---

## Troubleshooting

### Backend Issues

#### MongoDB Connection Error
```
Error connecting to MongoDB: ...
```

**Solution:**
1. Check `MONGO_URI` in `.env`
2. Ensure MongoDB is running
3. Verify IP whitelist in MongoDB Atlas (allow all IPs: 0.0.0.0/0)
4. Test connection string manually

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>

# Or change PORT in .env
```

#### Email Not Sending
```
Error sending email: ...
```

**Solution:**
1. Verify `EMAIL_USER` and `EMAIL_PASS` are correct
2. Check if using Gmail, enable App Password
3. Verify `ADMIN_EMAIL` exists
4. Check SMTP settings for your provider

#### Cloudinary Upload Error
```
Cloudinary upload failed: ...
```

**Solution:**
1. Verify Cloudinary credentials in `.env`
2. Check file size < 5MB
3. Ensure file is valid image (JPEG, PNG, GIF, WebP)
4. Check Cloudinary account storage limit

### Frontend Issues

#### API Connection Error
```
Failed to fetch from http://localhost:5000/api
```

**Solution:**
1. Ensure backend is running on port 5000
2. Check `VITE_API_URL` environment variable
3. Verify CORS is enabled in backend
4. Check browser console for details

#### Login Token Error
```
401 Unauthorized
```

**Solution:**
1. Clear localStorage: `localStorage.clear()`
2. Login again
3. Check token expiration (7 days)
4. Verify `JWT_SECRET` matches in backend

#### CSS/Module Errors
```
CSS module not found
```

**Solution:**
1. Ensure `.module.css` files exist
2. Check import statements use correct paths
3. Clear node_modules and reinstall: `npm install`

### Database Issues

#### MongoDB Atlas Connection

If you get IP whitelist error:

1. Go to MongoDB Atlas
2. Click "Network Access"
3. Add IP Address
4. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
5. Click "Confirm"

#### Database Seeding

If seed script fails:

```bash
# Delete existing data
# (This will clear all users)
node scripts/seed.js

# Or manually in MongoDB:
# 1. Go to MongoDB Atlas
# 2. Collections > solutechh > users > Delete all documents
# 3. Run seed script again
```

---

## Production Deployment

### Before Going Live

1. **Change Default Passwords:**
   - Update admin password in MongoDB
   - Never use default credentials

2. **Update Environment Variables:**
   ```env
   NODE_ENV=production
   JWT_SECRET=<generate_new_strong_secret>
   CLIENT_URL=https://yourdomain.com
   ```

3. **Enable HTTPS:**
   - Use SSL certificate (Let's Encrypt)
   - Configure in reverse proxy (nginx)

4. **Set Up Monitoring:**
   - Use PM2 for process management
   - Set up error logging
   - Monitor performance

5. **Backup Database:**
   - Enable MongoDB backups
   - Set up automated backups

### Deployment Checklist

- [ ] MongoDB URI points to production database
- [ ] Cloudinary credentials are for production account
- [ ] Email is configured with production SMTP
- [ ] JWT_SECRET is changed to random strong key
- [ ] NODE_ENV=production
- [ ] Client URL is updated to production domain
- [ ] HTTPS is enabled
- [ ] Default passwords are changed
- [ ] Backups are configured
- [ ] Error logging is setup

---

## Next Steps

1. **Customize Branding:**
   - Update logo in Navbar
   - Change color scheme
   - Update company information

2. **Add More Features:**
   - Product filtering improvements
   - Advanced admin dashboard
   - Email templates
   - User profile management

3. **Optimize Performance:**
   - Enable image compression
   - Implement caching
   - Optimize database queries

4. **Enhance Security:**
   - Add CSRF protection
   - Implement rate limiting per user
   - Add 2FA for admin accounts

---

## Support & Resources

### Documentation
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)

### API Documentation
See [API_ENDPOINTS.md](./API_ENDPOINTS.md) for complete API reference

### Tutorials
- Setting up MongoDB Atlas: [Link](https://www.mongodb.com/docs/atlas/getting-started/)
- Cloudinary Integration: [Link](https://cloudinary.com/documentation)
- JWT Authentication: [Link](https://jwt.io/introduction)

---

**Last Updated:** April 2026  
**Version:** 1.0.0  
**Author:** Solutechh Development Team
