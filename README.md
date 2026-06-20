# BigQuery Release Notes Explorer

A beautiful, modern, and responsive web application built with Node.js Express and Vanilla HTML/CSS/JS that fetches, parses, and displays the official Google Cloud BigQuery Release Notes.

## 🌟 Features
* **Dynamic Feed Integration:** Automatically fetches and parses Google's BigQuery RSS feed XML.
* **Stunning UI/UX:** Built with a modern glassmorphism design, custom glow effects, Outfit typography, and dark-mode optimization.
* **Smooth Animations:** Includes floating orb background animations and staggered entry slide-ups for release note cards.
* **On-Demand Refresh:** Features an interactive header button with a spinning animation to pull the latest updates without reloading the page.
* **Tweet Integration:** Instantly tweet any specific update with a pre-filled draft link referencing the release note title and URL.

## 📁 Project Structure
```text
bq-release-notes/
├── static/
│   ├── script.js        # Frontend logic (fetching, DOM injection, Tweet helper)
│   └── style.css         # Glassmorphism styling, layout, animations
├── templates/
│   └── index.html       # Single-page application structure
├── .gitignore           # Excludes node_modules, OS files, and venv files
├── package.json         # Node.js dependencies and scripts
├── requirements.txt     # Python requirements (from initial setup)
├── app.py               # Python Flask backup implementation
└── server.js            # Node.js Express server (Primary active backend)
```

## 🛠️ Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (comes bundled with Node.js)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/peymandelkhosh/Peyman-bq-release-notes.git
cd Peyman-bq-release-notes
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
node server.js
```

The console will print:
`Server is running at http://127.0.0.1:5050/`

Open your web browser and navigate to **http://127.0.0.1:5050/** to explore the dashboard.

## 💻 Tech Stack
* **Backend:** Node.js, Express.js, `rss-parser` (for XML/JSON translation)
* **Frontend:** Vanilla HTML5, Vanilla CSS3 (Custom styling), Vanilla JS (ES6+)

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

---
*Created by [Peyman](https://github.com/peymandelkhosh)*
