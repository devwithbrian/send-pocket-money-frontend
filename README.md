# 💸Send Pocket Money – Frontend (React + Vite)

This is the **React.js frontend** of the Send Pocket Money application.  
It provides a UI for users to send money, view transaction history, and calculate fees and exchange rates.

---

## 🚀 Features
- Send money to recipients (GBP / ZAR).
- Real-time FX rate fetching.
- Fee calculation (10% for GBP, 20% for ZAR).
- Validation for minimum ($5) and maximum ($2000) amounts.
- Transaction history with pagination.
- Ads section where an advert carousel resides.
- Accessible and responsive design.

---

## 🛠️ Tech Stack
- React (with Hooks, useState/useEffect/useMemo).
- Fetch API (API communication).
- FontAwesome (icons).
- CSS for styling.

---

## 🔗 Backend Dependency
The frontend depends on a Node.js + Express + MongoDB backend to:
- Provide live FX rates (`/rates`).
- Handle transactions (`/transactions`).
- Store registered user data.
- Store transaction history.

Make sure the backend server is running before starting the frontend.

---

## 📦 Installation

1. Clone the repository:
   git clone https://github.com/devwithbrian/send-pocket-money-frontend.git
   cd money-transfer-frontend

2. Install dependencies:
   npm install
3. Start the development server:
   npm start
The app will run on http://localhost:3000

⚙️ Configuration
Update src/api.js with your backend API base URL:
const BASE_URL = "http://localhost:4000/api"; // Backend server URL

🧪 Testing
npm test

