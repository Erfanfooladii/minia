# Minia 🛍️
<img width="1367" height="927" alt="Image" src="https://github.com/user-attachments/assets/6ec2aa78-8f78-4fc0-8480-14b195b5549e" />


A lightweight, demo-friendly shop application designed to run smoothly inside **Telegram Mini Apps**.

Built with **React**, **TypeScript**, **Vite**, and **TailwindCSS** — simple architecture that's easy to extend and customize.

---

## 🧪 Live Demo

Test the app in Telegram: [@Minia13_bot](https://t.me/Minia13_bot)

Open the bot and click **"Open Mini App"** to see it in action!

## ✨ Features

- Simple shop UI (products, cart, checkout demo)
- Fully compatible with Telegram Mini Apps
- Fast development experience using Vite
- Styled using TailwindCSS
- TypeScript-first codebase
- Uses pnpm for package management

---

## 🛠 Tech Stack

- **React** + **TypeScript**
- **Vite**
- **TailwindCSS**
- **pnpm**
- **zustand**

---

## 📋 Requirements

- Node.js **18+**
- pnpm (recommended)
- A Telegram bot (for Mini App deployment)

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Erfanfooladii/minia.git
cd minia
```

### 2. Install dependencies

```bash
pnpm install
```

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

---

## 💻 Running the Project

Start the development server:

```bash
pnpm dev
```

The app will run at:

```
http://localhost:5173
```

---

## 📱 Telegram Mini App Setup

To run this project inside Telegram:

### 1. Deploy to HTTPS
Deploy the build output (`dist/`) to an HTTPS host.

### 2. Configure Your Bot
- Open [@BotFather](https://t.me/BotFather) on Telegram
- Configure your bot using the Telegram Mini Apps Platform
- Set the Web App URL to your deployed domain

### 3. Testing Locally with ngrok

```bash
# Terminal 1
pnpm dev

# Terminal 2
ngrok http 5173
```

Use the generated HTTPS URL in your Mini App settings.

---

## ⚠️ Common Issues

### Launch Parameter Error

If you see:

```
Unable to retrieve launch parameters from any known source.
Perhaps, you opened your app outside Telegram?
```

**This means:**
- The app is opened in a normal browser (not inside Telegram), or
- Launch parameters from Telegram were not passed

**Fix:**
- Open the URL inside Telegram
- Use ngrok for local testing
- Ensure your origin and URL are correctly set in Mini App settings

### Module Not Found

Install missing dependency:

```bash
pnpm add <package-name>
```

### Tailwind Not Working

Ensure the `content` field in `tailwind.config.js` includes all your component paths:

```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

### CORS or API Issues

Check:
- Your API domain
- CORS configuration
- Environment variables

---

## 🏗️ Build & Deployment

Generate a production build:

```bash
pnpm build
```

The output will be in `/dist` folder.

Upload this folder to a hosting provider that supports HTTPS (Vercel, Netlify, Cloudflare Pages, etc.).

Finally, update your Telegram Mini App settings with the deployed URL.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TELEGRAM_BOT_USERNAME=YourBotUsername
VITE_APP_API_URL=https://api.example.com
VITE_APP_MINIAPP_ORIGIN=https://your-host.example.com
```

**Note:** All client-side environment variables in Vite must begin with `VITE_`

---

## 📁 Project Structure

```
/
├── src/                # React source code
├── public/             # Static assets
├── index.html
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Contributions are welcome!

---

## 📄 License

This project is free and open source. Feel free to use it however you like.

---

## 📞 Contact

For questions or issues, please open an issue on GitHub.

**Made with ❤️ for Telegram Mini Apps**
