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

1. **Install and start the backend API**
   ```bash
   cd server
   npm install
   npm start   # starts on http://localhost:4000
   ```
   The server uses SQLite (file `database.db`) and seeds some sample doctors automatically.

2. **Open the front-end app**
   ```bash
   cd ../hai_health_app/app
   xdg-open login.html   # or open in your browser
   ```

   • Register a new account → you’ll land on the dashboard.
   • Search doctors, book appointments, manage medical records, and generate a telemedicine meeting link (powered by Jitsi Meet).

> NOTE: The front-end assumes the API is running at `http://localhost:4000`. If you deploy elsewhere, edit `hai_health_app/app/app.js` and change `API_URL`.

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
