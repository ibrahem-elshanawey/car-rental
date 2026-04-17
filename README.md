# 🚗 Car Rental System (Angular Frontend)

## 📌 Overview

This is a **Car Rental Frontend Application** built using Angular.
It includes both **Customer Panel** and **Admin Dashboard** with modern UI/UX features.

---

## ⚙️ Setup Instructions

```bash
npm install
ng serve
```

Then open:

```
http://localhost:4200
```

---

## 🏗️ Project Structure

```
src/
│
├── app/
│   ├── core/                # Services (Auth, Theme, Language, Interceptors)
│   ├── shared/              # Shared Components (Navbar, Footer, Table)
│   ├── features/
│   │   ├── admin/           # Admin Dashboard (Users, Cars, Orders)
│   │   ├── customer/        # Customer Features
│   │   │   ├── cars         # Browse Cars
│   │   │   ├── orders       # Orders (Create, List, Details)
│   │   │   ├── installments # Installments
│   │   ├── auth/            # Login & Register
│   ├── layouts/             # Layouts (Admin / Customer)
│
├── public/
│   ├── i18n/                # Translation files (en.json / ar.json)
│
└── environments/            # API configuration
```

---

## 🌐 Features

### 👤 Customer

* Browse Cars
* View Car Details
* Create Order (Full / Installments)
* View Orders
* View & Pay Installments
* Dark / Light Mode
* Multi-language (EN / AR)

### 🛠️ Admin

* Manage Users
* Manage Cars (CRUD)
* View Orders
* Update Payment Status

---

## 🌍 Language Switching

The app supports **English 🇺🇸 and Arabic 🇸🇦**

### 🔁 Switch Language

* Click the **Translate Button 🌐** in the navbar
* It toggles between:

  * EN → AR
  * AR → EN

### 📂 Translation Files

```
assets/i18n/en.json
assets/i18n/ar.json
```

---

## 🌙 Dark Mode

### 🔁 Toggle Theme

* Click the **🌙 / ☀️ button** in navbar

### 🎨 Behavior

* Applies only to **Customer Layout**
* Uses CSS Variables for smooth UI transition

---

## 🔐 Authentication

* JWT-based authentication
* Roles:

  * Admin
  * Customer

---

## 📡 API Integration

### Customer APIs

* `GET /api/customer/cars`
* `GET /api/customer/cars/{id}`
* `POST /api/customer/orders`
* `GET /api/customer/orders`
* `GET /api/customer/installments`
* `POST /api/customer/installments/{id}/pay`

### Admin APIs

* `GET /api/admin/orders`
* `PUT /api/admin/orders/{id}`

---

## 🎨 UI & UX

* Bootstrap 5
* Bootstrap Icons
* Responsive Design
* Custom Dark Mode System
* Reusable Table Component
* Toastr Notifications

---

## 🚀 Notes

* Payment system is **simulated (no real payment gateway)**
* Backend handles all calculations:

  * Days
  * Total Price
  * Installments

---

## 👨‍💻 Author

Developed by **Ibrahim Elshenawy**
