# Gabble.com

## Overview

Gabble.com is a social media application built with a modern tech stack to provide users with a rich and interactive experience. Users can follow others, create posts, comment, like, edit their profiles, and more. The application is designed to be fast, responsive, and easy to use.

## Tech Stack

- **Frontend:**
  - React.js
  - Vite
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express
  - MongoDB
- **Additional Technologies:**
  - JSON Web Tokens (JWT) for Authentication
  - Cookies for User Authentication
  - React Query for Data Fetching and Caching
  - Cloudinary for Image Uploads

## Features

- **User Authentication:**

  - Secure authentication using JSON Web Tokens (JWT).
  - Use cookies for user session management and authentication.

- **User Interaction:**

  - **Suggested Users to Follow:** Discover new people to follow based on suggestions.
  - **Create Posts:** Share your thoughts and updates with your followers.
  - **Delete Posts:** Remove posts you no longer want to share.
  - **Comment on Posts:** Engage with posts by adding your comments.
  - **Like Posts:** Show appreciation by liking posts.
  - **Delete Posts (if you are the owner):** Manage your content by deleting your own posts.
  - **Edit Profile Info:** Update your personal information and keep your profile up-to-date.
  - **Edit Cover Image and Profile Image:** Customize your profile with unique cover and profile images.

- **Notifications:**
  - Receive notifications for various activities on your posts and profile.

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Subodh3601/gabble.com.git
   cd gabble.com
   ```

2. **Install dependencies:**

   npm install
   npm install --prefix frontend

3.**Build the project:**

    npm run build

4. **npm start**
   npm start

    Alternatively, you can use the development mode:

    npm run dev

5. **Environment Variables**
Create a .env file in the root directory and add the following environment variables:

 -  MONGODB_URI=your_mongodb_connection_string
 -  JWT_SECRET=your_jwt_secret
 -  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
 -  CLOUDINARY_API_KEY=your_cloudinary_api_key
 -  CLOUDINARY_API_SECRET=your_cloudinary_api_secret


