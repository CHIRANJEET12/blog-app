// App.jsx
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Reg } from "./pages/Reg";
import { Profile } from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import { CoverHome } from "./pages/CoverHome";
import { useState, useEffect } from "react";

function App() {
  const [islogin, setIsLogin] = useState(false);
  useEffect(() => {
    const check = localStorage.getItem('islogin');
    if (check === 'true') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);
  return (
    <div className="App max-w-6xl bg-white mx-auto p-4">
      <Navbar />
      <Routes>
        {
          islogin ? (<Route path="*" element={<CoverHome />} />) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )
        }
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Reg />} />
      </Routes>
    </div>
  );
}

export default App;
