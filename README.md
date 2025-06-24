
# 🍽️ **MealBridge**

**MealBridge** is a modern web platform designed to connect food donors with people in need.  
It empowers donors to share surplus food and enables receivers to request available items — fostering a community of care and reducing food waste.

---

## 🌟 **Purpose**
The purpose of MealBridge is to reduce food waste by bridging the gap between donors and receivers through a secure, user-friendly web application.

MealBridge aims to:
- 🌱 **Reduce food waste** by redistributing surplus food.
- 🫂 **Support communities** by making food donations more accessible.
- 🔒 **Ensure security** with robust authentication and authorization.
- ⚡ **Provide a seamless experience** through an interactive, responsive app.

---

## 🌐 **Live Demo**

👉 [🚀 Visit MealBridge](https://meal-bridge-project.web.app/)  

---
## 🌐 **Client site github repo**

👉 🚀 https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-Tajuddin-green

---
## 🌐 **Server site github repo**

👉 🚀 https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-Tajuddin-green


## 💡 **Key Features**

✨ **Secure Authentication**  
- Firebase Authentication  
- JWT token validation  
- Token-based API protection  

✨ **Role-Based Access Control**  
- Donor & Receiver roles  
- Restricted operations based on role  

✨ **Powerful CRUD Operations**  
- Donors: Add, edit, delete food items  
- Receivers: Request and track food  

✨ **Modern UI/UX**  
- Built with **Tailwind CSS** + **DaisyUI**  
- Smooth **Framer Motion** animations  
- Engaging **Lottie** & **Swiper** integrations  

✨ **Real-Time & Reliable Data**  
- **React Query** for caching + background updates  
- **Axios** for API requests  

✨ **User-Friendly Alerts & Modals**  
- SweetAlert2 modals for confirmations, errors, and notifications  

✨ **Mobile-First & Responsive**  
- Fully optimized for phones, tablets, and desktops  

---

## 🔐 **Security Highlights**

✅ Firebase token required for all protected routes  
✅ API verifies that **only the food owner** can modify or delete their items  
✅ No unauthorized data manipulation possible  

---

## 📦 **NPM Packages Used**

| Package | Purpose |
|----------|---------|
| `react`, `react-dom` | Core React app |
| `react-router` | Routing and navigation |
| `@tanstack/react-query` | Data fetching, caching |
| `axios` | API requests |
| `firebase` | Auth + backend services |
| `sweetalert2` | Alert modals |
| `framer-motion` | Animations |
| `lottie-react` | Lottie animation support |
| `swiper` | Slider/Carousel |
| `react-icons` | Icon set |
| `react-simple-typewriter` | Typewriter effect |
| `react-tooltip` | Tooltips |
| `tailwindcss`, `daisyui` | Styling and components |

### 🛠 **Dev Dependencies**
- `vite` — Fast dev server & bundler  
- `@vitejs/plugin-react` — React + Vite integration  
- `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` — Code linting  
- `@types/react`, `@types/react-dom` — TypeScript type support  

---

## 🏗️ **Tech Stack**

- **Frontend:** React + Vite + Tailwind + DaisyUI  
- **Backend:** Node.js + Express + MongoDB (secured with Firebase JWT verification)  
- **Hosting:** Firebase Hosting  

---

## 📌 **Folder Structure Overview**
\`\`\`
/src
 ┣ /components        # Reusable components
 ┣ /pages             # Main app pages
 ┣ /Firebase           # Firebase auth setup
 ┣ /api               # API request helpers
 ┣ /assets            # Images & static files
 ┣ App.jsx            # Main app component
 ┣ main.jsx           # Entry point
\`\`\`

---



## 🛡️ **Contribution & License**

Contributions welcome! Open an issue or submit a PR.  
📄 **License:** MIT  
