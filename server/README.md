# Solutechh Backend API

Professional full-stack REST API for Healthcare Infrastructure Solutions management system.

## 🚀 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + bcryptjs
- **File Uploads**: Multer + Cloudinary
- **Email**: Nodemailer
- **Security**: Helmet.js, CORS, Rate Limiting, Input Sanitization
- **Validation**: express-validator

## 📋 Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)
- Cloudinary Account (for image uploads)
- SMTP Email Configuration (Gmail, SendGrid, etc.)

## 🔧 Installation

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `/server` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/solutechh

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
ADMIN_EMAIL=admin@solutechh.com

# Client
CLIENT_URL=http://localhost:5173
```

### 3. Seed Database

Create initial admin and test users:

```bash
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@solutechh.com`
- Password: `Admin@123456`

**Default Test User Credentials:**
- Email: `user@example.com`
- Password: `User@123456`

## 🏃 Running the Server

### Development Mode (with hot reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes (`/auth`)

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Profile
```http
GET /auth/me
Authorization: Bearer {token}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

### Product Routes (`/products`)

#### Get All Products
```http
GET /products?category=CSSD&search=equipment&page=1&limit=10
```

**Query Parameters:**
- `category`: Filter by category (CSSD, Modular OT, Skill Labs, Pneumatic System, Other)
- `search`: Search by name or description
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

#### Get Single Product
```http
GET /products/{productId}
```

### Contact Routes (`/contact`)

#### Submit Contact Form
```http
POST /contact
Content-Type: application/json

{
  "name": "Hospital Manager",
  "email": "manager@hospital.com",
  "phone": "+1-234-567-8900",
  "company": "XYZ Hospital",
  "reason": "Interested in CSSD solutions"
}
```

**Note:** Rate limited to 3 requests per hour

### Admin Routes (`/admin`) - Protected

All admin routes require:
- Valid JWT token in `Authorization: Bearer {token}` header
- User role must be `admin`

#### Product Management

**Add Product**
```http
POST /admin/products
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- image: (file)
- name: "Product Name"
- description: "Product description"
- category: "CSSD"
- specifications: '[{"key": "Size", "value": "Large"}]'
```

**Update Product**
```http
PUT /admin/products/{productId}
Authorization: Bearer {token}

{
  "name": "Updated Name",
  "description": "Updated description",
  "category": "CSSD"
}
```

**Delete Product**
```http
DELETE /admin/products/{productId}
Authorization: Bearer {token}
```

**Toggle Product Status**
```http
PATCH /admin/products/{productId}/toggle
Authorization: Bearer {token}
```

#### Contact Management

**Get All Contacts**
```http
GET /admin/contacts?status=new&page=1&limit=10
Authorization: Bearer {token}
```

**Get Single Contact**
```http
GET /admin/contacts/{contactId}
Authorization: Bearer {token}
```

**Update Contact Status**
```http
PATCH /admin/contacts/{contactId}
Authorization: Bearer {token}

{
  "status": "responded",
  "notes": "We will follow up with more details"
}
```

**Delete Contact**
```http
DELETE /admin/contacts/{contactId}
Authorization: Bearer {token}
```

#### Dashboard Statistics
```http
GET /admin/dashboard
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Dashboard statistics retrieved successfully",
  "data": {
    "totalProducts": 25,
    "totalContacts": 150,
    "newContacts": 5,
    "recentContacts": [...]
  }
}
```

## 🔐 Security Features

- ✅ Passwords hashed with bcryptjs (12 salt rounds)
- ✅ JWT authentication with 7-day expiration
- ✅ HTTP security headers (Helmet.js)
- ✅ CORS protection
- ✅ NoSQL injection prevention (mongo-sanitize)
- ✅ Rate limiting on auth (5 req/15min) and contact (3 req/hour)
- ✅ Input validation and sanitization
- ✅ Role-based access control (Admin/User)

## 📁 Project Structure

```
/server
  /config
    - db.js              # MongoDB connection
    - cloudinary.js      # Cloudinary configuration
  /models
    - User.js            # User schema
    - Product.js         # Product schema
    - ContactRequest.js  # Contact schema
  /controllers
    - authController.js      # Auth logic
    - productController.js    # Product logic
    - contactController.js    # Contact logic
    - adminController.js      # Admin logic
  /routes
    - auth.js            # Auth routes
    - product.js         # Product routes
    - contact.js         # Contact routes
    - admin.js           # Admin routes
  /middleware
    - authMiddleware.js       # JWT verification
    - adminMiddleware.js      # Admin check
    - upload.js               # Multer config
    - errorHandler.js         # Global error handling
    - rateLimiter.js          # Rate limiting
  /utils
    - sendEmail.js       # Email service
    - apiResponse.js     # Response format
  /scripts
    - seed.js            # Database seeding
  .env
  .env.example
  package.json
  server.js
```

## 🛡️ Error Handling

All errors return consistent format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 📧 Email Configuration

### Using Gmail

1. Enable 2-factor authentication on Gmail
2. Generate App-specific password: https://myaccount.google.com/apppasswords
3. Use the 16-character password in `.env`

### Using Other Providers

Update `EMAIL_HOST` and `EMAIL_PORT` in `.env`:
- SendGrid: smtp.sendgrid.net:587
- Mailgun: smtp.mailgun.org:587

## 🚀 Deployment

### Before Production Deployment

1. **Update `.env`:**
   - Change `JWT_SECRET` to a strong random string
   - Set `NODE_ENV=production`
   - Use production MongoDB URI
   - Configure SMTP properly

2. **Install PM2:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "solutechh-api"
   pm2 startup
   pm2 save
   ```

3. **Use Reverse Proxy** (nginx recommended)

4. **Enable HTTPS** with SSL certificates

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Check MONGO_URI in `.env`
- Ensure MongoDB is running
- Verify IP whitelist in MongoDB Atlas

**Email Not Sending:**
- Verify EMAIL_USER and EMAIL_PASS
- Check ADMIN_EMAIL is correct
- Ensure SMTP port is accessible

**Image Upload Failing:**
- Verify Cloudinary credentials
- Check file size < 5MB
- Ensure file is valid image (JPEG, PNG, GIF, WebP)

## 📄 License

ISC

## 👥 Support

For issues and feature requests, please contact the development team.

---

**Last Updated:** April 2026
