# HAI – Healthcare Anytime Anywhere

Welcome to **HAI (Healthcare Anytime Anywhere)** – a modern healthcare web landing page that showcases the core offerings of a mobile/ web health-tech solution. This project is a static, responsive website built with vanilla HTML, CSS, and JavaScript – perfect for quickly spinning up a marketing site or proof-of-concept.

![HAI Screenshot](https://cdn-icons-png.flaticon.com/512/2966/2966327.png)

## ✨ Features

1. **Hero Section** – Bold header with tagline _"Healthcare Anytime, Anywhere"_ and call-to-action buttons.
2. **Responsive Navigation Bar** – Smooth scroll navigation that sticks to the top and casts a subtle shadow on scroll.
3. **Feature Highlights** – Grid showcasing doctor search, appointment booking, medical records storage, and 24/7 teleconsultation.
4. **About Us** – Brief overview of the HAI mission and value proposition with supporting graphics.
5. **Contact / CTA** – Prompt users to download the app or request a demo.
6. **Clean, Modern Design** – Google Fonts, vibrant brand colors (#1e88e5), and mobile-first layout.

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites
No build tools are required. Any modern browser will work.

### Installation
1. Clone this repository or download the source.
2. Open `hai_health_app/index.html` in your browser.

```bash
# clone repo (if applicable)
$ git clone <repo-url>
$ cd hai_health_app
$ xdg-open index.html  # Linux (or just double-click the file)
```

## 📂 Project Structure
```
hai_health_app/
├── index.html      # Landing page markup
├── styles.css      # Styling
├── script.js       # Interactivity
└── README.md       # Project documentation
```

## 🛠 Customization
- Replace placeholder icons/images with brand assets.
- Update color scheme or typography in `styles.css`.
- Integrate with a back-end or analytics by extending `script.js`.

## 📄 License
This project is licensed under the MIT License – feel free to build upon it for personal or commercial use.

---
Made with ❤️  by the HAI team – _"Healthcare Anytime Anywhere"_.

## 🏗️ Running the Full App (Backend + Front-end)
The front-end is now served *from the same Express server*, so you only need **one command**:

```bash
cd server          # go into backend folder
npm install         # first time only
npm start           # launches API + serves UI at http://localhost:4000
```

Open your browser at **http://localhost:4000** and you’ll see the login page automatically. No second terminal or extra server required.

The server seeds demo data each time it starts.

## 🔑 Demo Credentials

Use this ready-made account to explore without registering:

* **Email:** `demo@hai.com`
* **Password:** `test123`

This account already contains a sample appointment and medical record.

## 📸 Screenshots

Below are a few screenshots demonstrating the flow (click to enlarge):

| Description | Image |
|-------------|-------|
| Login page with demo credentials | ![Login](https://i.imgur.com/GbM1S6e.png) |
| Doctors tab with booking button | ![Doctors](https://i.imgur.com/TlZg2fL.png) |
| Appointments list after booking | ![Appointments](https://i.imgur.com/2G7y0Av.png) |
| Medical records dashboard | ![Records](https://i.imgur.com/XxpPAlR.png) |

*(If the images fail to load, replace the links with your own screenshots.)*
