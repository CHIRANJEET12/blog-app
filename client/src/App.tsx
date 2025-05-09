import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Reg } from "./pages/Reg";
import ProfileForm  from "./pages/Profile";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Postid } from "./pages/Postid";
import { CoverHome } from "./pages/CoverHome";
// import { GetProfile } from "./pages/Getprofile";
import { useState, useEffect } from "react";

// Typing the onLoginSuccess function
const App = () => {
  const [islogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = localStorage.getItem('islogin');
    if (check === 'true') {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  // Type the function passed to the Login component
  const handleLoginSuccess = (): void => {
    setIsLogin(true);
    localStorage.setItem('islogin', 'true');
    navigate('/profile'); // Redirect to Profile page after login
  };

  return (
    <div className="App max-w-6xl bg-white mx-auto p-4">
      <Navbar />
      <Routes>
        {/* If logged in, show the Home page and Profile route */}
        {islogin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/post/:id" element={<Postid/>} />
            {/* <Route path="/profile/:id" element={<GetProfile/>} /> */}

          </>
        ) : (
          // If not logged in, show the CoverHome page
          <Route path="/home" element={<CoverHome />} />
        )}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/reg" element={<Reg />} />
      </Routes>
    </div>
  );
};

export default App;
