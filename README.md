# 🏕️ YelpCamp

YelpCamp is a full-stack web application that empowers outdoor enthusiasts to discover, review, and share unique camping spots. It offers a community-driven platform where users can create, explore, and rate campgrounds with real-world experiences—making adventure planning more personalized and trustworthy.

---

## 🚀 Features

- User Authentication (Register/Login/Logout)
- Create, Edit, and Delete Campgrounds
- Add and Manage Reviews for Campgrounds
- Interactive Map Integration with location-based search
- Image Upload for Campgrounds using Cloudinary
- Responsive Design for Mobile & Desktop Views

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS (Bootstrap), JavaScript, EJS Templating
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** Passport.js
- **APIs & Services:** Mapbox (geocoding & maps), Cloudinary (image uploads)
- **Validation & Security:** Express-Validator, Helmet, Mongo Sanitization

---

## 📦 Dependencies

Install these packages using `npm install` after cloning the repo:

- `express`
- `mongoose`
- `passport`, `passport-local`
- `passport-local-mongoose`
- `ejs`, `ejs-mate`
- `connect-flash`
- `method-override`
- `express-session`
- `dotenv`
- `express-validator`
- `helmet`
- `mapbox-sdk`
- `multer`, `multer-storage-cloudinary`
- `cloudinary`
- `sanitize-html`
- `connect-mongo`

---

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/YelpCamp.git
   cd YelpCamp

2. Install dependencies

bash
Copy
Edit
npm install
Set up environment variables

3.Create a .env file in the root directory and add the following:


CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
DB_URL=your_mongodb_connection_url
SECRET=your_session_secret

4.Start the server
node app.js

5.Visit in your browser

Screenshots:
->Homepage:
![1](https://github.com/user-attachments/assets/67bbe559-3237-4bdf-a809-8a63aba83639)


->Single Campground ShowPage

->Login & Register page
