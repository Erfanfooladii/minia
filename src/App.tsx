// src/App.tsx
import { useInitData, useMiniApp } from "@tma.js/sdk-react";

export default function App() {
  const miniApp = useMiniApp(); // ✅ جایگزین useWebApp
  const initData = useInitData();

  const user = initData?.user;
  console.log(user);

  return (
    <div className="flex items-center flex-col justify-center gap-2.5">
      <h1>Telegram Erfan Fooldi Mini App 🚀</h1>
      {user ? (
        <p>
          Hello, {user.firstName} ({user.username})
        </p>
      ) : (
        <p>No user data (probably running outside Telegram)</p>
      )}
      <div className="w-16 h-16 border border-amber-300 border-solid rounded-full p-2">
        <img
          className="w-full h-full rounded-full"
          src={user?.photoUrl}
          alt={`image profile ${user?.firstName} ${user?.lastName}`}
        />
      </div>
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
