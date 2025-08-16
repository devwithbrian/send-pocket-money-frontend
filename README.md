# 💸Send Pocket Money – Frontend (React + Vite)

This is the **React.js frontend** of the Money Transfer application.  
It provides a UI for users to send money, view transaction history, and calculate fees and exchange rates.

---

## 🚀 Features
- Send money to recipients (GBP / ZAR).
- Real-time FX rate fetching.
- Fee calculation (10% for GBP, 20% for ZAR).
- Validation for minimum ($5) and maximum ($2000) amounts.
- Transaction history with pagination.
- Accessible and responsive design.

---

## 🛠️ Tech Stack
- React (with Hooks, useState/useEffect/useMemo).
- Axios (API communication).
- FontAwesome (icons).
- CSS for styling.

---

## 🔗 Backend Dependency
The frontend depends on a **Node.js + Express + MongoDB backend** to:
- Provide live FX rates (`/rates`).
- Handle transactions (`/transactions`).
- Store transaction history.

Make sure the backend server is running before starting the frontend.

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/money-transfer-frontend.git
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

