# 🌐 NetPulse India  
**Tracking Internet Shutdowns and Throttling Across India in Real Time**

> _A real-time civic-tech platform that detects, visualizes, and analyzes internet disruptions to empower citizens, journalists, and policymakers with data transparency._

---

## 🚀 Overview

Every internet shutdown tells a story — of disconnected students, halted businesses, and silenced voices.  
**NetPulse India** bridges that gap by combining **citizen reporting, AI analytics, and real-time mapping** to bring visibility to network disruptions nationwide.

Our platform collects reports from users, verifies them through crowdsourcing and official sources, and visualizes their social and economic impact across India.

---

## 🎯 Problem Statement

India leads globally in the number of **internet shutdowns** each year.  
Yet, there’s **no unified system** to:
- Track them transparently,  
- Understand their causes and impact,  
- or Alert affected communities instantly.

---

## 💡 Our Solution

NetPulse India introduces a **data-driven, participatory approach** to monitoring digital freedom:
- Combines **crowdsourced data 
- Offers **live maps and alerts**
- Promotes **transparency** and **public accountability**

---

## 🧠 Key Innovations

| Feature | Description |
|----------|--------------|
| 🌍 **Real-Time Heatmap** | Visualizes internet shutdowns and throttling incidents using live geo-coordinates and intensity-based mapping. |
| ⚡ **Smart Alert System** | Instantly notifies citizens and officials when new disruptions are detected or reported through the “Test Connection” tool. |
| 🧾 **Smart Reporting Form** | Simple form with “Test Connection” button for quick throttling/shutdown checks, auto-validating network responses. |
| 📊 **Impact Analytics** | Provides interactive dashboards showing economic loss, affected users, and downtime duration. |
| 🗣️ **Public Voices Wall** | A social space where citizens share real stories and experiences of internet shutdowns. |
| 📈 **Timeline Trends** | Month-wise visualization of internet disruptions, showing emerging digital distress patterns. |
| 👥 **Crowd Verification System** | Citizens upvote/verify reported incidents to improve data authenticity and reliability. |

---


## 🖥️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, React-Bootstrap, Chart.js, Leaflet.js |
| **Backend** | Node.js, Express.js, Socket.IO |
| **Database** | MongoDB Atlas |
| **APIs** | RESTful + WebSocket (for real-time updates) |
| **Deployment** | Render |

---

## 🌟 Our Mission

 **“To make digital rights transparent and empower every Indian citizen to stay connected — always.”**


We believe internet access is a basic right, not a privilege.
NetPulse India works to ensure that every disconnection becomes a data point for accountability.

---


## ⚙️ How to Run Locally

### Clone the repository
```bash
git clone https://github.com/<your-username>/netpulse-india.git
cd netpulse-india

```

### Backend Setup
```
cd backend
npm install
```

### Create a .env file:
```
MONGO_URI=your_mongodb_atlas_uri
PORT=8080
```

### Run the backend
```
npm run dev
```

### Frontend Setup
```
cd frontend
npm install
npm run dev
```

### Your app will start at:
```
Frontend → http://localhost:5173  
Backend  → http://localhost:8080
```
