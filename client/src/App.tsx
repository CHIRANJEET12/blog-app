// App.jsx
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Reg } from "./pages/Reg";
import { Profile } from "./pages/Profile"; 
import { Routes, Route } from "react-router-dom"; 

function App() {
  return (
    <div className="App max-w-6xl bg-white mx-auto p-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Reg />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
