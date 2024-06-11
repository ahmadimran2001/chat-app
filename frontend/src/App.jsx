import { useState } from "react";
import Login from "./pages/login/Login";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="p4 h-screen flex items-center justify-center">
        <Login />
      </div>
    </>
  );
}

export default App;
