# 🚗 BestCars - Full Stack Capstone Project

This project demonstrates mastery in **Full Stack Application Development** as part of the **IBM Full Stack Software Developer Professional Certificate**.

The **BestCars** web application is a full stack solution designed for a **Car Dealership**.  
It enables users to browse car listings, manage reviews, and experience an interactive UI with microservices and containerized deployment on the cloud.

---

## 🎯 Project Overview

The objective of this project is to showcase complete full stack proficiency by designing and developing a **dynamic, cloud-ready web application** using modern tools and technologies.

This capstone project involves:
- Designing a responsive frontend with React.
- Building and integrating RESTful backend services.
- Implementing a Python microservice for sentiment analysis.
- Managing data using NoSQL (MongoDB).
- Containerizing and deploying the app using Docker and Kubernetes.
- Hosting services with IBM Code Engine.

---

## 🧠 Key Skills Demonstrated

- **Application Architecture Design**
- **Frontend Development** using React, HTML5, CSS3, JavaScript
- **User Authentication and Authorization**
- **Backend API Development** using Node.js and Express
- **Database Management** using MongoDB (NoSQL)
- **Microservice Integration** with Python/Django
- **CI/CD Pipeline Configuration**
- **Containerization** with Docker
- **Deployment on Cloud** using Kubernetes and IBM Code Engine
- **RESTful Microservice Communication**

---

## 🧰 Tech Stack

| Layer | Technologies Used |
|-------|--------------------|
| **Frontend** | React, HTML5, CSS3, JavaScript |
| **Backend** | Node.js, Express |
| **Microservice** | Python (Django) - Sentiment Analyzer |
| **Database** | MongoDB |
| **Deployment** | Docker, Kubernetes, IBM Code Engine |
| **Tools** | Git, GitHub, VS Code, npm, kubectl, IBM Cloud CLI |

---

## ⚙️ Getting Started

Follow the steps below to set up and run the **BestCars** full stack application locally.

---

### 🧩 1. Clone the Repository

```bash
git clone https://github.com/SaurabhLP88/xrwvm-fullstack_developer_capstone.git
cd xrwvm-fullstack_developer_capstone
```

---

### 🧱 2. Backend Setup (Node.js + Express)

```bash
cd server
npm install
npm start
```

Backend API runs at:  
👉 `http://localhost:8000`

---

### 🧰 3. Frontend Setup (React)

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs at:  
👉 `http://localhost:3000`

---

### 🧠 4. Python / Django Microservice (Sentiment Analyzer)

```bash
cd django_server
pip install -r requirements.txt
python manage.py runserver
```

This handles sentiment analysis for dealer reviews at:  
👉 `http://localhost:5000`

---

### 🧮 5. Environment Configuration

Create a `.env` file inside each service folder (`frontend`, `server`, `django_server`) with your credentials:

```
# .env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
SECRET_KEY=your_secret_key
REACT_APP_API_URL=http://localhost:8000
```

---

### 🐳 6. Docker Setup (Optional)

Run the entire stack in containers:

```bash
docker-compose up --build
```

This builds and runs **frontend**, **backend**, and **microservice** containers together.

---

### ☸️ 7. Kubernetes Deployment

Deploy the app on a Kubernetes cluster:

```bash
kubectl apply -f deployment.yaml
```

Verify that your pods and services are running:

```bash
kubectl get all
```

Access your app using the **external IP** assigned by your cluster.

---

### 🧪 8. Testing the App

- Frontend: `http://localhost:3000`
- API Routes: `http://localhost:8000/api`
- Sentiment Microservice: `http://localhost:5000/analyze`

---

### 🧹 9. Stop Running Services

```bash
# Local
CTRL + C

# Docker
docker-compose down
```

---

## 🧾 Folder Structure

```
xrwvm-fullstack_developer_capstone/
│
├── frontend/           # React Frontend (Customer & Dealer UI)
├── server/             # Node.js Backend (REST APIs)
├── django_server/      # Python Sentiment Microservice
├── deployment.yaml     # Kubernetes Deployment File
├── docker-compose.yml  # Docker Configuration
└── README.md
```

---

## 🌍 Deployment

The **BestCars** app can be containerized and deployed using:
- **IBM Code Engine** (serverless)
- **Kubernetes** (for scalable deployments)
- **GitHub Actions** for CI/CD pipelines

---

## 💡 Future Enhancements

- Add Admin Dashboard for Dealer Management
- Integrate Payment Gateway for bookings
- Improve Sentiment Analyzer accuracy using ML models
- Enable multi-language localization

---

## 🧑‍💻 Author

**Saurabh Lakhanpal**  
🌐 [GitHub Profile](https://github.com/SaurabhLP88)  
💼 [Portfolio](https://saurabhlp88.github.io/)  
📧 [Email](mailto:saurabh.lakhanpal88@gmail.com)

---

## 🪪 License

This project is licensed under the **MIT License** — feel free to use and modify for learning purposes.
