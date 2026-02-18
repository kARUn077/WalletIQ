# WalletIQ - Professional Finance Management

A full-stack personal finance management application built with the MERN (MongoDB, Express, React, Node.js) stack. This app features a premium, professional UI with glassmorphism effects, intelligent analytics, and real-time tracking for incomes and expenses.

## 🚀 Recent Redesign
The application has recently undergone a comprehensive UI overhaul to provide a high-end corporate feel:
- **Design Language**: Modern indigo-based theme with subtle gradients and glassmorphism.
- **Typography**: Optimized with the **Inter** font family for maximum readability.
- **Micro-interactions**: Smooth transitions and hover states for a premium user experience.

## ✨ Features

### 📊 Dashboard & Analytics
- **Hero Summary**: Real-time overview of your Total Balance, Income, and Expenses.
- **Transaction History**: Seamless view of your recent financial activity.
- **Dynamic Charts**: Visualized spending and earning trends (powered by Chart.js).

### 💰 Finance Management
- **Expense Tracking**: Record and categorize your spending with intelligent feedback.
- **Income Management**: Track multiple streams of revenue with ease.
- **Category Breakdown**: Dynamic summaries showing exactly where your money goes or comes from.
- **Filter & Sort**: Advanced data discovery by category and date.

### 🔐 Security & User Experience
- **Secure Auth**: JWT-based authentication with Bcrypt password hashing.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
- **User Feedback**: Integrated loading states and toast notifications for all major actions.

## 🛠️ Tech Stack

### Frontend
- **React** (Vite-powered)
- **Chart.js** & **React-Chartjs-2** (Data Visualization)
- **React Router DOM** (Navigation)
- **React Icons** (Modern UI Icons)
- **Axios** (API Requests)
- **React Toastify** (Notifications)
- **CSS3** (Custom Design Tokens & Glassmorphism)

### Backend
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose** (Database & ODM)
- **JSON Web Token (JWT)** (Authentication)
- **Bcrypt** (Security)

## 📦 Installation

### Prerequisites
- Node.js installed
- MongoDB URI (Local or Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd newexpensetracker
```

### 2. Setup Backend
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 3. Setup Frontend
```bash
cd ../Frontend/clientside
npm install
```
Create a `.env` file in the `Frontend/clientside` directory:
```env
VITE_REACT_APP_API=http://localhost:5000
```

## 🏃 Running the Application

### Option 1: Run Concurrently (Recommended)
From the `Backend` directory:
```bash
npm run dev
```

### Option 2: Run Separately
**Backend:**
```bash
cd Backend
npm run start
```
**Frontend:**
```bash
cd Frontend/clientside
npm run dev
```

## 📄 License
This project is licensed under the ISC License.
