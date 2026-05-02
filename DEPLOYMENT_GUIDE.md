# Deployment Guide: Render (Backend + Frontend)

## Pre-Deployment Checklist

### Backend (Server)
- [x] Remove deprecated mongoose options (`useNewUrlParser`, `useUnifiedTopology`) — **Already done**
- [x] Add modern connection options (timeouts, family) — **Already done**
- [x] Verify CORS is configured with production CLIENT_URL
- [x] Verify `.env.example` is committed (secrets are NOT committed)
- [x] Ensure `npm start` script exists in `package.json` — **Verified**
- [x] Health check endpoint exists at `/api/health` — **Verified**
- [x] Error handler middleware in place — **Verified**
- [ ] Set NODE_ENV=production in Render environment variables
- [ ] Database URI is valid and whitelisted for production IP

### Frontend (SPA)
- [x] React Router configured correctly
- [x] Vite build script exists (`npm run build`) — **Verified**
- [x] .env.example provided with VITE_API_URL
- [ ] VITE_API_URL points to your Render backend URL (not localhost)
- [ ] Removed all `console.log()` statements (optional, but recommended)
- [ ] API client uses dynamic API_URL from env — **Already configured**

---

## Part 1: Deploy Backend to Render Web Service

### Step 1: Connect GitHub to Render
1. Go to [https://render.com](https://render.com)
2. Sign up or log in
3. Click **"New +"** → **"Web Service"**
4. Select **"Connect a repository"** or paste your GitHub repo URL
5. Choose the repository `solutechh-react`
6. Grant Render access to your GitHub account

### Step 2: Configure Render Web Service
| Field | Value |
|-------|-------|
| **Name** | `solutechh-api` (or any name) |
| **Environment** | `Node` |
| **Region** | Choose closest to your users (e.g., `us-east-1`) |
| **Branch** | `main` |
| **Build Command** | `cd server && npm install` |
| **Start Command** | `cd server && npm start` |

### Step 3: Add Environment Variables
Click **"Environment"** and add all variables from `server/.env`:

```
PORT=5000
NODE_ENV=production

MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=<your_email@gmail.com>
EMAIL_PASS=<your_app_password>
ADMIN_EMAIL=<admin_email@gmail.com>

CLIENT_URL=https://<your-render-frontend-url>.onrender.com
```

**Important:** Replace placeholders with actual values. `CLIENT_URL` should be your Render frontend URL (you'll get this after deploying frontend).

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Render will build and deploy automatically
3. Wait for the green checkmark — deployment successful
4. Copy the live URL: `https://solutechh-api.onrender.com` (or your assigned URL)

### Step 5: Verify Backend
Test the health check endpoint:
```bash
curl https://solutechh-api.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Part 2: Deploy Frontend to Render Static Site

### Step 1: Connect GitHub to Render
1. Go to [https://render.com](https://render.com)
2. Sign up or log in
3. Click **"New +"** → **"Static Site"**
4. Connect your GitHub repository `solutechh-react`

### Step 2: Configure Project
| Field | Value |
|-------|-------|
| **Name** | `solutechh-frontend` (or any name) |
| **Root Directory** | `forntend` |
| **Build Command** | `npm run build` |
| **Publish Directory** | `dist` |
| **Install Command** | `npm install` |

### Step 3: Add Environment Variables
Click **"Environment Variables"** and add:

```
VITE_API_URL=https://<your-render-backend-url>.onrender.com/api
```

(Replace with your actual Render backend URL from Part 1)

### Step 4: Deploy
1. Click **"Create Static Site"**
2. Render will build and deploy automatically
3. Wait for the deployment to complete
4. Copy your frontend URL: `https://solutechh-frontend.onrender.com` (or your assigned URL)

### Step 5: Update Backend CLIENT_URL
Go back to Render and update the `CLIENT_URL` environment variable with your Render frontend URL:
```
CLIENT_URL=https://solutechh-frontend.onrender.com
```

Redeploy the backend by clicking **"Redeploy"** in Render.

---

## Part 3: Post-Deployment Verification

### Test Authentication Flow
1. Open frontend: `https://solutechh-frontend.onrender.com`
2. Click **Sign Up** and create an account
3. Verify that:
   - Account is created successfully
   - JWT token is stored in localStorage
   - Login works
   - User profile is displayed in Navbar

### Test Contact Form
1. Sign in to the app
2. Click **"Get in Touch"** button (requires authentication)
3. Submit a test contact form (customer inquiry or career application)
4. Verify:
   - Form submits successfully
   - Admin receives email notification
   - Contact appears in admin dashboard

### Test Admin Dashboard
1. Sign in with admin account: `admin@solutechh.com` / `Admin@123456`
2. Navigate to **"Admin"** panel
3. Verify:
   - Products load correctly
   - Contact requests display (including the test submission)
   - Can update product status
   - Can delete contacts

### Monitor Logs
**Render:**
- Go to your web service or static site → **"Logs"** to watch real-time logs

---

## Troubleshooting

### Backend Fails to Start
- **Check logs** in Render dashboard
- **Verify MONGO_URI** is correct and database is accessible
- **Ensure all required env vars** are set
- **Check if PORT is free** (though Render assigns it)

### Frontend Shows Blank Page
- **Check browser console** (F12 → Console) for errors
- **Verify VITE_API_URL** is set correctly in Render env vars for the static site
- **Clear browser cache** and reload
- **Check Render build logs** for build errors

### API Calls Failing (CORS Error)
- **Verify CLIENT_URL** is set correctly in Render
- **Ensure Render frontend URL matches** CLIENT_URL in backend
- **Check browser console** for exact CORS error message

### Contact Form Not Sending Emails
- **Verify EMAIL_USER and EMAIL_PASS** in Render env vars
- **Ensure Gmail App Password** is being used (not regular password)
- **Check Render logs** for email sending errors
- **Verify ADMIN_EMAIL** is correct

---

## Environment Variables Reference

### server/.env.example
```dotenv
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@example.com

# Client
CLIENT_URL=http://localhost:5173
```

### forntend/.env.example
```dotenv
VITE_API_URL=http://localhost:5000/api
```

---

## Useful Links

- **Render Docs:** https://render.com/docs
- **Render Static Sites Docs:** https://render.com/docs/static-sites
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Cloudinary:** https://cloudinary.com
- **Gmail App Passwords:** https://myaccount.google.com/apppasswords

---

## Summary

1. ✅ Backend deployed on Render → `https://solutechh-api.onrender.com`
2. ✅ Frontend deployed on Render → `https://solutechh-frontend.onrender.com`
3. ✅ Frontend points to Render API
4. ✅ Backend CORS allows Render frontend URL
5. ✅ All env vars set in production
6. ✅ Test all flows before going live

Good luck with your deployment! 🚀
