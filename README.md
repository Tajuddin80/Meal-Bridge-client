# 🍽️ MealBridge

**MealBridge** is a web platform that connects food donors with people in need, helping reduce food waste by enabling donors to share surplus food and receivers to request and receive available items easily.

---

## 🌟 Project Overview

MealBridge fosters a caring community by redistributing excess food efficiently and securely. It offers a smooth, user-friendly experience powered by modern web technologies.

---

## 📸 Screenshot

<img src="https://github.com/Tajuddin80/Meal-Bridge-client/blob/main/meal-bridge-project.web.app_.png" alt="MealBridge Screenshot" />

---

## 🌐 Live Demo

👉 [🚀 Visit MealBridge](https://meal-bridge-project.web.app/)

---

## 🌐 GitHub Repositories

- Client: [https://github.com/Tajuddin80/Meal-Bridge-client](https://github.com/Tajuddin80/Meal-Bridge-client)  
- Server: [https://github.com/Tajuddin80/Meal-Bridge-server](https://github.com/Tajuddin80/Meal-Bridge-server)

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, DaisyUI  
- **Backend:** Node.js, Express, MongoDB  
- **Authentication:** Firebase Authentication with JWT verification  
- **Hosting:** Firebase Hosting  

---

## ✨ Key Features

- Secure user authentication and role-based access control (Donor & Receiver)  
- Donors can add, edit, and delete food items  
- Receivers can request and track food donations  
- Responsive design optimized for all devices  
- Smooth animations with Framer Motion, plus Lottie & Swiper integrations  
- Real-time data fetching and caching with React Query and Axios  
- User-friendly alerts and modals using SweetAlert2  

---

## 📦 Dependencies

| Package                | Purpose                      |
|------------------------|------------------------------|
| `react`, `react-dom`   | Core React framework          |
| `react-router`         | Client-side routing           |
| `@tanstack/react-query`| Data fetching and caching     |
| `axios`                | API calls                    |
| `firebase`             | Authentication & backend     |
| `sweetalert2`          | Alerts & modals              |
| `framer-motion`        | Animations                  |
| `lottie-react`         | Lottie animations           |
| `swiper`               | Carousel/slider              |
| `react-icons`          | Icons                       |
| `react-simple-typewriter` | Typewriter effect          |
| `react-tooltip`        | Tooltips                    |
| `tailwindcss`, `daisyui` | Styling and UI components  |

**Dev Dependencies:**  
`vite`, `@vitejs/plugin-react`, `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `@types/react`, `@types/react-dom`

---

## 🚀 How to Run Locally

1. Clone the client repo and install dependencies:
   ```bash
   git clone https://github.com/Tajuddin80/Meal-Bridge-client.git
   cd Meal-Bridge-client
   npm install
2.Create a `.env` file in the root and add Firebase config and API URLs.

Start the client dev server:

```bash
npm run dev

3. 🛡️ Security Highlights
Firebase token required for all protected routes

Only owners can modify/delete their food items

JWT verification protects API endpoints
