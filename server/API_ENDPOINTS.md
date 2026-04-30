# Solutechh API Endpoints Reference

Complete API endpoints documentation with examples.

## 📋 Table of Contents
1. [Authentication](#authentication)
2. [Products](#products)
3. [Contact](#contact)
4. [Admin](#admin)

---

## Authentication

### POST /api/auth/register
Register a new user account.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "User already exists with that email"
}
```

---

### POST /api/auth/login
Authenticate and get JWT token.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### GET /api/auth/me
Get current user profile (requires authentication).

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isVerified": true,
      "createdAt": "2024-04-30T10:30:00Z"
    }
  }
}
```

---

### POST /api/auth/logout
Logout user (clears token on client side).

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

---

## Products

### GET /api/products
Get all active products with filtering and pagination.

**Request:**
```bash
curl -X GET "http://localhost:5000/api/products?category=CSSD&search=equipment&page=1&limit=10"
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category (CSSD, Modular OT, Skill Labs, Pneumatic System, Other) |
| search | string | Full-text search in name and description |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |

**Response (200):**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "_id": "607f1f77bcf86cd799439011",
      "name": "Advanced CSSD System",
      "description": "Complete Central Sterile Supply Department setup",
      "category": "CSSD",
      "image": {
        "url": "https://res.cloudinary.com/...",
        "publicId": "solutechh/products/..."
      },
      "specifications": [
        { "key": "Capacity", "value": "500 items/hour" },
        { "key": "Size", "value": "15m x 10m" }
      ],
      "isActive": true,
      "createdAt": "2024-04-30T10:30:00Z",
      "updatedAt": "2024-04-30T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "pages": 3,
    "currentPage": 1,
    "limit": 10
  }
}
```

---

### GET /api/products/:id
Get single product details.

**Request:**
```bash
curl -X GET http://localhost:5000/api/products/607f1f77bcf86cd799439011
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "_id": "607f1f77bcf86cd799439011",
    "name": "Advanced CSSD System",
    "description": "Complete Central Sterile Supply Department setup",
    "category": "CSSD",
    "image": {
      "url": "https://res.cloudinary.com/...",
      "publicId": "solutechh/products/..."
    },
    "specifications": [
      { "key": "Capacity", "value": "500 items/hour" },
      { "key": "Size", "value": "15m x 10m" }
    ],
    "isActive": true,
    "createdBy": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Admin User",
      "email": "admin@solutechh.com"
    },
    "createdAt": "2024-04-30T10:30:00Z",
    "updatedAt": "2024-04-30T10:30:00Z"
  }
}
```

---

## Contact

### POST /api/contact
Submit contact form (public endpoint with rate limiting).

**Request:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hospital Manager",
    "email": "manager@hospital.com",
    "phone": "+1-234-567-8900",
    "company": "XYZ Hospital",
    "reason": "Interested in CSSD solutions for our facility"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "Contact request submitted successfully",
  "data": {
    "id": "607f1f77bcf86cd799439011",
    "message": "We have received your message and will get back to you soon."
  }
}
```

**Rate Limit:** 3 requests per hour per IP

---

## Admin

All admin endpoints require:
- Valid JWT token
- User role = "admin"

### POST /api/admin/products
Add new product with image upload.

**Request:**
```bash
curl -X POST http://localhost:5000/api/admin/products \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "image=@product.jpg" \
  -F "name=Advanced CSSD System" \
  -F "description=Complete Central Sterile Supply Department setup" \
  -F "category=CSSD" \
  -F 'specifications=[{"key":"Capacity","value":"500 items/hour"}]'
```

**Response (201):**
```json
{
  "success": true,
  "message": "Product added successfully",
  "data": {
    "_id": "607f1f77bcf86cd799439011",
    "name": "Advanced CSSD System",
    "description": "Complete Central Sterile Supply Department setup",
    "category": "CSSD",
    "image": {
      "url": "https://res.cloudinary.com/...",
      "publicId": "solutechh/products/..."
    },
    "specifications": [
      { "key": "Capacity", "value": "500 items/hour" }
    ],
    "isActive": true,
    "createdBy": "507f1f77bcf86cd799439011",
    "createdAt": "2024-04-30T10:30:00Z",
    "updatedAt": "2024-04-30T10:30:00Z"
  }
}
```

---

### PUT /api/admin/products/:id
Update product details.

**Request:**
```bash
curl -X PUT http://localhost:5000/api/admin/products/607f1f77bcf86cd799439011 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product Name",
    "description": "Updated description",
    "category": "Modular OT"
  }'
```

**Response (200):** Same as POST response

---

### DELETE /api/admin/products/:id
Delete product and its image.

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/admin/products/607f1f77bcf86cd799439011 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```

---

### PATCH /api/admin/products/:id/toggle
Toggle product active/inactive status.

**Request:**
```bash
curl -X PATCH http://localhost:5000/api/admin/products/607f1f77bcf86cd799439011/toggle \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):** Updated product with isActive toggled

---

### GET /api/admin/contacts
Get all contact requests with filtering.

**Request:**
```bash
curl -X GET "http://localhost:5000/api/admin/contacts?status=new&page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter: new, read, responded |
| page | number | Page number |
| limit | number | Items per page |

**Response (200):**
```json
{
  "success": true,
  "message": "Contact requests retrieved successfully",
  "data": [
    {
      "_id": "607f1f77bcf86cd799439011",
      "name": "Hospital Manager",
      "email": "manager@hospital.com",
      "phone": "+1-234-567-8900",
      "company": "XYZ Hospital",
      "reason": "Interested in CSSD solutions",
      "status": "new",
      "notes": null,
      "respondedBy": null,
      "createdAt": "2024-04-30T10:30:00Z",
      "updatedAt": "2024-04-30T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 15,
    "pages": 2,
    "currentPage": 1,
    "limit": 10
  }
}
```

---

### GET /api/admin/contacts/:id
Get single contact request.

**Request:**
```bash
curl -X GET http://localhost:5000/api/admin/contacts/607f1f77bcf86cd799439011 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):** Single contact object

---

### PATCH /api/admin/contacts/:id
Update contact status.

**Request:**
```bash
curl -X PATCH http://localhost:5000/api/admin/contacts/607f1f77bcf86cd799439011 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "status": "responded",
    "notes": "We will follow up with detailed proposal"
  }'
```

**Response (200):** Updated contact object

---

### DELETE /api/admin/contacts/:id
Delete contact request.

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/admin/contacts/607f1f77bcf86cd799439011 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):**
```json
{
  "success": true,
  "message": "Contact request deleted successfully",
  "data": null
}
```

---

### GET /api/admin/dashboard
Get dashboard statistics.

**Request:**
```bash
curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):**
```json
{
  "success": true,
  "message": "Dashboard statistics retrieved successfully",
  "data": {
    "totalProducts": 25,
    "totalContacts": 150,
    "newContacts": 5,
    "recentContacts": [
      {
        "_id": "607f1f77bcf86cd799439011",
        "name": "Hospital Manager",
        "email": "manager@hospital.com",
        "status": "new",
        "createdAt": "2024-04-30T10:30:00Z"
      }
    ]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Name is required"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "message": "Too many contact submissions, please try again later"
}
```

---

## Tips

1. **Authentication Token:** Always include the full token with "Bearer " prefix
2. **Content-Type:** Use `application/json` for JSON data, `multipart/form-data` for file uploads
3. **Rate Limiting:** Check response headers for X-RateLimit-* information
4. **Pagination:** Always check pagination object for total pages
5. **Error Handling:** Always check `success` field before processing data

---

**Last Updated:** April 2026
