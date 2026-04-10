# 🤖 Chatbot

A full-stack AI chatbot application with a **React 19 + Vite** frontend and an **Express 5** backend — all in one monorepo. Styled with **Tailwind CSS v4** and deployed live on Vercel.

🔗 **Live Demo:** [chatbot-five-ecru-57.vercel.app](https://chatbot-five-ecru-57.vercel.app)

---

## 📁 Project Structure

```
chatbot/
├── backend/          # Express 5 API server
├── public/           # Static assets (favicon, etc.)
├── src/              # React frontend source
├── index.html        # Vite HTML entry point
├── vite.config.js    # Vite + Tailwind config
├── eslint.config.js  # ESLint flat config (v9)
└── package.json      # Shared dependencies
```

---

## 🛠️ Tech Stack

| Layer      | Technology                         | Version  |
|------------|------------------------------------|----------|
| Frontend   | React                              | v19      |
| Build Tool | Vite                               | v7       |
| Styling    | Tailwind CSS                       | v4       |
| Backend    | Express                            | v5       |
| Linting    | ESLint (with React Hooks plugin)   | v9       |
| Deployment | Vercel                             | —        |

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

Check your versions with:

```bash
node -v
npm -v
```

### 1. Clone the repository

```bash
git clone https://github.com/jaykaranshukla/chatbot.git
cd chatbot
```

### 2. Install dependencies

```bash
npm install
```

> All dependencies (frontend + backend) are managed from the root `package.json`.

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Your AI provider API key (e.g., Gemini, OpenAI, etc.)
VITE_API_KEY=your_api_key_here
```

> Variables prefixed with `VITE_` are exposed to the frontend by Vite. Keep secret backend keys without the prefix and access them only server-side.

---

## 🚀 Running the App

### Start the frontend (dev server with HMR)

```bash
npm run dev
```

Runs at `http://localhost:5173` with Hot Module Replacement enabled via `@vitejs/plugin-react`.

### Start the backend server

```bash
node backend/index.js
```

---

## 🧹 Linting

```bash
npm run lint
```

Uses **ESLint v9 flat config** with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment (Vercel)

The app is deployed on Vercel. To deploy your own fork:

1. Push the repo to your GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add environment variables under **Project Settings → Environment Variables**.
4. Deploy — Vercel auto-detects Vite and configures the build settings.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
