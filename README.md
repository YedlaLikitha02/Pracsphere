# 🧠 PracSphere Assignment

---

## 📄 Description

This project is a **Task Manager Dashboard** built for the PracSphere internship assessment. It allows users to **sign up, log in, and manage their personal tasks** securely. Each user can add, edit, delete, and filter their own tasks. The project follows a clean monorepo setup using **TurboRepo** and **pnpm** for workspace management. It includes authentication using **NextAuth.js** with **MongoDB** and supports responsive design.

---

## ⚙️ How to Run

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/pracsphere-assignment.git
cd pracsphere-assignment
```

### 2️⃣ Install Dependencies

```bash
pnpm install
```

### 3️⃣ Create Environment File

Create a `.env` file in the root folder and add:

```env
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

### 4️⃣ Start the Development Server

```bash
pnpm dev
```

### 5️⃣ Open in Browser

Go to **[http://localhost:3000](http://localhost:3000)** to view the app.

---

## 📦 Main Features

* User Signup & Login with NextAuth.js
* MongoDB for data storage
* CRUD operations for tasks
* Each user can manage only their own tasks

---

## 🖼️ Screenshots

### 🏠 Signup Page

![Home Page Screenshot]<img width="1310" height="621" alt="Screenshot1" src="https://github.com/user-attachments/assets/ea3605f0-3ade-4530-af7c-3cb460a1b89d" />


### 🔐 Login Page

![Login Page Screenshot]
<img width="1282" height="599" alt="Screenshot2" src="https://github.com/user-attachments/assets/bbdcedd4-72a9-4b1d-b3dc-7efe4fd7e1b1" />

### 🗾 Task Dashboard

![Task Dashboard Screenshot]
<img width="1345" height="645" alt="Screenshot3" src="https://github.com/user-attachments/assets/4207dd83-b184-477b-82e4-119826d0bed6" />



