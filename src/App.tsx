// src/App.tsx
import { useInitData, useMiniApp } from "@tma.js/sdk-react";

export default function App() {
  const miniApp = useMiniApp(); // ✅ جایگزین useWebApp
  const initData = useInitData();

  const user = initData?.user;
  console.log(user);

  return (
    <div style={{ padding: 20 }}>
      <h1>Telegram Erfan Fooldi Mini App 🚀</h1>
      {user ? (
        <p>
          Hello, {user.firstName} ({user.username})
        </p>
      ) : (
        <p>No user data (probably running outside Telegram)</p>
      )}

      <button
        onClick={() => miniApp.close()}
        style={{
          background: "#0088cc",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: 8,
          marginTop: 10,
        }}
      >
        Close App
      </button>
    </div>
  );
}
